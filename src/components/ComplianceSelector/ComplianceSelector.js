import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentUpload from '../DocumentUpload/DocumentUpload';
import PaymentChoice from '../PaymentChoice/PaymentChoice';
import './ComplianceSelector.css';

const ComplianceSelector = () => {
  const navigate = useNavigate();
  const [selectedCompliance, setSelectedCompliance] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'upload', 'payment'
  const [uploadedDocuments, setUploadedDocuments] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAllStandards, setShowAllStandards] = useState(false);
  const [showAddStandard, setShowAddStandard] = useState(false);
  const [newStandard, setNewStandard] = useState({ name: '', description: '', version: '' });

  const complianceStandards = {
    'EU Compliance': [
      'GDPR (General Data Protection Regulation) (EU 2016/679)',
      'Corporate Sustainability Due Diligence Directive (CSRD)',
      'EU Deforestation Regulation (EUDR) (EU 2023/1115)',
      'Batteries Regulation (EU 2023/1542)',
      'Product Safety Regulation (EU 2023/988)',
      'AI Act (EU 2024/573)',
      'Digital Services Act (DSA) (EU 2022/2065)',
      'Digital Markets Act (DMA) (EU 2022/1925)',
      'Fluorinated Gases Regulation',
      'Union Customs Code (UCC)',
      'Whistleblower Protection Directive (EU 2019/1937)',
      'Anti-Money Laundering Directives',
      'Transparent Working Conditions Directive (EU 2019/1152)',
      'REACH Regulation (Registration, Evaluation, Authorisation and Restriction of Chemicals)'
    ],
    'USA Compliance': [
      'HIPAA (Health Insurance Portability and Accountability Act)',
      'SOX (Sarbanes-Oxley Act)',
      'CCPA (California Consumer Privacy Act) / CPRA (California Privacy Rights Act)',
      'FISMA (Federal Information Security Management Act)',
      'PCI DSS (Payment Card Industry Data Security Standard)',
      'OSHA Regulations (Occupational Safety and Health Administration)',
      'Various State Data Privacy and Employment Laws'
    ],
    'ISO Standards': [
      'ISO 9001 (Quality Management Systems)',
      'ISO/IEC 27001 (Information Security Management Systems)',
      'ISO 14001 (Environmental Management Systems)',
      'ISO 45001 (Occupational Health and Safety)',
      'ISO 20000 (IT Service Management)',
      'ISO 50001 (Energy Management)',
      'ISO 22000 (Food Safety Management)',
      'ISO 31000 (Risk Management)',
      'ISO 22301 (Business Continuity Management)'
    ],
    'IEC Standards': [
      'IEC 60364 (Electrical Installations)',
      'IEC 61508 (Functional Safety of Electrical/Electronic Systems)',
      'IEC 62443 (Industrial Automation and Control Systems Cybersecurity)',
      'IEC 60601-1-2 (Electromagnetic Compatibility of Medical Electrical Equipment)',
      'IEC 61000 Series (Electromagnetic Compatibility - EMC)',
      'IEC 61511 (Safety Instrumented Systems for Process Industries)',
      'IEC 62061 (Safety of Machinery - Functional Safety)',
      'IEC 62304 (Medical Device Software Lifecycle Processes)',
      'IEC 60204 (Electrical Equipment of Machines)'
    ]
  };

  const handleComplianceChange = (e) => {
    setSelectedCompliance(e.target.value);
    setSelectedStandard('');
    setSelectedOption('');
    setShowAllStandards(false);
    setShowAddStandard(false);
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
    setSelectedOption('');
  };

  const handleViewAllStandards = () => {
    setShowAllStandards(true);
    setShowAddStandard(false);
  };

  const handleAddNewStandard = () => {
    setShowAddStandard(true);
    setShowAllStandards(false);
  };

  const handleNewStandardChange = (field, value) => {
    setNewStandard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveNewStandard = () => {
    if (newStandard.name && newStandard.description && newStandard.version) {
      // Here you would typically save to backend
      // For now, we'll just show a success message
      alert(`New standard "${newStandard.name}" added successfully!`);
      setNewStandard({ name: '', description: '', version: '' });
      setShowAddStandard(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancelAddStandard = () => {
    setNewStandard({ name: '', description: '', version: '' });
    setShowAddStandard(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStartAssessment = () => {
    if (selectedCompliance && selectedStandard) {
      // Move to document upload step first
      setCurrentStep('upload');
    }
  };

  const handleDocumentsUploaded = (documents) => {
    setUploadedDocuments(documents);
    setCurrentStep('payment');
  };

  const handleSkipUpload = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSelected = (plan) => {
    setSelectedPlan(plan);
    
    if (plan.id === 'basic') {
      // Basic plan is free, proceed directly to quiz
      navigate('/quiz', { 
        state: { 
          compliance: selectedCompliance,
          standard: selectedStandard,
          option: 'free',
          plan: plan,
          documents: uploadedDocuments
        }
      });
    } else if (plan.id === 'advanced') {
      // Advanced plan requires payment - for now, proceed to quiz
      // TODO: Add payment gateway integration later
      navigate('/quiz', { 
        state: { 
          compliance: selectedCompliance,
          standard: selectedStandard,
          option: 'paid',
          plan: plan,
          documents: uploadedDocuments
        }
      });
    }
  };

  const handleFreeAssessment = () => {
    // Proceed to quiz without payment
    navigate('/quiz', { 
      state: { 
        compliance: selectedCompliance,
        standard: selectedStandard,
        option: 'free',
        plan: null,
        documents: uploadedDocuments
      }
    });
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setUploadedDocuments({});
    setSelectedPlan(null);
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
  };

  const isFormComplete = selectedCompliance && selectedStandard && selectedOption;

  // Render different steps
  if (currentStep === 'upload') {
    return (
      <div className="compliance-selector">
        <DocumentUpload
          complianceType={`${selectedCompliance} - ${selectedStandard}`}
          onDocumentsUploaded={handleDocumentsUploaded}
          onPaymentChoice={handleSkipUpload}
        />
        <div className="step-actions">
          <button 
            className="back-button"
            onClick={handleBackToSelection}
          >
            ← Back to Selection
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className="compliance-selector">
        <PaymentChoice
          complianceType={`${selectedCompliance} - ${selectedStandard}`}
          onPaymentSelected={handlePaymentSelected}
          onBackToUpload={handleBackToUpload}
        />
        <div className="step-actions">
          <button 
            className="back-button"
            onClick={handleBackToUpload}
          >
            ← Back to Document Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compliance-selector">
      <div className="selector-container">
        <div className="selector-header">
          <h2>Choose Your Compliance Standard</h2>
          <p>Select a compliance framework and specific standard to begin your assessment</p>
        </div>

        <div className="selector-form">
          {/* Step 1: Choose Compliance Category */}
          <div className="form-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <label className="step-label">Choose Compliance Framework</label>
              <div className="compliance-selection">
                <select 
                  value={selectedCompliance} 
                  onChange={handleComplianceChange}
                  className="compliance-dropdown"
                >
                  <option value="">Select Compliance Framework</option>
                  <option value="EU Compliance">EU Compliance</option>
                  <option value="USA Compliance">USA Compliance</option>
                  <option value="ISO Standards">ISO Standards</option>
                  <option value="IEC Standards">IEC Standards</option>
                </select>
                {selectedCompliance && (
                  <div className="framework-actions">
                    <button 
                      type="button"
                      className="view-all-btn"
                      onClick={handleViewAllStandards}
                    >
                      View All Standards
                    </button>
                    <button 
                      type="button"
                      className="edit-btn"
                      onClick={handleAddNewStandard}
                    >
                      Add New Standard
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Choose Specific Standard */}
          {selectedCompliance && (
            <div className="form-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <label className="step-label">Choose Specific Standard</label>
                <select 
                  value={selectedStandard} 
                  onChange={handleStandardChange}
                  className="standard-dropdown"
                >
                  <option value="">Select {selectedCompliance} Standard</option>
                  {complianceStandards[selectedCompliance]?.map((standard, index) => (
                    <option key={index} value={standard}>{standard}</option>
                  ))}
                </select>
              </div>
            </div>
          )}


          {/* All Standards View */}
          {showAllStandards && selectedCompliance && (
            <div className="all-standards-section">
              <div className="standards-header">
                <h3>All {selectedCompliance} Standards</h3>
                <button 
                  className="close-standards-btn"
                  onClick={() => setShowAllStandards(false)}
                >
                  ×
                </button>
              </div>
              <div className="standards-grid">
                {complianceStandards[selectedCompliance]?.map((standard, index) => (
                  <div key={index} className="standard-card">
                    <h4>{standard}</h4>
                    <p className="standard-description">
                      {standard.includes('ISO') ? 'International standard for quality and security management' :
                       standard.includes('GDPR') ? 'European data protection regulation' :
                       standard.includes('HIPAA') ? 'US healthcare data protection law' :
                       standard.includes('IEC') ? 'International electrotechnical standard' :
                       'Compliance standard for regulatory requirements'}
                    </p>
                    <div className="standard-actions">
                      <button 
                        className="select-standard-btn"
                        onClick={() => {
                          setSelectedStandard(standard);
                          setShowAllStandards(false);
                        }}
                      >
                        Select This Standard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Standard Form */}
          {showAddStandard && selectedCompliance && (
            <div className="add-standard-section">
              <div className="add-standard-header">
                <h3>Add New {selectedCompliance} Standard</h3>
                <button 
                  className="close-add-btn"
                  onClick={handleCancelAddStandard}
                >
                  ×
                </button>
              </div>
              <div className="add-standard-form">
                <div className="form-group">
                  <label>Standard Name</label>
                  <input
                    type="text"
                    value={newStandard.name}
                    onChange={(e) => handleNewStandardChange('name', e.target.value)}
                    placeholder="e.g., ISO 27001, GDPR, HIPAA"
                    className="standard-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newStandard.description}
                    onChange={(e) => handleNewStandardChange('description', e.target.value)}
                    placeholder="Brief description of the standard"
                    className="standard-textarea"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Version</label>
                  <input
                    type="text"
                    value={newStandard.version}
                    onChange={(e) => handleNewStandardChange('version', e.target.value)}
                    placeholder="e.g., 2022, 2018, v1.0"
                    className="standard-input"
                  />
                </div>
                <div className="form-actions">
                  <button 
                    className="cancel-btn"
                    onClick={handleCancelAddStandard}
                  >
                    Cancel
                  </button>
                  <button 
                    className="save-btn"
                    onClick={handleSaveNewStandard}
                  >
                    Save Standard
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Start Assessment Button */}
          {selectedCompliance && selectedStandard && !showAllStandards && !showAddStandard && (
            <div className="form-actions">
              <button 
                className="start-assessment-btn"
                onClick={handleStartAssessment}
              >
                Continue to Document Upload
              </button>
            </div>
          )}

          {/* Selected Options Summary */}
          {selectedCompliance && selectedStandard && (
            <div className="selection-summary">
              <h4>Your Selection:</h4>
              <div className="summary-item">
                <strong>Framework:</strong> {selectedCompliance}
              </div>
              <div className="summary-item">
                <strong>Standard:</strong> {selectedStandard}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceSelector;
