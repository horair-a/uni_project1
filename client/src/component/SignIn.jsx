import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import "../CSS/SignIn.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/api/signup",
        formData
      );
      toast.success(response.data.message, { position: "top-right" });
      console.log(response.data.role);
      if (response.data.role === "admin") {
        navigate("/dashboard");
        localStorage.setItem("Data", JSON.stringify(response.data));
      } else if (response.data.role === "vc") {
        navigate("/reports");
        localStorage.setItem("Data", JSON.stringify(response.data));
      } else {
        navigate("/user-requests");
        localStorage.setItem("Data", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="overlay" />

        <div className="signup-form">
          <div className="header-1">
            <h1>CUET STORE</h1>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Mail className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-input"
                value={formData.email}
                onChange={inputHandler}
                required
              />
            </div>

            <div className="form-group">
              <Lock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={inputHandler}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <span>Login</span>
              <ArrowRight />
            </button>
          </form>

          <p className="login-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
