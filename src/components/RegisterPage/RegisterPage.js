import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobilePhone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    userRole: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile Phone validation
    if (!formData.mobilePhone.trim()) {
      newErrors.mobilePhone = 'Mobile Phone Number is required for OTP';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobilePhone.replace(/\s/g, ''))) {
      newErrors.mobilePhone = 'Please include country code (e.g., +1234567890)';
    }

    // OTP validation
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // User Role validation
    if (!formData.userRole) {
      newErrors.userRole = 'User Role / ISO Standard is required';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Register:', formData);
      // Add registration logic here
    }
  };

  return (
    <div className="register-page">
      {/* Navigation content at top */}
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

      <div className="register-container">
        {/* Left Panel - Registration Form */}
        <div className="register-panel">
          <div className="register-content">
            <h1 className="register-title">Create Your Account</h1>
            <p className="register-subtitle">
              Join Compliance Eye and start your compliance journey today
            </p>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter valid email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="mobilePhone">Mobile Phone Number *</label>
                <input
                  type="tel"
                  id="mobilePhone"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  placeholder="Include country code (e.g., +1234567890)"
                  className={errors.mobilePhone ? 'error' : ''}
                />
                {errors.mobilePhone && <span className="error-message">{errors.mobilePhone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="otp">OTP Verification *</label>
                <div className="otp-container">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    className={errors.otp ? 'error' : ''}
                  />
                  <button type="button" className="otp-send-btn">
                    Send OTP
                  </button>
                </div>
                {errors.otp && <span className="error-message">{errors.otp}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Minimum 8 characters, strong password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button type="button" className="password-toggle">
                    👁️
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Must match Password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button type="button" className="password-toggle">
                    👁️
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="userRole">User Role / ISO Standard *</label>
                <select
                  id="userRole"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleInputChange}
                  className={errors.userRole ? 'error' : ''}
                >
                  <option value="">Select your role</option>
                  <option value="auditor">Auditor</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="site">Site</option>
                </select>
                {errors.userRole && <span className="error-message">{errors.userRole}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button type="submit" className="register-submit-btn">
                Create Account
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>

            <div className="register-switch">
              <span>Already have an account? </span>
              <button onClick={() => navigate('/auth')} className="switch-btn">
                Sign in here
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Promotional Content */}
        <div className="promo-panel">
          <div className="promo-content">
            <h2 className="promo-title">400K+ users. 50M+ AI generated reports.</h2>
            <p className="promo-description">
              Join thousands of companies already using our platform for compliance management
            </p>
            
            <div className="promo-features">
              <div className="promo-feature">
                <div className="promo-icon">📊</div>
                <div className="promo-text">
                  <h3>Real-time Analytics</h3>
                  <p>Get instant insights into your compliance status</p>
                </div>
              </div>
              
              <div className="promo-feature">
                <div className="promo-icon">🔒</div>
                <div className="promo-text">
                  <h3>Enterprise Security</h3>
                  <p>Bank-level security for your sensitive data</p>
                </div>
              </div>
              
              <div className="promo-feature">
                <div className="promo-icon">⚡</div>
                <div className="promo-text">
                  <h3>Automated Reports</h3>
                  <p>Generate compliance reports in minutes, not hours</p>
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

export default RegisterPage;
