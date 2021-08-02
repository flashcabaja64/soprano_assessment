import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../utils/useForm';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { registerUser } from '../utils/validations';
import ValidationError from '../utils/ValidationError';
import UserService from '../services/UserService';
 
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resStatus, setResStatus] = useState('');
  const history = useHistory();

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPass: ''
    },
    submit,
    registerUser
  )

  const handleError = (errorName) => resStatus.includes(errorName) ? 'error' : ''

  function submit() {
    setLoading(true);

    UserService.registerUser({
      name: values.name,
      email: values.email,
      password: values.password
    })
      .then((res) => {
        if(res.status === 200 || res.message.includes("success")) {
          setLoading(false);
          setError(false);
          setResStatus('Email registration successful. Redirecting you to the Login page.')
          setTimeout(() => history.push('/login'), 3000)
        } else {
          setError(true);
          setResStatus(res.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setResStatus(err.message);
      })
  }

  return (
    <div className="register">
      <Grid centered columns={3} textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <ValidationError message={errors.name}/>}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                id="email"
                className={handleError('Email')}
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <ValidationError message={errors.email}/>}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                id="confirmPass"
                className={handleError('Password')}
                value={values.confirmPass}
                onChange={handleChange}
              />
              {errors.password && <ValidationError message={errors.password}/>}
              {errors.confirmPass && <ValidationError message={errors.confirmPass}/>}
              <Button 
                color="blue" 
                fluid 
                size="large"
                disabled={loading} 
                className={loading ? 'loading' : ''}
              >
                Register
              </Button>
              {error && <ValidationError message={resStatus} submitError={true}/>}
              {resStatus !== '' && <ValidationError message={resStatus}/>}
            </Segment>
          </Form>
          <Message>
            Already Registered? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
};

export default Register;