import React, { useState, useEffect } from 'react';
import './ComplianceIndustries.css';

const ComplianceIndustries = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const complianceStandards = [
    'FDA Compliance',
    'RoHS (Restriction of Hazardous Substances)',
    'GDPR (General Data Protection Regulation)',
    'HIPAA (Health Insurance Portability and Accountability Act)',
    'SOC 2 (System and Organization Controls)',
    'CSA STAR (Cloud Security Alliance Security, Trust & Assurance Registry)',
    'NIST (National Institute of Standards and Technology)',
    'BRCGS (Brand Reputation Compliance Global Standards)',
    'EHS Compliance (Environmental, Health, and Safety)'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate compliance standards one by one
            complianceStandards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, `compliance-${index}`]);
              }, index * 500); // 500ms delay between each item for better visibility
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('compliance-industries');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="compliance-industries" id="compliance-industries">
      <div className="container">
        <div className="compliance-content">
          {/* Left Side - Compliance Standards List */}
          <div className="standards-section">
            <h2 className="section-title">Compliance Standards</h2>
            <ul className="standards-list">
              {complianceStandards.map((standard, index) => (
                <li 
                  key={index} 
                  className={`standard-item ${visibleItems.includes(`compliance-${index}`) ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <span className="standard-point"></span>
                  <span className="standard-text">{standard}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Video */}
          <div className="video-section">
            <div className="rhombus-container">
              <video autoPlay muted loop playsInline className="rhombus-video">
                <source src="/Untitled design (7).mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceIndustries;
