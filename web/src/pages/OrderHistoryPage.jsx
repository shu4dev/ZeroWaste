import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OrderHistoryPage = () => {
  return (
    <Container className="mt-5 vh-100">
        <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Your Order</h2>
          </Col>
          <Row xs={1} md={2} className="g-4">
            information here
          </Row>
        </Col>
        </Row>
    </Container>
  );
}

export default OrderHistoryPage;