import React, { useState } from 'react';
import './ComplianceExpertise.css';

const ComplianceExpertise = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Debug logging
  console.log('ComplianceExpertise component is rendering');

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
    <section className="compliance-expertise" id="compliance-expertise">
      <div className="container">
        <div className="expertise-content">
          {/* Header Section */}
          <div className="expertise-header">
            <h2 className="section-title">Stay Ahead with Trusted Compliance Expertise</h2>
            <p className="section-description">
              Welcome to your partner in navigating the complex world of compliance.
              We combine deep industry knowledge, cutting-edge technology, and certified expertise to ensure your organization meets regulatory standards confidently.
              Our commitment is to provide clear, actionable insights and solutions that drive integrity, transparency, and sustainable success.
            </p>
          </div>

          {/* Main Content Section */}
          <div className="expertise-main">
            {/* Left Side - Image */}
            <div className="expertise-image-section">
              <div className="image-container">
                <img 
                  src="/Untitled design (21).png" 
                  alt="Compliance Analytics" 
                  className="expertise-image"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="expertise-text-section">
              <div className="text-content">
                <h3 className="content-title">Insightful Analytics</h3>
                <p className="content-description">
                  Insightful analytics powered by deep business expertise and cutting-edge AI innovation, transforming complex data into clear, actionable compliance intelligence.
                </p>
                <p className="content-description">
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
                  <p>Thank you for subscribing! You'll receive our latest insights soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceExpertise;
