import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpertReports.css';

const ExpertReports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const expertReports = [
    {
      id: 1,
      title: "GDPR Compliance Deep Dive",
      expert: "Dr. Sarah Mitchell",
      expertTitle: "Data Protection Specialist",
      expertImage: "/l7.png",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 127,
      duration: "45-60 min",
      category: "EU Compliance",
      description: "Comprehensive analysis of your organization's GDPR compliance status with actionable recommendations.",
      features: [
        "Detailed compliance gap analysis",
        "Risk assessment and mitigation strategies",
        "Custom implementation roadmap",
        "30-day follow-up consultation",
        "Executive summary presentation"
      ],
      tags: ["GDPR", "Data Protection", "Privacy", "EU Law"],
      popularity: "Bestseller",
      badge: "Most Popular"
    },
    {
      id: 2,
      title: "HIPAA Security Assessment",
      expert: "Michael Chen",
      expertTitle: "Healthcare Compliance Expert",
      expertImage: "/l7.png",
      price: 249,
      originalPrice: 329,
      rating: 4.8,
      reviews: 89,
      duration: "40-50 min",
      category: "USA Compliance",
      description: "Expert evaluation of your HIPAA security measures with detailed remediation plan.",
      features: [
        "Security risk evaluation",
        "Administrative safeguards review",
        "Technical safeguards audit",
        "Physical safeguards assessment",
        "Compliance documentation review"
      ],
      tags: ["HIPAA", "Healthcare", "Security", "USA Law"],
      popularity: "Trending",
      badge: "Limited Time"
    },
    {
      id: 3,
      title: "ISO 27001 Implementation Guide",
      expert: "Emma Rodriguez",
      expertTitle: "Information Security Consultant",
      expertImage: "/l7.png",
      price: 199,
      originalPrice: 279,
      rating: 4.7,
      reviews: 156,
      duration: "35-45 min",
      category: "ISO Standards",
      description: "Step-by-step guidance for implementing ISO 27001 information security management system.",
      features: [
        "Implementation roadmap",
        "Policy templates and examples",
        "Risk assessment methodology",
        "Audit preparation checklist",
        "Certification guidance"
      ],
      tags: ["ISO 27001", "Information Security", "Management System", "Certification"],
      popularity: "New",
      badge: "Expert Choice"
    },
    {
      id: 4,
      title: "SOX Compliance Review",
      expert: "David Thompson",
      expertTitle: "Financial Compliance Advisor",
      expertImage: "/l7.png",
      price: 349,
      originalPrice: 449,
      rating: 4.9,
      reviews: 73,
      duration: "50-65 min",
      category: "USA Compliance",
      description: "Comprehensive Sarbanes-Oxley compliance review with financial controls assessment.",
      features: [
        "Internal controls evaluation",
        "Financial reporting review",
        "Audit committee guidance",
        "Documentation requirements",
        "Remediation recommendations"
      ],
      tags: ["SOX", "Financial Compliance", "Internal Controls", "Audit"],
      popularity: "Premium",
      badge: "Top Rated"
    },
    {
      id: 5,
      title: "CCPA/CPRA Privacy Assessment",
      expert: "Lisa Park",
      expertTitle: "Privacy Law Specialist",
      expertImage: "/l7.png",
      price: 179,
      originalPrice: 229,
      rating: 4.6,
      reviews: 94,
      duration: "30-40 min",
      category: "USA Compliance",
      description: "California privacy law compliance assessment with consumer rights implementation guide.",
      features: [
        "Privacy policy review",
        "Consumer rights implementation",
        "Data mapping and inventory",
        "Third-party vendor assessment",
        "Compliance monitoring setup"
      ],
      tags: ["CCPA", "CPRA", "Privacy", "California Law"],
      popularity: "Popular",
      badge: "Best Value"
    },
    {
      id: 6,
      title: "IEC 62443 Cybersecurity Framework",
      expert: "James Wilson",
      expertTitle: "Industrial Cybersecurity Expert",
      expertImage: "/l7.png",
      price: 279,
      originalPrice: 359,
      rating: 4.8,
      reviews: 67,
      duration: "55-70 min",
      category: "IEC Standards",
      description: "Industrial automation cybersecurity framework implementation with OT security focus.",
      features: [
        "OT security assessment",
        "Network segmentation guidance",
        "Incident response planning",
        "Vendor security evaluation",
        "Compliance monitoring"
      ],
      tags: ["IEC 62443", "Cybersecurity", "Industrial", "OT Security"],
      popularity: "Specialized",
      badge: "Expert Pick"
    }
  ];

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // Simulate payment process
    alert(`Payment processing for ${selectedReport.title} - $${selectedReport.price}`);
    setShowPaymentModal(false);
    setSelectedReport(null);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="expert-reports">
      <div className="reports-header">
        <h1>Individual Expert Reports</h1>
        <p>Get personalized compliance assessments from industry experts</p>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Expert Reports</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.8</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>

      <div className="reports-grid">
        {expertReports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="card-header">
              <div className="badge-container">
                <span className={`badge ${report.badge.toLowerCase().replace(' ', '-')}`}>
                  {report.badge}
                </span>
                <span className={`popularity ${report.popularity.toLowerCase()}`}>
                  {report.popularity}
                </span>
              </div>
              <div className="price-section">
                <span className="current-price">${report.price}</span>
                <span className="original-price">${report.originalPrice}</span>
                <span className="discount">
                  {Math.round(((report.originalPrice - report.price) / report.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            <div className="card-content">
              <h3 className="report-title">{report.title}</h3>
              <p className="report-description">{report.description}</p>
              
              <div className="expert-info">
                <img src={report.expertImage} alt={report.expert} className="expert-image" />
                <div className="expert-details">
                  <h4 className="expert-name">{report.expert}</h4>
                  <p className="expert-title">{report.expertTitle}</p>
                  <div className="expert-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{report.rating}</span>
                    <span className="reviews">({report.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="report-meta">
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <span className="meta-text">{report.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📋</span>
                  <span className="meta-text">{report.category}</span>
                </div>
              </div>

              <div className="features-preview">
                <h4>What's Included:</h4>
                <ul>
                  {report.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  <li className="more-features">+{report.features.length - 3} more features</li>
                </ul>
              </div>

              <div className="tags">
                {report.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="card-footer">
              <button 
                className="select-report-btn"
                onClick={() => handleSelectReport(report)}
              >
                Get This Report - ${report.price}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedReport && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h2>Complete Your Purchase</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="report-summary">
                <h3>{selectedReport.title}</h3>
                <p>by {selectedReport.expert}</p>
                <div className="summary-features">
                  <h4>What you'll get:</h4>
                  <ul>
                    {selectedReport.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="pricing-summary">
                <div className="price-breakdown">
                  <div className="price-line">
                    <span>Report Price</span>
                    <span>${selectedReport.originalPrice}</span>
                  </div>
                  <div className="price-line discount">
                    <span>Discount</span>
                    <span>-${selectedReport.originalPrice - selectedReport.price}</span>
                  </div>
                  <div className="price-line total">
                    <span>Total</span>
                    <span>${selectedReport.price}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="pay-btn" onClick={handlePayment}>
                Pay ${selectedReport.price} - Get Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertReports;
