import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "https://ecommerce-node4.vercel.app/auth/forgotPassword",
        {
          email,
          password,
          code,
        }
      );

      if (response.data.message === "success") {
        toast.success("Password updated successfully!");
        navigate("/signIn");
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h1 className="text-center">Forgot Password</h1>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCode">
              <Form.Label>Code:</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter the code from your email"
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

export default ForgotPassword;
