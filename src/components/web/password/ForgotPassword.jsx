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
        "https://ecommerce-node4-five.vercel.app/auth/forgotPassword",
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Forgot Password</h1>
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
                <div className="mb-3">
                  <label htmlFor="formBasicPassword" className="form-label">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formBasicPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formBasicCode" className="form-label">Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formBasicCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    placeholder="Enter the code from your email"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;