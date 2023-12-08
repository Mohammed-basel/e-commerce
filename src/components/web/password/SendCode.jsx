import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const SendCode = () => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch('https://ecommerce-node4.vercel.app/auth/sendcode', {
        email,
      });

      if (response.data.message === 'success') {
        toast.success('Code sent successfully! Check your email.');
        navigate('/forgotpassword');
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error sending code:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h1 className="text-center">Send Code</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SendCode;
