import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalizedReports.css';

const PersonalizedReports = ({ assessmentData }) => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Get all expert reports (admin-managed)
  const getAllExpertReports = () => {
    return [
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
        status: "published",
        downloads: 1247,
        lastUpdated: "2024-01-15",
        fileSize: "2.3 MB",
        format: "PDF"
      },
      {
        id: 2,
        title: "AI Act Compliance Framework",
        expert: "Dr. Elena Vasquez",
        expertTitle: "AI Regulation Expert",
        expertImage: "/l7.png",
        price: 249,
        originalPrice: 329,
        rating: 4.8,
        reviews: 89,
        duration: "40-50 min",
        category: "EU Compliance",
        description: "Navigate the new AI Act requirements with expert guidance on high-risk AI systems.",
        features: [
          "AI Act compliance assessment",
          "High-risk AI system evaluation",
          "Transparency requirements guide",
          "Risk management framework",
          "Implementation timeline"
        ],
        tags: ["AI Act", "Artificial Intelligence", "EU Law", "Risk Management"],
        status: "published",
        downloads: 892,
        lastUpdated: "2024-01-10",
        fileSize: "1.8 MB",
        format: "PDF"
      },
      {
        id: 3,
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
        status: "published",
        downloads: 1156,
        lastUpdated: "2024-01-12",
        fileSize: "2.1 MB",
        format: "PDF"
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
        status: "published",
        downloads: 634,
        lastUpdated: "2024-01-08",
        fileSize: "2.7 MB",
        format: "PDF"
      },
      {
        id: 5,
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
        status: "published",
        downloads: 1892,
        lastUpdated: "2024-01-14",
        fileSize: "1.9 MB",
        format: "PDF"
      },
      {
        id: 6,
        title: "ISO 14001 Environmental Management",
        expert: "Dr. James Wilson",
        expertTitle: "Environmental Compliance Specialist",
        expertImage: "/l7.png",
        price: 179,
        originalPrice: 229,
        rating: 4.6,
        reviews: 94,
        duration: "30-40 min",
        category: "ISO Standards",
        description: "Environmental management system implementation with sustainability focus.",
        features: [
          "Environmental policy development",
          "Impact assessment methodology",
          "Legal compliance framework",
          "Sustainability metrics",
          "Certification process"
        ],
        tags: ["ISO 14001", "Environmental", "Sustainability", "Management"],
        status: "published",
        downloads: 743,
        lastUpdated: "2024-01-11",
        fileSize: "1.6 MB",
        format: "PDF"
      }
    ];
  };

  const expertReports = getAllExpertReports().slice(0, 1); // Show only first report

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Payment successful! Download will start for ${selectedReport.title}`);
    setShowPaymentModal(false);
    setSelectedReport(null);
  };

  const handleDownload = (report) => {
    // Simulate download functionality
    alert(`Downloading ${report.title} (${report.fileSize})`);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedReport(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Recommended';
    }
  };

  return (
    <div className="personalized-reports">
      <div className="reports-section">
        <h2>Expert Detailed Reports</h2>
        <p className="section-description">
          Professional compliance reports created by industry experts. Download after purchase.
        </p>

        <div className="reports-grid">
          {expertReports.map((report) => (
            <div key={report.id} className="report-card personalized">
              <div className="card-header">
                <div className="status-badge published">
                  {report.status.toUpperCase()}
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
                
                <div className="report-meta">
                  <div className="meta-item">
                    <span className="meta-label">Downloads:</span>
                    <span className="meta-value">{report.downloads.toLocaleString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Last Updated:</span>
                    <span className="meta-value">{report.lastUpdated}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">File Size:</span>
                    <span className="meta-value">{report.fileSize}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Format:</span>
                    <span className="meta-value">{report.format}</span>
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
              </div>

              <div className="card-footer">
                <div className="footer-actions">
                  <button 
                    className="download-btn"
                    onClick={() => handleDownload(report)}
                    disabled={true}
                  >
                    <i className="fas fa-download"></i> Download (After Purchase)
                  </button>
                  <button 
                    className="select-report-btn personalized"
                    onClick={() => handleSelectReport(report)}
                  >
                    Purchase - ${report.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal - Same as ExpertReports */}
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

export default PersonalizedReports;
