import React, {useEffect, useState} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
let id = "";
const ConfirmationPage = () => { 
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const data = location.state.filter((item) =>{return item.quantity > 0});
  const obj = Object.fromEntries(data.map(item => [item.name, item.quantity]))
  

  useEffect(() =>{

    document.addEventListener('keypress', detectKeyPress);
    fetch('/checkDevice')
    .then(response => {
      if (response.ok) {
        setDeviceStatus(true);
        return response.json();  
      } 
      throw new Error('Network response was not ok');
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  })

  const handleClick = (buttonName) => {
  
    setActiveButton(buttonName === activeButton ? null : buttonName);
    setLoading(true);

    fetch('https://zero-waste-api.vercel.app/api/postOrder', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
    ).then( response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      id = data["_id"];
      console.log('Success:', data);
      if (user) {
        fetch('https://zero-waste-api.vercel.app/api/update',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user ? {Email : user.email, Order : id} : {})
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
      }
  
      if (buttonName === "Button2" || buttonName === "Button3") {
        setTimeout(() => {
          navigate(`/result/${id}`);
      }, 5000);
    }
    })
    .catch(error => {
      console.error('Error:', error);
    });    
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
    <Container>
      <Row className="my-5 text-center">
        <h1>Confirmation Page</h1>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-10" xs={6} md={6}>
          <Card className="p-5" style={{backgroundColor:"#e1ecf7"}}>
            <ul className="list-group">
            { location.state.map((item)=>
              item.quantity > 0 &&
                <li className="list-group-item d-flex justify-content-between align-items-center listItems">
                <span className="badge badge-primary badge-pill text-dark">{item.name} : {item.quantity}</span>
                </li>)
            }
            </ul>
          </Card>
        </Col>
      </Row>

      <Row className="py-4 justify-content-center text-center">
        <Col className="col-10" xs={6} md={6}>

          <Button onClick={handleEdit} variant="primary" disabled={loading} type="submit" className="w-100 my-2" >restart Order</Button>

          {
            deviceStatus && 
              <Button onClick={() => handleClick('Button1')} disabled={loading} variant="primary" type="submit" className="w-100">Credit Card</Button>
              
          }
          { activeButton === "Button1" && <Col>Please tap your credit card</Col> }
          <Button onClick={() => handleClick('Button2')} disabled={loading} variant="primary" type="submit"  className="w-100 my-2">Student ID</Button>
          {
            activeButton === "Button2" && <Col>Please provide you student ID to rent your container(s) <br/> direct to result page in 5 seconds....</Col>
          }

          <Button onClick={() => handleClick('Button3')} disabled={loading} variant="primary" type="submit" className="w-100 my-2">Cash</Button>
          {
            activeButton === "Button3" && <Col>Please pay 5$ to rent your container(s) <br/> direct to result page in 5 seconds....</Col>
          }
        </Col>
      </Row>
    </Container>
  )
};
export default ConfirmationPage;
