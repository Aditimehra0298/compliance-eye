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
      required: true
    },
    {
      id: 'security-policy',
      name: 'Information Security Policy',
      description: 'Organization\'s information security policy document',
      required: true
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment and Treatment Report',
      description: 'Comprehensive risk assessment and treatment plan',
      required: true
    },
    {
      id: 'statement-applicability',
      name: 'Statement of Applicability (SoA)',
      description: 'Statement of Applicability for ISO 27001 controls',
      required: true
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

  const getRequiredDocumentsCount = () => {
    return requiredDocuments.filter(doc => doc.required).length;
  };

  const getUploadedRequiredCount = () => {
    return requiredDocuments.filter(doc => 
      doc.required && uploadedFiles[doc.id]
    ).length;
  };

  const canProceed = () => {
    return getUploadedRequiredCount() === getRequiredDocumentsCount();
  };

  const handleProceedToPayment = () => {
    onDocumentsUploaded(uploadedFiles);
    onPaymentChoice();
  };

  const handleSkipUpload = () => {
    onPaymentChoice();
  };

  return (
    <div className="document-upload-container">
      <div className="upload-header">
        <h2>Document Upload for {complianceType}</h2>
        <p>Please upload the required compliance documents to proceed with your assessment.</p>
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(getUploadedRequiredCount() / getRequiredDocumentsCount()) * 100}%` 
              }}
            ></div>
          </div>
          <span className="progress-text">
            {getUploadedRequiredCount()} of {getRequiredDocumentsCount()} required documents uploaded
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
          Skip Upload (Optional)
        </button>
        
        <button 
          className={`proceed-btn ${canProceed() ? 'enabled' : 'disabled'}`}
          onClick={handleProceedToPayment}
          disabled={!canProceed()}
        >
          {canProceed() ? 'Proceed to Payment' : `Upload ${getRequiredDocumentsCount() - getUploadedRequiredCount()} more required documents`}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
