import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const OrderHistoryPage = () => {
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
            </Card>
          </Row>
        </Col>
        </Row>
    </Container>
  );
}

export default OrderHistoryPage;