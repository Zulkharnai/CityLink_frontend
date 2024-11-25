import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card, Form, Container, Row, Col } from 'react-bootstrap';
import { PostCallWithErrorResponse } from "../api/ApiServices";
import ApiConfig from "../api/ApiConfig";
import ToastMsg from '../ToastMsg';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {

  let navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = ( ) => {
    PostCallWithErrorResponse(ApiConfig.LOGIN_USER, JSON.stringify({ ...loginUser }))
      .then((res) => {
        if (res.json.success === true) {
          
          ToastMsg("success", 'Login Successfully')
          localStorage.setItem("authorization", res.json.token)
          localStorage.setItem("user", JSON.stringify(res.json.data))
          onLogin()
          navigate('/Dashboard')

        }else{
          ToastMsg("error", res.json.message)
        }
      })
      .catch((err) => {
        ToastMsg("error", err);
      })
  }
  
  return (
    <>
    <Container fluid style={{ height: '100vh', backgroundColor: 'rgb(244, 247, 255)' }}>
      <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
        <Col xs={12} md={6} lg={4}>
          <Card style={{ width: '25rem', padding: '1rem' }}>
          <Card.Body>
                <Card.Title className="text-center mb-4 font-weight-bold">
                  <h2>Welcome Back!</h2>
                </Card.Title>

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      style={{ borderRadius: '8px', boxShadow: 'none', borderColor: '#ccc' }}
                      onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      style={{ borderRadius: '8px', boxShadow: 'none', borderColor: '#ccc' }}
                      onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me logged in" />
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="w-100 py-2 mt-3"
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Log In
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Login