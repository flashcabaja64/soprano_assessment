import React, { useState, useEffect, useContext } from 'react';
import { Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from 'react-router-dom';
import UserService from '../services/UserService';
import { UserContext } from './context/UserContext';

const Header = () => {
  const history = useHistory();
  const [data, setData] = useState('')
  const [user, setUser] = useState()
  const User = useContext(UserContext);
  

  const handleLogout = () => {
    UserService.clearUserId();
    setData('logged out')
    history.push('/login');
  }

  const renderLogoutLink = () => {
    return (
      <Menu.Menu position="right">
        {/* <Image src={user.image}/> */}
        {/* <p>{user.name}</p> */}
        <Menu.Item as={Link} name="Logout" onClick={handleLogout}/>
      </Menu.Menu>
    )
  }

  const renderLoginLink = () => {
    return (
    <>
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login" name="Login" />
        <Menu.Item as={Link} to="/register" name="Register" />
      </Menu.Menu>
    </>
    )
  }
  return (
    <div className="navbar">
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        {
          UserService.hasUserId()
            ? renderLogoutLink()
            : renderLoginLink()
        }
      </Menu>
    </div>
  )
}

export default Header;