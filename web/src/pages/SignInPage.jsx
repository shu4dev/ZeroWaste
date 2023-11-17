import React, { useState } from 'react';
import '../stylesheets/index.css';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate} from 'react-router-dom';


export default function SignInPage()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const errorSwitch = (errorCode) => {

    switch(errorCode){
      case 'auth/invalid-email':
        return ("Email address not found: Please make an account.");
      case 'auth/invalid-login-credentials':
        return ("Incorrect password: Check if your email is inputed correctly. Please try again.");
      case 'auth/too-many-requests':
        return("Too many failed attempts: Please try again later, or contact us regarding this issue.");
      default:
        if(errorCode !== undefined){
          return("Please contact us with error code: " + errorCode);
        }
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate("/")
    })
    .catch((error) => {
      console.log(error.code, error.message);
      setError(error.code);
    });
  };
  
  return (
    <Container className="vh-100">
    <Row className="mt-5 text-center">
        <h1>Sign In</h1>
    </Row>

    <Row className="justify-content-center">
      <Col className="col-10 mt-3" xs={6} md={5}>
        <Card className="p-5" style={{backgroundColor:"#e1ecf7"}}>
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
          <div className="text-center warning">
            {errorSwitch(error)}
          </div>
          <div className="text-center">
          <Button variant="primary" type="submit" className="my-3 px-5">
            Sign In
          </Button>
          </div>
        </Form>
        </Card>
      </Col>
    </Row>

  </Container>
  );
};