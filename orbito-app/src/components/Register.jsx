import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <p className="subtitle">Join <span className="orbito-text">Orbito</span> and start your journey</p>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Enter your full name" />
        </div>

        <div className="input-group">
          <FaPhone className="input-icon" />
          <input type="tel" placeholder="Enter your phone number" />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
          />
          <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="auth-button">Send OTP</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
