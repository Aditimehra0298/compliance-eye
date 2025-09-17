import React from 'react';
import './WhoWeAre.css';

const WhoWeAre = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="who-we-are" id="who-we-are">
      <div className="container">
        <div className="who-we-are-content">
          {/* Left Column - Video */}
          <div className="video-container">
            <video autoPlay muted loop playsInline className="section-video">
              <source src="/Untitled design (6).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
          </div>

          {/* Right Column - Text Content */}
          <div className="who-we-are-text">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-description">
              DamnArt offers focused audit report support and CE certification training aligned with ISO standards. Our practical training equips professionals to handle audit processes, documentation, and regulatory requirements effectively. We provide expert guidance to help organizations achieve and maintain certification compliance with confidence and efficiency.
            </p>
            <button className="btn btn-outline" onClick={() => scrollToSection('about')}>
              Meet Our Experts
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
