import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'


function NavbarComponent() {
  return (
    <div>
      <Container fluid style={{ backgroundImage: "url('https:////images.ctfassets.net/9gf6mhyw2bkx/5I6IUvH0tVDtpw8ox5c6hm/9a30ffbc4d53f50723ace613cfa51979/aboutus_500.jpg')" }}>
       
        <div style={{ paddingTop: "200px" }}></div>
        <Navbar style={{ backgroundColor: "#ce2127",opacity:".8" }} expand="lg">

          <Container fluid>
            <Navbar.Brand href="/">          
            SGStitches</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <LinkContainer to="/">
                  <Nav.Link >Home</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/services">
                  <Nav.Link>Services</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contactus">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/allsamples">
                  <Nav.Link>All Samples</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/faqs">
                  <Nav.Link>FAQs</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <div style={{ color: 'white', fontSize: "30px" }}>  <FontAwesomeIcon icon={faPhone} style={{ color: "white" }} />  +1 (610) 563 6590  </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </Container>
    </div>
  );
}

export default NavbarComponent;
