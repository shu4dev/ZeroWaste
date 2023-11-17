import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

  const navigate = useNavigate();
  const [OrderId, setOrderid] = useState();
  const handleSearch = () =>{
    
    navigate(`/result/${OrderId}`);
  }

  return (
    <Container className="mt-5 vh-100">
       <Row className="justify-content-center">
       <Col md={6}>
       <h1 className="text-center mb-4">Search Page</h1>
       </Col>
      </Row>
      <Row className="justify-content-center mt-1">
        <Col className="col-10" xs={6} md={5}>
          <Card className="p-5 text-center " style={{backgroundColor:"#e1ecf7"}}>
          <Form onSubmit={handleSearch}>

            <Form.Group controlId="formUsernameSignUp" className="my-3">
              <Form.Control
                type="text"
                placeholder="Enter Order ID"
                onChange={(e) => setOrderid(e.target.value)}
                required
                className="p-3"
              />
            </Form.Group>
            <div className="text-center">
            <Button variant="primary" type="submit" className="my-3 px-5">
              Search
            </Button>
            </div>
          </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;