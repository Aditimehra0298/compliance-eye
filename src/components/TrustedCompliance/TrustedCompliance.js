import React, { useState } from 'react';
import './TrustedCompliance.css';

const TrustedCompliance = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
      console.log('Subscribed with email:', email);
    }
  };

  return (
    <section className="trusted-compliance">
      <div className="container">
        <div className="compliance-content">
          {/* Left Side - Image */}
          <div className="image-section">
            <div className="image-container">
              <img 
                src="/Untitled design (21).png" 
                alt="Compliance Expertise" 
                className="compliance-image"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="content-section">
            <div className="main-content">
              <h2 className="section-title">Stay Ahead with Trusted Compliance Expertise</h2>
              <p className="main-description">
                Welcome to your partner in navigating the complex world of compliance.
                We combine deep industry knowledge, cutting-edge technology, and certified expertise to ensure your organization meets regulatory standards confidently.
                Our commitment is to provide clear, actionable insights and solutions that drive integrity, transparency, and sustainable success.
              </p>
            </div>
            
            <div className="insight-content">
              <p className="insight-description">
                Insightful analytics powered by deep business expertise and cutting-edge AI innovation, transforming complex data into clear, actionable compliance intelligence.
                Our software not only uncovers critical insights but also helps you bridge compliance gaps with targeted recommendations—enabling confident, data-driven decisions for your organization's success.
              </p>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="subscribe-section">
          <div className="subscribe-content">
            <h3 className="subscribe-title">Subscribe to Our Channel</h3>
            <p className="subscribe-description">Get more information and analytical insights</p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="email-input"
                    required
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe
                  </button>
                </div>
              </form>
            ) : (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <p>Thank you for subscribing! You'll receive our latest insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompliance;
