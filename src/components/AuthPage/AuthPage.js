import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', formData);
    } else {
      console.log('Register:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
  };

  return (
    <div className="auth-page">
      {/* Blur Gradient Header */}
      <div className="auth-nav-content">
        <div className="nav-container">
          <div className="nav-left">
            <button className="back-btn" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>
          <div className="nav-logo">
            <div className="logo-image">
              <div className="logo-hexagon"></div>
            </div>
            <h2>Compliance Eye</h2>
          </div>
          <div className="nav-right">
            <div className="language-selector">
              <select>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-container">
        {/* Left Panel - Authentication Form */}
        <div className="auth-panel">
          <div className="auth-content">
            <h1 className="auth-title">Welcome!</h1>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Log in to Compliance Eye to continue to Compliance Eye.' 
                : 'Create your account to get started with Compliance Eye.'
              }
            </p>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button className="social-btn google-btn">
                <div className="google-icon">G</div>
                Sign in with Google
              </button>
              <button className="social-btn apple-btn">
                <div className="apple-icon">🍎</div>
                Sign in with Apple
              </button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Authentication Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required={!isLogin}
                  />
                </div>
              )}

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
                  {isLogin && (
                    <a href="#" className="forgot-password">Forgot password?</a>
                  )}
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

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Log In' : 'Create Account'}
              </button>
            </form>

            <div className="auth-switch">
              <span>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button onClick={toggleMode} className="switch-btn">
                {isLogin ? 'Sign up' : 'Sign in'}
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
