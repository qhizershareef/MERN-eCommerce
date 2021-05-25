import { useEffect  } from 'react';
import { Route} from 'react-router-dom';
import { Container, Navbar, Nav ,NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import {LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state=> state.userLogin);

  const {userInfo} = userLogin
  
  useEffect(()=>{

  });
  const logoutHandler = () =>{
    dispatch(logout());
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>YOURCART</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({history})=> <SearchBar history={history}/>}/>
            <Nav className="ml-auto">
              <LinkContainer to="/Cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo?(
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              ):(
                <LinkContainer to="/Login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
              )}
              {
                userInfo && userInfo.isAdmin && (
                  <NavDropdown title='ADMIN' id='admin'>
                    <LinkContainer to="/admin/userslist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productslist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderslist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
