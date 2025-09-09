import React from 'react';
import './OurClients.css';

const OurClients = () => {
  return (
    <section className="our-clients" id="our-clients">
      <div className="container">
        <div className="clients-content">
          <div className="clients-header">
            <h2 className="section-title">Our Clients</h2>
            <p className="section-tagline">Your Success, Our Commitment, One Journey Together</p>
          </div>
          
          <div className="clients-logo-container">
            <div className="clients-logo-track">
              {/* Logo placeholders - you can add actual logos later */}
              <div className="logo-item">
                <div className="logo-placeholder">Logo 1</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 2</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 3</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 4</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 5</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 6</div>
              </div>
              {/* Duplicate logos for seamless loop */}
              <div className="logo-item">
                <div className="logo-placeholder">Logo 1</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 2</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 3</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 4</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 5</div>
              </div>
              <div className="logo-item">
                <div className="logo-placeholder">Logo 6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
