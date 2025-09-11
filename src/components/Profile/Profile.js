import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    jobTitle: '',
    department: '',
    contactEmail: '',
    phone: '',
    employeeId: '',
    
    // Organization Details
    companyName: '',
    companyAddress: '',
    companyType: '',
    industry: '',
    registrationNumber: '',
    
    // Audit and Compliance Attributes
    auditManager: '',
    areasOfResponsibility: '',
    certifications: '',
    lastAuditDate: '',
    nextAuditDate: '',
    
    // System Details
    accessLevel: '',
    rolePermissions: '',
    
    // Custom Fields
    auditObjectives: '',
    methodology: '',
    complianceFindings: '',
    auditStatus: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
      // Redirect to login if no user data
      navigate('/auth');
      return;
    }
    setUser(userData);
    setFormData(prev => ({
      ...prev,
      fullName: userData.name || '',
      contactEmail: userData.email || ''
    }));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      {/* Navigation content at top */}
      <div className="hero-nav-content">
        <div className="nav-container">
          <ul className="nav-menu nav-left">
            <li><a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>← Back to Dashboard</a></li>
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
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="profile-page-header">
        <h1>Essential Profile Details for Compliance Auditing</h1>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Photo Upload Section */}
          <div className="profile-photo-section">
            <div className="photo-upload">
              <div className="photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" />
                ) : (
                  <div className="photo-placeholder">
                    <span>📷</span>
                    <p>Upload Photo</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="photo-upload" className="upload-btn">
                Choose Photo
              </label>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Title/Role *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Compliance Officer, Auditor"
                  required
                />
              </div>
              <div className="form-group">
                <label>Department or Division *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Employee/ID Number *</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="For access control"
                  required
                />
              </div>
            </div>
          </div>

          {/* Organization Details Section */}
          <div className="form-section">
            <h3>Organization Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Registered Address *</label>
                <textarea
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Type of Company *</label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="private-limited">Private Limited</option>
                  <option value="public">Public Company</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">Limited Liability Partnership</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Industry *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Registration/CIN/GST Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="If applicable"
                />
              </div>
            </div>
          </div>

          {/* Audit and Compliance Attributes Section */}
          <div className="form-section">
            <h3>Audit and Compliance Attributes</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Assigned Audit Manager</label>
                <input
                  type="text"
                  name="auditManager"
                  value={formData.auditManager}
                  onChange={handleInputChange}
                  placeholder="Responsible person"
                />
              </div>
              <div className="form-group full-width">
                <label>Areas of Responsibility</label>
                <textarea
                  name="areasOfResponsibility"
                  value={formData.areasOfResponsibility}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Compliance domains, audit scopes"
                />
              </div>
              <div className="form-group full-width">
                <label>Certifications Held</label>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="ISO standards, GDPR, HIPAA, etc."
                />
              </div>
              <div className="form-group">
                <label>Last Audit Date</label>
                <input
                  type="date"
                  name="lastAuditDate"
                  value={formData.lastAuditDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Next Audit Schedule</label>
                <input
                  type="date"
                  name="nextAuditDate"
                  value={formData.nextAuditDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* System Details Section */}
          <div className="form-section">
            <h3>System Details (for audit trail)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Access Level</label>
                <select
                  name="accessLevel"
                  value={formData.accessLevel}
                  onChange={handleInputChange}
                >
                  <option value="">Select Access Level</option>
                  <option value="admin">Administrator</option>
                  <option value="auditor">Auditor</option>
                  <option value="compliance-officer">Compliance Officer</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Role Permissions</label>
                <textarea
                  name="rolePermissions"
                  value={formData.rolePermissions}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Digital signatures, verification tokens, etc."
                />
              </div>
            </div>
          </div>

          {/* Custom Fields Section */}
          <div className="form-section">
            <h3>Custom Fields for Company Auditing</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Audit Objectives and Scope</label>
                <textarea
                  name="auditObjectives"
                  value={formData.auditObjectives}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Linked to profile"
                />
              </div>
              <div className="form-group">
                <label>Methodology Used</label>
                <select
                  name="methodology"
                  value={formData.methodology}
                  onChange={handleInputChange}
                >
                  <option value="">Select Methodology</option>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Compliance Findings and Recommendations</label>
                <textarea
                  name="complianceFindings"
                  value={formData.complianceFindings}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Assigned to the user"
                />
              </div>
              <div className="form-group">
                <label>Audit Status</label>
                <select
                  name="auditStatus"
                  value={formData.auditStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBackToDashboard}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
