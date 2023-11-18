import React,{ useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const SignUpPage = () => {
  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });

        fetch('https://zero-waste-api.vercel.app/api/postuser', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        }
        ).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

        navigate("/");
    }


  return (
    <Container className="vh-100">
      <Row className="mt-5 text-center">
          <h1>Sign Up</h1>
      </Row>

      <Row className="justify-content-center">
        <Col className="col-10 mt-3" xs={6} md={5}>
          <Card className="p-5" style={{backgroundColor:"#e1ecf7"}}>
          <Form onSubmit={handleSignUp}>

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
              Sign Up
            </Button>
            </div>
          </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;