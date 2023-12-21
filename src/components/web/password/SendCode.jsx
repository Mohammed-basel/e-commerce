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
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <h1 className="text-center">Send Code</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formBasicEmail" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="formBasicEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendCode;