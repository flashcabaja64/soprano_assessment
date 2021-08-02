import React from 'react';
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar">
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/register" name="Register" />
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default Header;