import React, { useEffect } from 'react'
import { Navbar, Nav, Container,  } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";

function Header() {
    const { cartProducts } = useSelector(state => state.indexReducers)
    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >POS</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="ml-auto">
                        <div className='cart d-flex align-items-center'>
                            <b><p className='mt-3 '>{cartProducts.length}</p></b>
                            <LinkContainer to="/cart">
                                <Nav.Link ><i class="bi bi-basket-fill"></i></Nav.Link>
                            </LinkContainer>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header