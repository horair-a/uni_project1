import React from "react";
import { Store, Phone, Info, LogIn } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Headerr = () => {
    const navigate = useNavigate();
  
  return (
    <header className="header">
      <div className="logo-container">
              <Store size={32} color="#fff" />
              <span className="logo-text" style={{ color: 'white' }}>CUETStore</span>

            </div>
      <div className="header-right">
        <Link to='/'><span className="header-option">Logout</span></Link>
      </div>
    </header>
  );
};

export default Headerr;
