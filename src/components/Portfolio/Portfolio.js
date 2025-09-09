import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const portfolioItems = [
    {
      title: 'E-commerce Platform',
      description: 'Modern online store with advanced features',
    },
    {
      title: 'Corporate Website',
      description: 'Professional business website',
    },
    {
      title: 'Mobile Application',
      description: 'Cross-platform mobile app',
    },
    {
      title: 'Landing Page',
      description: 'High-converting marketing page',
    },
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Work</span>
          <h2>Recent Projects That Speak for Themselves</h2>
          <p>Take a look at some of our recent work and see the quality we deliver.</p>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item">
              <div className="portfolio-image">
                <div className="image-placeholder">
                  <i className="fas fa-image"></i>
                </div>
                <div className="portfolio-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <button className="btn btn-outline">View Project</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
