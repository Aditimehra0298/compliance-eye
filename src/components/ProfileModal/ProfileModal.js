import React, { useState, useEffect } from 'react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
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

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        contactEmail: user.email || ''
      }));
    }
  }, [user]);

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <div className="profile-modal-header">
          <h2>Essential Profile Details for Compliance Auditing</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
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
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Profile
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="profile-modal-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Compliance Eye</h4>
              <p>Professional compliance auditing platform</p>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <p>support@complianceeye.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="footer-section">
              <h4>Security</h4>
              <p>All data encrypted and secure</p>
              <p>GDPR compliant</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Compliance Eye. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
