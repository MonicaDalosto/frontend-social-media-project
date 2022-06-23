import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import NavbarItem from './NavbarItem';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const Navigation = () => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userId = user ? user.id : '';

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        Cool story bro
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: '100%' }} fill>
          <NavbarItem path="/" linkText="Spaces" />
          <NavbarItem path="/other" linkText="Other" />
          {token && user ? (
            <NavbarItem path={`myspace/${userId}`} linkText="My space" />
          ) : (
            ''
          )}
          {/* <NavbarItem path="/myspace" linkText="My space" /> */}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Navigation };
