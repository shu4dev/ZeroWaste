import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    <Container className="mt-5">

       <Row className="justify-content-center">
       <Col md={7}>
       <h1 className="text-center mb-4">Search Page</h1>
       </Col>
      </Row>

      <Row className="justify-content-center mt-1">
        <Col className="col-10" xs={6} md={10}>
          <Card  className=" h-100 p-5 text-center" style={{backgroundColor:"#e1ecf7"}}>
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
            <Button variant="primary" type="submit" className="my-3 px-5">Search</Button>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Detail</th>
                <th>return status</th>
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
                  </tr>
                ))
              }
            </tbody>
          </Table>
          </Form>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default SearchPage;