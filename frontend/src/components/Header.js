import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <LinkContainer to={`/profile`}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign in
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin">
                <LinkContainer to={`/admin/userlist`}>
                  <NavDropdown.Item>User List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/admin/productList`}>
                  <NavDropdown.Item>Product List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/admin/orderList`}>
                  <NavDropdown.Item>Order List</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
