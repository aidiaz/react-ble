import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const MyNavbar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#graph">Graph</Nav.Link>
                        <Nav.Link href="#console">Console</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;