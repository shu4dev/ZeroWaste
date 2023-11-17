import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from 'react-router-dom';


export default function SignInPage()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate("/")
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
  };
  
  return (
    <Container className="vh-100">
    <Row className="mt-5 text-center">
        <h1>Sign In</h1>
    </Row>

    <Row className="justify-content-center">
      <Col className="col-10" xs={6} md={5}>
        <Form onSubmit={handleSignIn}>

          <Form.Group controlId="formUsernameSignUp" className="my-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUsernameSignUp" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
          <Button variant="primary" type="submit" className="my-3 px-5">
            Sign In
          </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};