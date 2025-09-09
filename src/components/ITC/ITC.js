import React, { useState, useEffect } from 'react';
import './ITC.css';

const ITC = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Set all cards as visible by default
    const allCards = [0, 1, 2, 3, 4, 5];
    setVisibleCards(allCards);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards(prev => [...prev, cardIndex]);
            }, cardIndex * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.itc-card');
    cards.forEach((card, index) => {
      card.dataset.index = index;
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);
  return (
    <section className="itc-section">
      <div className="container">
        <div className="itc-content">
          <div className="itc-header">
            <h2 className="section-title">ITC Limited</h2>
            <p className="section-subtitle">A Leading Indian Multinational Conglomerate</p>
          </div>
          
          <div className="itc-grid">
            <div className={`itc-card ${visibleCards.includes(0) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">🏢</span>
              </div>
              <h3 className="card-title">Diversified Business Portfolio</h3>
              <p className="card-description">
                ITC operates across multiple sectors including FMCG, Hotels, Paperboards & Packaging, Agri Business, and Information Technology.
              </p>
            </div>

            <div className={`itc-card ${visibleCards.includes(1) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">🌱</span>
              </div>
              <h3 className="card-title">Sustainability Leadership</h3>
              <p className="card-description">
                ITC is carbon positive, water positive, and solid waste recycling positive for over a decade, setting industry benchmarks in sustainability.
              </p>
            </div>

            <div className={`itc-card ${visibleCards.includes(2) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">🏆</span>
              </div>
              <h3 className="card-title">Market Leadership</h3>
              <p className="card-description">
                Leading market position in cigarettes, hotels, paperboards, packaging, and agri-exports with strong brand portfolio.
              </p>
            </div>

            <div className={`itc-card ${visibleCards.includes(3) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">🌍</span>
              </div>
              <h3 className="card-title">Global Presence</h3>
              <p className="card-description">
                Operations across 60+ countries with exports to 90+ countries, making it one of India's largest foreign exchange earners.
              </p>
            </div>

            <div className={`itc-card ${visibleCards.includes(4) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">💼</span>
              </div>
              <h3 className="card-title">Innovation & R&D</h3>
              <p className="card-description">
                Strong focus on innovation with dedicated R&D centers and technology partnerships driving product development and process excellence.
              </p>
            </div>

            <div className={`itc-card ${visibleCards.includes(5) ? 'visible' : ''}`}>
              <div className="card-icon">
                <span className="icon-symbol">🤝</span>
              </div>
              <h3 className="card-title">Social Impact</h3>
              <p className="card-description">
                Extensive CSR initiatives including rural development, education, healthcare, and women empowerment programs across India.
              </p>
            </div>
          </div>

          <div className="itc-stats">
            <div className="stat-item">
              <div className="stat-number">₹70,000+ Cr</div>
              <div className="stat-label">Annual Revenue</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">60+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Years Legacy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Employees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ITC;
