import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
const OrderHistoryPage = () => {
  const [orderlist, setorderlist] = useState();
  const [user] = useAuthState(auth);

  useEffect(() =>{
    fetch('https://zero-waste-api.vercel.app/api/getMulti',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user ? {Email : user.email } : {})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      else {
        return response.json();
      }
    })
    .then(data => {
      setorderlist(data);
      console.log(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  },[user])

  
  
  
  return (
    <Container className="mt-5 vh-100">
        <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>History Page</h2>
          </Col>
          <Row xs={1} md={2} className="g-4 justify-content-center m-3">
            <Card className="p-5 text-center" style={{backgroundColor:"#e1ecf7"}}>
              <h4>No Orders Yet</h4>
              <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Detail</th>
                <th>return status</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </Table>
            </Card>
          </Row>
        </Col>
        </Row>
    </Container>
  );
}

export default OrderHistoryPage;