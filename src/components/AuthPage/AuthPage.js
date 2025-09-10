import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Add login logic here
  };

  return (
    <div className="auth-page">
      {/* Navigation content at top of hero */}
      <div className="hero-nav-content">
        <div className="nav-container">
          <ul className="nav-menu nav-left">
            <li><a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>← Back to Home</a></li>
          </ul>
          
          <div className="nav-logo">
            <img src="/l7.png" alt="DamnArt" className="logo-image" />
            <h2>DamnArt</h2>
          </div>
          
          <div className="nav-right">
            <div className="social-nav">
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-container">
        {/* Left Panel - Authentication Form */}
        <div className="auth-panel">
          <div className="auth-content">
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">
              Log in to your Compliance Eye account to continue.
            </p>


            {/* Authentication Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Your password"
                    required
                  />
                  <button type="button" className="password-toggle">
                    👁️
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Sign In
              </button>
            </form>

            <div className="auth-switch">
              <span>Don't have an account? </span>
              <button 
                onClick={() => navigate('/register')} 
                className="switch-btn"
              >
                Register here
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Promotional Content */}
        <div className="promo-panel">
          <div className="promo-content">
            <h2 className="promo-title">400K+ users. 50M+ AI generated reports.</h2>
            <button className="join-btn">
              Join Now
              <div className="join-arrow">↑</div>
            </button>
          </div>
          
          <div className="promo-graphics">
            <div className="background-text">3D</div>
            <div className="geometric-shape">
              <div className="shape-corners">
                <div className="corner-dot"></div>
                <div className="corner-dot"></div>
                <div className="corner-dot"></div>
                <div className="corner-dot"></div>
              </div>
              <div className="shape-lines">
                <div className="dashed-line"></div>
                <div className="dashed-line"></div>
                <div className="dashed-line"></div>
                <div className="dashed-line"></div>
              </div>
            </div>
            <div className="rotating-arrow">↻</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
