import React, { createContext, useState } from 'react';
import UserService from '../../services/UserService';

export const UserContext = createContext()

export const UserProvider = props => {

  const [data, setAuthData] = useState(null);
  const [profile, setProfile] = useState();

  const processLogin = (res) => {
    UserService.getUserId('id');
    setAuthData(res.token);
    setProfile(res.id)
  }

  const processLogout = () => {
    UserService.clearUserId();
    setAuthData(null);
  }

  const value = {
    processLogin,
    processLogout,
    data,
    profile
  }

  return (
    <UserContext.Provider value={ value }>
      { props.children }
    </UserContext.Provider>
  )
}