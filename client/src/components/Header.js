import React, { useState, useEffect } from 'react';
import { Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from 'react-router-dom';
import UserService from '../services/UserService';
import empty from '../assets/empty.jpg'

const Header = () => {
  const history = useHistory();
  const [data, setData] = useState('')
  const [profile, setProfile] = useState()

  useEffect(() => {
    if(UserService.hasUserId()) {
      async function fetchProfile() {
        try {
          let data = UserService.getUserId('id');
          let response = await UserService.getUserProfile(data)
          
          await setProfile({
            name: response.user[0].name,
            image: response.user[0].image
          })
          setData('success')
        } catch (err) {
          console.log(err)
        }
      }
      fetchProfile();
    }
  },[data])

  const handleLogout = () => {
    UserService.clearUserId();
    setData('logged out')
    history.push('/login');
  }

  const renderLogoutLink = () => {
    return (
      <Menu.Menu position="right">
        {
          !profile ?
          <Image 
            src={empty}
            avatar
            size="mini"
            verticalAlign="bottom"
            style={{ marginTop: '1.3rem' }}
          />
          :
          <Image 
            src={profile.image}
            avatar
            verticalAlign="bottom"
            style={{ marginTop: '1.3rem' }}
          />
        }
        <Menu.Item>
        
        <span>{!profile ? '' : profile.name}</span>
        </Menu.Item>
        
        <Menu.Item as={Link} to="/posts" name="Posts"/>
        <Menu.Item name="Logout" onClick={handleLogout}/>
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