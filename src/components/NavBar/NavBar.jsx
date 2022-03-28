import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CartWidget from "../Widget/Cart";
import { NavLink } from "react-router-dom";


export default function NavBar({componenteContainer}) {
  return (
    <>
      <Navbar bg="light" expand="lg" >
        <Container fluid>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand>UAVProject</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 navbar"
              navbarScroll
            >
              <NavLink className='navbar-NavLink' to="/">Inicio</NavLink>
              <NavLink className='navbar-NavLink'  href="#productos" to='category/drones'>Drones</NavLink>
              <NavDropdown className='navbar-NavLink' title="Accesorios">
                <NavDropdown.ItemText>
                  <NavLink to='category/batteries' className='navbar-NavLink'>
                    Baterias
                  </NavLink>
                </NavDropdown.ItemText>
                <NavDropdown.ItemText>
                  <NavLink to='category/propellers' className='navbar-NavLink'>
                    Helices
                  </NavLink>
                </NavDropdown.ItemText>
                <NavDropdown.ItemText>
                  <NavLink to='category/gimbals' className='navbar-NavLink'>
                    Gimbals
                  </NavLink>
                </NavDropdown.ItemText>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <NavLink to='/cart'>
                <Button className="border-0 disabled" variant="outline-dark">
                  <CartWidget />
                </Button>
              </NavLink>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
   
  );
};
