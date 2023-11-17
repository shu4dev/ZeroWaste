import React, {useEffect, useState} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
let id = "";
const ConfirmationPage = () => { 

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const data = location.state.filter((item) =>{return item.quantity > 0});
  const obj = Object.fromEntries(data.map(item => [item.name, item.quantity]))
  useEffect(() =>{
    document.addEventListener('keypress', detectKeyPress);
    const checkDevice = async () => {
      try {
        const response = await fetch('https://zero-waste-api.vercel.app/checkDevice');
        const result = await response.json();
        setDeviceStatus(result.success);
      } catch (error) {
        console.error('Error checking device:', error);
        setDeviceStatus(false);
      }
    };
    checkDevice();
  })

  const handleClick = (buttonName) => {
  
    setActiveButton(buttonName === activeButton ? null : buttonName);
    setLoading(true);
    
    fetch('https://zero-waste-api.vercel.app/api/postOrder', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(obj)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      id = data["_id"];
    })
    .catch(error => {
      console.error('Error:', error);
    });

    if (buttonName === "Button2" || buttonName === "Button3") {
      setTimeout(() => {
        navigate(`/result/${id}`);
    }, 5000);
  }
  }
  
  const handleEdit = () => {
    navigate("/", {state: location.state});
  }

  const detectKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/result/${id}`);
    }  
  }

  if (!location.state) {
    return <Navigate to = "/" replace={true}/>
  }
    return (
      <Container className="vh-100">
        <Row className="my-5 text-center">
          <h1>Confirmation Page</h1>
        </Row>
        <Row className="justify-content-center">
        <Col className="col-10" xs={6} md={5}>
              <ul className="list-group">
              { location.state.map((item)=> 
                item.quantity > 0 && 
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="badge badge-primary badge-pill text-dark">{item.name} : {item.quantity}</span>
                  </li>)
              }
              </ul>
          </Col>
        </Row>
        <Row className="py-5">
              <Col>
              <Button onClick={handleEdit} variant="primary" type="submit">Edit Order</Button>
              </Col>
              {
                deviceStatus && <Col>
                <Button onClick={() => handleClick('Button1')} disabled = {loading} variant="primary" type="submit">Cerdit Card</Button>
                {
                  activeButton === "Button1" && <Col>Please tap your credit card</Col>
                }
                </Col>
              }
              <Col>
              <Button onClick={() => handleClick('Button2')} disabled = {loading} variant="primary" type="submit">Student ID</Button>
              {
                activeButton === "Button2" && <Col>Please provide you student ID to rent your Container <br/> direct to result page in 5 seconds....</Col>
              }
              </Col>
              <Col>
              <Button onClick={() => handleClick('Button3')} disabled = {loading} variant="primary" type="submit">Cash</Button>
              {
                activeButton === "Button3" && <Col>Please pay 5$ to rent your Container <br/> direct to result page in 5 seconds....</Col>
              }
              </Col>
        </Row>
      </Container>
    );
};
export default ConfirmationPage;