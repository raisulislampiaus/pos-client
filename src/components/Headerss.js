import React, { useEffect } from 'react'

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";


function Headerss() {
  const { cartProducts } = useSelector(state => state.indexReducers)
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-1">
          <Container fluid>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <LinkContainer to="/">
              <Navbar.Brand >POS</Navbar.Brand>
            </LinkContainer>
            <Navbar.Brand >
              <div className='cart d-flex align-items-center'>
                <b><p >{cartProducts.length}</p></b>
                <LinkContainer to="/cart">
                  <Nav.Link ><i class="bi bi-basket-fill"></i></Nav.Link>
                </LinkContainer>
              </div>
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            // placement="end"
            >

              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  POS
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav >
                  <LinkContainer to="/">
                    <Nav.Link >Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/products">
                    <Nav.Link >Products</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/customers">
                    <Nav.Link >Customers</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/category">
                    <Nav.Link >Category</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/bills">
                    <Nav.Link >Bills</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link >Logout</Nav.Link>
                  </LinkContainer>
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Headerss;