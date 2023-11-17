import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
let qrurl = "";

const QRCode = require('qrcode');

var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark:"#010599FF",
      light:"#FFBF60FF"
    }
  }

const ResultPage = () => {
    
    const {OrderId} = useParams();
    const [apiData, setApiData] = useState(null);
    QRCode.toDataURL(window.location.href, opts, function (err, url) {
      if (err) throw err
      qrurl = url;
    })
    useEffect(() => {
      fetch(`https://zero-waste-api.vercel.app/api/getOne/${OrderId}`, {
        method: "GET"
      })
      .then(response => response.json())
      .then(data => {
        setApiData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      }, [OrderId]);
      const filteredKeyValuePairs = apiData ? Object.entries(apiData).filter(([key, value]) => value > 0): [];
  return (
    <Container className="mt-5 vh-100">
        <Row className="justify-content-center text-center">
            <h1>Thank you for ordering</h1>
            <br/>
            <h3>Your Order ID: {OrderId}</h3>
        </Row>

        <Row xs={1} md={2} className="g-4 justify-content-center m-3">
          <Card className="p-5" style={{backgroundColor:"#e1ecf7"}}>
            <Card.Title>
            <h3 className="text-center">Order Details</h3>
              <br/>

                  <Col className="col-12">
                    <Card className="p-3">
                      <ul>
                        {filteredKeyValuePairs.map(([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Col>

            </Card.Title>
            <Card.Header className="text-center pb-5 mt-4" style={{backgroundColor:"#FFFFFF"}}>
              <h5 className="py-4">Please save this QRcode or Order ID to access this page again.</h5>
              <Image src = {qrurl} />
            </Card.Header>
          </Card>
        </Row>
    </Container>
  );
}

export default ResultPage;
