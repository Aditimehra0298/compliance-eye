import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Us</span>
          <h2>We're Passionate About Creating Amazing Digital Experiences</h2>
          <p>Our team of experts combines creativity with cutting-edge technology to deliver solutions that drive real results.</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <div className="about-feature">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="feature-content">
                <h3>Creative Design</h3>
                <p>We believe in the power of beautiful, user-centered design that captivates and converts.</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="feature-content">
                <h3>Technical Excellence</h3>
                <p>Built with modern technologies and best practices for optimal performance and scalability.</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="feature-content">
                <h3>Results Driven</h3>
                <p>Every project is designed to deliver measurable results and drive business growth.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
