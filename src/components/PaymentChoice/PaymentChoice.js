import React, { useState } from 'react';
import './PaymentChoice.css';

const PaymentChoice = ({ complianceType, onPaymentSelected, onBackToUpload }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const paymentPlans = [
    {
      id: 'free',
      name: 'Free Assessment',
      price: 'Free',
      description: 'Basic compliance assessment with standard reporting',
      features: [
        'ISO 27001 Assessment Quiz',
        'Basic Compliance Report',
        'Gap Analysis Summary',
        'Email Support',
        '30-day Access'
      ],
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic Assessment',
      price: '$99',
      description: 'Essential compliance assessment with basic reporting',
      features: [
        'ISO 27001 Assessment Quiz',
        'Basic Compliance Report',
        'Gap Analysis Summary',
        'Email Support',
        '30-day Access',
        'Document Review (up to 3 documents)'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Assessment',
      price: '$299',
      description: 'Comprehensive assessment with detailed reporting and recommendations',
      features: [
        'ISO 27001 Assessment Quiz',
        'Detailed Compliance Report',
        'Comprehensive Gap Analysis',
        'Implementation Roadmap',
        'Priority Support',
        '90-day Access',
        'Document Review (up to 6 documents)',
        '1-on-1 Consultation Call'
      ],
      popular: true
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleProceedToAssessment = () => {
    if (selectedPlan) {
      const plan = paymentPlans.find(p => p.id === selectedPlan);
      onPaymentSelected(plan);
    }
  };

  return (
    <div className="payment-choice-container">
      <div className="payment-header">
        <h2>Choose Your Assessment Plan</h2>
        <p>Select the assessment plan that best fits your organization's needs for {complianceType}.</p>
      </div>

      <div className="plans-grid">
        {paymentPlans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <div className="popular-badge">Most Popular</div>
            )}
            
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">one-time</span>
              </div>
            </div>
            
            <p className="plan-description">{plan.description}</p>
            
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="plan-selector">
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => handlePlanSelect(plan.id)}
                className="plan-radio"
              />
              <span className="select-text">
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="payment-actions">
        <button 
          className="back-btn"
          onClick={onBackToUpload}
        >
          Back to Selection
        </button>
        
        <button 
          className={`proceed-btn ${selectedPlan ? 'enabled' : 'disabled'}`}
          onClick={handleProceedToAssessment}
          disabled={!selectedPlan}
        >
          {selectedPlan ? 'Start Assessment' : 'Select a Plan to Continue'}
        </button>
      </div>

      <div className="payment-security">
        <div className="security-badges">
          <span className="security-badge">🔒 Secure Payment</span>
          <span className="security-badge">💳 Multiple Payment Methods</span>
          <span className="security-badge">🛡️ Money-back Guarantee</span>
        </div>
        <p className="security-text">
          Your payment information is encrypted and secure. We offer a 30-day money-back guarantee.
        </p>
      </div>
    </div>
  );
};

export default PaymentChoice;
