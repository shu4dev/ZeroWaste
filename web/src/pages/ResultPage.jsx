import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
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
      fetch(`https://zero-waste-zeta.vercel.app/api/getOne/${OrderId}`, {
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
        <Row className="justify-content-center">
          <Col className="text-center">
            <h2>Thank you for ordering</h2>
            <br/>
            <h2>Your Order ID is {OrderId}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-10" xs={6} md={5}>
          <h3>Detail</h3>
          <ul>
          {filteredKeyValuePairs.map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
            ))}
          </ul>
          </Col>
          </Row>
          <h5>Use this QRcode to see you order again</h5>
          <Image src = {qrurl} />
    </Container>
  );
}

export default ResultPage;
