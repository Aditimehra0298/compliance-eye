import React, { useState, useEffect } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple login logic for testing
      if (formData.email === 'test@example.com' && formData.password === 'password123') {
        // Store user data in localStorage
        const userData = {
          email: formData.email,
          name: 'Test User',
          username: 'testuser',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Remember email if checkbox is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
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
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="form-input"
                    required
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </a>
                </div>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Remember me</span>
                </label>
              </div>

              <button 
                type="submit" 
                className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span className="divider-text">or</span>
            </div>

            <div className="auth-switch">
              <span className="switch-text">Don't have an account? </span>
              <button 
                onClick={() => navigate('/register')} 
                className="switch-btn"
                disabled={isLoading}
              >
                Create Account
              </button>
            </div>

            {/* Demo Credentials - Hidden */}
            {/* <div className="demo-credentials">
              <div className="demo-header">
                <i className="fas fa-info-circle"></i>
                <h4>Demo Credentials</h4>
              </div>
              <div className="credentials-list">
                <div className="credential-item">
                  <i className="fas fa-envelope"></i>
                  <span className="credential-label">Email:</span>
                  <span className="credential-value">test@example.com</span>
                </div>
                <div className="credential-item">
                  <i className="fas fa-lock"></i>
                  <span className="credential-label">Password:</span>
                  <span className="credential-value">password123</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="promo-panel">
          <div className="image-container">
            <img 
              src="/WhatsApp Image 2025-09-16 at 10.48.03.jpeg" 
              alt="Compliance Eye" 
              className="login-image"
            />
            <div className="image-overlay">
              <h2 className="image-title">Compliance Eye</h2>
              <p className="image-subtitle">AI-Powered Compliance Solutions</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
