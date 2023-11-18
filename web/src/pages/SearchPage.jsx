import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {Plus} from 'react-bootstrap-icons';

const SearchPage = () => {

  const [OrderId, setOrderid] = useState();
  const [OrderList, setOrderList] = useState([]);
  useEffect(()=>{
    fetch('https://zero-waste-api.vercel.app/api/getAll')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setOrderList(data);
    })
    .catch(error => {
      console.log('Error fetching data', error);
    })
  })
  

  const navigate = useNavigate();


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
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Detail</th>
                <th>status</th>
                <th>Add to your account</th>
              </tr>
            </thead>
            
            <tbody>
              {
                OrderList && OrderList.map((order) => (
                  <tr>
                    <td>{order["_id"]}</td>
                    <td>
                      <ul>
                        {
                        Object.entries(order).filter(([key, value]) => 
                          typeof value === 'number' && key !== "__v"
                        ).map(([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        ))
                        }
                      </ul>
                    </td>
                    <td>{order["return"].toString()}</td>
                    <td><Plus/></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
            </div>
          </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;