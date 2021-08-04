import React, { createContext, useState } from 'react';
import UserService from '../../services/UserService';

export const UserContext = createContext()

export const UserProvider = props => {
  const [data, setAuthData] = useState(null);
  const [profile, setProfile] = useState();

  const processLogin = (res) => {
    setAuthData(res.token);
  }

  const getCurrentUser = () => {
    let user_id = UserService.getUserId('id');
    UserService.getUserProfile(user_id)
      .then(async res => {
        await setProfile({
          name: res.name,
          image: res.image
        })
      })
      .catch(err => console.log(err))
  }

  const processLogout = () => {
    UserService.clearUserId();
    setAuthData(null);
  }

  const value = {
    processLogin,
    processLogout,
    getCurrentUser,
    data,
    profile
  }

  return (
    <UserContext.Provider value={ value }>
      { props.children }
    </UserContext.Provider>
  )
}