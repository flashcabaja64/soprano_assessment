import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from '../../services/UserService'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return ( 
    <Route 
      {...rest}
      render={props => (
        UserService.hasUserId() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}

export default PrivateRoute;