import React from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="full-width-navbar">
      <Button variant="primary" onClick={toggleSidebar} className="mr-2">
        <span className="navbar-toggler-icon"></span>
      </Button>
      <Navbar.Brand as={Link} to="/dashboard" className="ml-2" onClick={() => navigate('/dashboard')}>
        Menu
      </Navbar.Brand>
      <Nav className="ml-auto profile-nav">
        <Dropdown alignRight>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className="profile-icon">
            <i className="bi bi-person-circle"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end custom-dropdown-menu">
            <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
            <Dropdown.Item as={Link} to="/">Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}

export default Header;
