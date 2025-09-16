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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simple login logic for testing
      if (formData.email === 'test@example.com' && formData.password === 'password123') {
        // Store user data in localStorage
        const userData = {
          email: formData.email,
          name: 'Test User',
          username: 'testuser'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please use the demo credentials provided below.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <img src="/l7.png" alt="Compliance Eye" className="logo-image" />
            <h2>Compliance Eye</h2>
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
        {/* Left Panel - Visual/Promotional Section */}
        <div className="visual-panel">
          <div className="visual-content">
            <div className="main-image-container">
              <img 
                src="/WhatsApp Image 2025-09-16 at 10.48.03.jpeg" 
                alt="Compliance Eye Visual" 
                className="main-visual-image"
              />
            </div>
            
            <div className="navigation-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-panel">
          <div className="login-header">
            <span className="no-account-text">Don't have an account?</span>
            <button className="create-profile-btn" onClick={() => navigate('/register')}>
              Create profile
            </button>
          </div>

          <div className="login-content">
            <h1 className="login-title">Get exclusive access to Compliance Eye</h1>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  className="login-input"
                  required
                />
                <div className="input-underline"></div>
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="login-input"
                  required
                />
                <div className="input-underline"></div>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Login'}
              </button>
            </form>

            <a href="#" className="forgot-password">Forgot password?</a>

            <div className="social-login">
              <button className="social-btn facebook">
                <span>f</span>
              </button>
              <button className="social-btn linkedin">
                <span>in</span>
              </button>
              <button className="social-btn google">
                <span>G</span>
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <h4>Demo Credentials:</h4>
              <div className="credentials-list">
                <div className="credential-item">
                  <strong>Email:</strong> test@example.com
                </div>
                <div className="credential-item">
                  <strong>Password:</strong> password123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
