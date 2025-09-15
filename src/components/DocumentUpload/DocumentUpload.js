import React, { useState } from 'react';
import './DocumentUpload.css';

const DocumentUpload = ({ complianceType, onDocumentsUploaded, onPaymentChoice }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const requiredDocuments = [
    {
      id: 'isms-scope',
      name: 'ISMS Scope Document',
      description: 'Document defining the boundaries and applicability of the ISMS',
      required: false
    },
    {
      id: 'security-policy',
      name: 'Information Security Policy',
      description: 'Organization\'s information security policy document',
      required: false
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment and Treatment Report',
      description: 'Comprehensive risk assessment and treatment plan',
      required: false
    },
    {
      id: 'statement-applicability',
      name: 'Statement of Applicability (SoA)',
      description: 'Statement of Applicability for ISO 27001 controls',
      required: false
    },
    {
      id: 'internal-audit',
      name: 'Internal Audit Reports',
      description: 'Recent internal audit reports and findings',
      required: false
    },
    {
      id: 'management-review',
      name: 'Management Review Minutes',
      description: 'Management review meeting minutes and decisions',
      required: false
    }
  ];

  const handleFileUpload = (documentId, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentId]: {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString()
      }
    }));
  };

  const handleRemoveFile = (documentId) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentId];
      return newFiles;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalDocumentsCount = () => {
    return requiredDocuments.length;
  };

  const getUploadedCount = () => {
    return Object.keys(uploadedFiles).length;
  };

  const canProceed = () => {
    return true; // All documents are optional now
  };

  const handleProceedToAssessment = () => {
    onDocumentsUploaded(uploadedFiles);
  };

  const handleSkipUpload = () => {
    onPaymentChoice();
  };

  return (
    <div className="document-upload-container">
      <div className="upload-header">
        <h2>Optional Document Upload for {complianceType}</h2>
        <p>You can optionally upload compliance documents to enhance your assessment. All documents are optional.</p>
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(getUploadedCount() / getTotalDocumentsCount()) * 100}%` 
              }}
            ></div>
          </div>
          <span className="progress-text">
            {getUploadedCount()} of {getTotalDocumentsCount()} documents uploaded (all optional)
          </span>
        </div>
      </div>

      <div className="documents-grid">
        {requiredDocuments.map((document) => (
          <div key={document.id} className={`document-card ${uploadedFiles[document.id] ? 'uploaded' : ''}`}>
            <div className="document-header">
              <h3>{document.name}</h3>
              <span className={`document-status ${document.required ? 'required' : 'optional'}`}>
                {document.required ? 'Required' : 'Optional'}
              </span>
            </div>
            
            <p className="document-description">{document.description}</p>
            
            {uploadedFiles[document.id] ? (
              <div className="uploaded-file">
                <div className="file-info">
                  <span className="file-name">{uploadedFiles[document.id].name}</span>
                  <span className="file-size">{formatFileSize(uploadedFiles[document.id].size)}</span>
                </div>
                <button 
                  className="remove-file-btn"
                  onClick={() => handleRemoveFile(document.id)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="upload-area">
                <input
                  type="file"
                  id={`upload-${document.id}`}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => e.target.files[0] && handleFileUpload(document.id, e.target.files[0])}
                />
                <label htmlFor={`upload-${document.id}`} className="upload-btn">
                  <span className="upload-icon">📁</span>
                  Choose File
                </label>
                <p className="file-types">PDF, DOC, DOCX, TXT (Max 10MB)</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="upload-actions">
        <button 
          className="skip-btn"
          onClick={handleSkipUpload}
        >
          Skip Upload & Start Assessment
        </button>
        
        <button 
          className="proceed-btn enabled"
          onClick={handleProceedToAssessment}
        >
          Start Assessment {getUploadedCount() > 0 ? `with ${getUploadedCount()} documents` : ''}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
