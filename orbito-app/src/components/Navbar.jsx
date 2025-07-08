// Navbar.jsx
import React, { useState } from 'react';
import { FaPlaneDeparture, FaCar, FaHotel, FaUser, FaSignInAlt, FaFacebook, FaInstagram, FaTwitter, FaTrain, FaBus } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigation = (path) => {
    window.location.pathname = path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <a href="/" className="logo interactive">
            <span className="logo-text">Orbito</span>
            <div className="logo-glow"></div>
          </a>
          <div 
            className="nav-link interactive dropdown-trigger" 
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <FaPlaneDeparture />
            <span>Long Trips</span>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <a href="/flights" className="dropdown-item">
                <FaPlaneDeparture />
                <span>Flights</span>
              </a>
              <a href="/trains" className="dropdown-item">
                <FaTrain />
                <span>Trains</span>
              </a>
              <a href="/buses" className="dropdown-item">
                <FaBus />
                <span>Buses</span>
              </a>
            </div>
          </div>
          <a href="/short-trips" className="nav-link interactive">
            <FaCar />
            <span>Short Trips</span>
          </a>
          <a href="/hotels" className="nav-link interactive">
            <FaHotel />
            <span>Hotels</span>
          </a>
        </div>
        <div className="nav-right">
          <a href="/login" className="nav-btn interactive">
            <FaSignInAlt />
            <span>Login</span>
          </a>
          <a href="/register" className="nav-btn primary interactive">
            <FaUser />
            <span>Register</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;