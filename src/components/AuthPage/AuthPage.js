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
        {/* Left Panel - Authentication Form */}
        <div className="auth-panel">
          <div className="auth-content">
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">
              Log in to your Compliance Eye account to continue.
            </p>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

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

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
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
