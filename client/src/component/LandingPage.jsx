import React from "react";
import { Store, Phone, Info, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../CSS/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signup_page");
  };

  return (
    <div>
      <header className="header-land">
        <nav className="nav">
          <div className="nav-container">
            <div className="logo-container">
              <Store size={32} color="#4f46e5" />
              <span className="logo-text">CUETStore</span>
            </div>
            <div className="nav-links">
              <button className="nav-button" onClick={handleLoginClick}>
                <LogIn size={20} />
                Login
              </button>
              <button className="nav-button">
                <Phone size={20} />
                Contact Us
              </button>
              <button className="nav-button">
                <Info size={20} />
                About
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">CUETStore</h1>
          <p className="hero-tagline">
            Welcome to CUETStore – the centralized inventory for CUET! 🏢
            Request departmental essentials like chairs, tables, and multimedia
            equipment effortlessly.
          </p>

          <button className="cta-button nav-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
