import React from 'react';
import { Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import { signOut } from 'firebase/auth';
const NavBar = () => {
  const [user, loading] = useAuthState(auth);

  fetch('https://zero-waste-zeta.vercel.app/express_backend')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("back-end ok");
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }
  return (
    <Navbar collapseOnSelect expand="xl" className="bg-dark">
      <Container fluid>
        <Nav className="justify-content-start px-5 sticky">
          <a className="" href={"/"}>
            <Image src="https://cdn.discordapp.com/attachments/1169783962864988201/1171205404659810476/HACC_-_ZERO_WASTE_1.png?ex=655bd508&is=65496008&hm=767e27962275a795b00a4681f65f526774fad684a28ecb26599a0290019c8858&" width="150px"/>
          </a>
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />

        <Row>
          <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-center">
          <Nav.Link className="px-5" href={"/"}>CONTAINERS</Nav.Link>
          <Nav.Link className="px-5" href={"/search"}>SEARCH</Nav.Link>
          {
            user ? <>
                      <Nav.Link className="px-5" href={"/history"}>HISTORY</Nav.Link>
                      <Nav.Link className="px-5" href={"/"} onClick={handleSignOut}>SIGNOUT</Nav.Link>
                   </> 
                 : <>
                      <Nav.Link className="px-5" href={"/signin"}>SIGNIN</Nav.Link>
                      <Nav.Link className="px-5" href={"/signup"}>SIGNUP</Nav.Link>
                   </>
          }
          <Nav.Link className="px-5" href={"https://www.fullcycletakeouthawaii.org/"}>FULL CYCLE TAKEOUT </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
};

export default NavBar;