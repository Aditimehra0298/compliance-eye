import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-links">
            <li><a href="#">GET SUPPORT</a></li>
            <li><a href="#">FIND A DESIGNER</a></li>
            <li><a href="#">YOUR ACCOUNT</a></li>
            <li><a href="#">BECOME AN AFFILIATE</a></li>
            <li><a href="#">PRIVACY & COOKIE POLICY</a></li>
          </ul>
        </div>
        
        <div className="footer-center">
          <div className="footer-logo">
            <div className="logo-square">
              <div className="logo-text">
                <span className="ds">DS</span>
                <span className="co">Co</span>
              </div>
            </div>
          </div>
          <p className="footer-description">
            Divi Child Themes, ProPhoto 7 Designs, Showit Designs and online courses for photographers and small, creative businesses.
          </p>
        </div>
        
        <div className="footer-right">
          <ul className="footer-links">
            <li><a href="#">ALL PRODUCTS</a></li>
            <li><a href="#">DIVI CHILD THEMES</a></li>
            <li><a href="#">PROPHOTO 7 DESIGNS</a></li>
            <li><a href="#">SHOWIT DESIGNS</a></li>
            <li><a href="#">STATIONERY</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-social">
        <a href="#" className="social-icon">f</a>
        <a href="#" className="social-icon">t</a>
        <a href="#" className="social-icon">p</a>
        <a href="#" className="social-icon">y</a>
        <a href="#" className="social-icon">i</a>
        <a href="#" className="social-icon">r</a>
      </div>
    </footer>
  );
};

export default Footer;
