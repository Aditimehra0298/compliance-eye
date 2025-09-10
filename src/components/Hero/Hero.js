import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleRunAudit = () => {
    navigate('/auth');
  };

  useEffect(() => {
    // Typing effect for hero title
    const heroTitleLine1 = document.querySelector('.hero-title-line1');
    const heroTitleLine2 = document.querySelector('.hero-title-line2');
    
    if (heroTitleLine1 && heroTitleLine2) {
      const originalText1 = heroTitleLine1.textContent;
      const originalText2 = heroTitleLine2.textContent;
      
      heroTitleLine1.textContent = '';
      heroTitleLine2.textContent = '';
      
      let i = 0;
      const typeWriterLine1 = () => {
        if (i < originalText1.length) {
          heroTitleLine1.textContent += originalText1.charAt(i);
          i++;
          setTimeout(typeWriterLine1, 50);
        } else {
          // Start typing line 2 after line 1 is complete
          setTimeout(() => {
            let j = 0;
            const typeWriterLine2 = () => {
              if (j < originalText2.length) {
                heroTitleLine2.textContent += originalText2.charAt(j);
                j++;
                setTimeout(typeWriterLine2, 50);
              }
            };
            typeWriterLine2();
          }, 500);
        }
      };
      
      setTimeout(typeWriterLine1, 1000);
    }

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-video">
        <video autoPlay muted loop playsInline>
          <source src="/Your paragraph text (12).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        <div className="hero-bottom-overlay"></div>
      </div>
      
      {/* Navigation content at top of hero */}
      <div className="hero-nav-content">
        <div className="nav-container">
          <ul className={`nav-menu nav-left ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a></li>
            <li><a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>SOLUTIONS</a></li>
            <li><a href="#portfolio" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>INSIGHTS</a></li>
            <li><a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACT</a></li>
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
            <div className="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-line1">Compliance Eye</span>
              <br />
              <span className="hero-title-line2">Capture Real-Time Evidence to Stay Always Audit-Ready</span>
            </h1>
            
            <p className="hero-tagline">
            We offers focused audit report support for many types of demanding compliance requirements coming from EU/USA and other ISO /IEC standard.
            </p>
           
            <p className="hero-description">
            Future-Proof Your Business with Real-Time Compliance.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleRunAudit}>
                Run Audit
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
