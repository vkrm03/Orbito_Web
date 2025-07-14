import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to <span className="orbito-text">Orbito</span></h2>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Username or Email" />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot" className="forgot">Forgot your password?</Link>
        </div>

        <button className="login-btn">Sign in</button>

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
