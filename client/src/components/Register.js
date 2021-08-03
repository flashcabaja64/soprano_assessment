import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../utils/useForm';
import { Button, Form, Input, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import Cropper from 'react-easy-crop';
import empty from '../assets/empty.jpg'
import { registerUser } from '../utils/validations';
import ValidationError from '../utils/ValidationError';
import UserService from '../services/UserService';
import getCroppedImg from '../utils/cropImage'
 
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resStatus, setResStatus] = useState('');
  const history = useHistory();
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [img, setImg] = useState(null);
  const [croppedImg, setCroppedImg] = useState(null)

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

    getCroppedImg(img, croppedImg).then((image) => {
      UserService.registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        image: image
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
    })
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedImg(croppedAreaPixels)
  }, [])

  const addFile = e => {
    const image = e.target.files[0];
    const reader = new FileReader();

    if(image) {
      reader.onload = e => {
        setImg(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    } 
  }

  return (
    <div className="register">
      <Grid 
        centered 
        columns={img !== null ? 3 : 2} 
        textAlign="center" 
        verticalAlign="middle"
      >
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
            {/* <Image src={empty} avatar size="mini"/> */}
              <Form.Input
                fluid
                hidden
                label="File types: jpg, jpeg, png"
                name="file"
                type="file"
                id="image"
                //value={values.image}
                onChange={addFile}
              />
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
        {img !== null ? (
          <Grid.Column>
          <Segment stacked>
            <Image src={img} />
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              cropShape='round'
              aspect={4/4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="horizontal-cover"
            />
            </Segment>
            <Header as="h3" textAlign="center">
              Please drag or scroll to resize image.
            </Header>
          </Grid.Column>
        )
          : 
          (<></>)
        }
          
      </Grid>
    </div>
  )
};

export default Register;