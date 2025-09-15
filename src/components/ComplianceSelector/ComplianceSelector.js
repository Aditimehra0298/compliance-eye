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
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'payment', 'upload'
  const [uploadedDocuments, setUploadedDocuments] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);

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
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
    setSelectedOption('');
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStartAssessment = () => {
    if (selectedCompliance && selectedStandard && selectedOption) {
      if (selectedOption === 'free') {
        // Redirect to quiz assessment
        navigate('/quiz', { 
          state: { 
            compliance: selectedCompliance,
            standard: selectedStandard,
            option: selectedOption
          }
        });
      } else if (selectedOption === 'paid') {
        // Move to payment selection step for paid assessment
        setCurrentStep('payment');
      }
    }
  };

  const handlePaymentSelected = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep('upload');
  };

  const handleDocumentsUploaded = (documents) => {
    setUploadedDocuments(documents);
    // Proceed to quiz with plan and documents
    navigate('/quiz', { 
      state: { 
        compliance: selectedCompliance,
        standard: selectedStandard,
        option: selectedOption,
        plan: selectedPlan,
        documents: uploadedDocuments
      }
    });
  };

  const handleSkipUpload = () => {
    // Proceed to quiz without documents
    navigate('/quiz', { 
      state: { 
        compliance: selectedCompliance,
        standard: selectedStandard,
        option: selectedOption,
        plan: selectedPlan,
        documents: {}
      }
    });
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
    setUploadedDocuments({});
    setSelectedPlan(null);
  };

  const handleBackToPayment = () => {
    setCurrentStep('payment');
  };

  const isFormComplete = selectedCompliance && selectedStandard && selectedOption;

  // Render different steps
  if (currentStep === 'payment') {
    return (
      <div className="compliance-selector">
        <PaymentChoice
          complianceType={`${selectedCompliance} - ${selectedStandard}`}
          onPaymentSelected={handlePaymentSelected}
          onBackToUpload={handleBackToPayment}
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
            onClick={handleBackToPayment}
          >
            ← Back to Payment
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

          {/* Step 3: Choose Free or Paid Option */}
          {selectedStandard && (
            <div className="form-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <label className="step-label">Choose Assessment Type</label>
                <div className="option-cards">
                  <div 
                    className={`option-card ${selectedOption === 'free' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('free')}
                  >
                    <div className="option-icon">🆓</div>
                    <div className="option-content">
                      <h3>Free Assessment</h3>
                      <p>Basic compliance assessment with standard reporting</p>
                      <div className="option-price">Free</div>
                    </div>
                  </div>
                  <div 
                    className={`option-card ${selectedOption === 'paid' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('paid')}
                  >
                    <div className="option-icon">💎</div>
                    <div className="option-content">
                      <h3>Premium Assessment</h3>
                      <p>Comprehensive assessment with detailed analytics and recommendations</p>
                      <div className="option-price">$99/month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Start Assessment Button */}
          {isFormComplete && (
            <div className="form-actions">
              <button 
                className="start-assessment-btn"
                onClick={handleStartAssessment}
              >
                Start Assessment
              </button>
            </div>
          )}

          {/* Selected Options Summary */}
          {isFormComplete && (
            <div className="selection-summary">
              <h4>Your Selection:</h4>
              <div className="summary-item">
                <strong>Framework:</strong> {selectedCompliance}
              </div>
              <div className="summary-item">
                <strong>Standard:</strong> {selectedStandard}
              </div>
              <div className="summary-item">
                <strong>Type:</strong> {selectedOption === 'free' ? 'Free Assessment' : 'Premium Assessment'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceSelector;
