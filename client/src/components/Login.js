import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import useForm from '../utils/useForm';
import { loginUser } from '../utils/validations';
import ValidationError from '../utils/ValidationError';
import UserService from '../services/UserService';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [resStatus, setResStatus] = useState('');
  const history = useHistory();

  const { handleChange, handleSubmit, values, errors } = useForm(
    {
      email: '',
      password: '',
    },
    submit,
    loginUser
  )

  const handleError = (errorName) => resStatus.includes(errorName) ? 'error' : ''

  function submit() {
    setLoading(true);

    UserService.userLogin({
      email: values.email,
      password: values.password
    })
    .then((res) => {
      if(res.status === 200 || res.message.includes("success")) {
        setLoading(false);
        setResStatus('Login successful!')
        UserService.saveUserId(res.id);
        //setTimeout(() => history.push('/posts'), 3000)
      } else {
        console.log(res)
        setResStatus(res.message);
      }
      setLoading(false);
    })
    .catch((err) => {
      setResStatus(err.message);
    })
  }

  return (
    <div className="login">
      <Grid centered columns={3} textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email address"
                id="email"
                className={handleError('email')}
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
                className={handleError('password')}
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <ValidationError message={errors.password}/>}
              <Button 
                color="blue" 
                fluid 
                size="large"
                disabled={loading} 
                className={loading ? 'loading' : ''}
              >
                Login
              </Button>  
              {resStatus !== '' && <ValidationError message={resStatus}/>}
            </Segment>
          </Form>
          <Message>
            Not registered yet? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}
  
export default Login;