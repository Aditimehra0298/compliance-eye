import React, { useState } from 'react';
import './PaymentChoice.css';

const PaymentChoice = ({ complianceType, onPaymentSelected, onBackToUpload }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const paymentPlans = [
    {
      id: 'basic',
      name: 'Basic Assessment',
      price: '$299',
      description: 'Essential compliance assessment with basic reporting',
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
      id: 'professional',
      name: 'Professional Assessment',
      price: '$599',
      description: 'Comprehensive assessment with detailed reporting and recommendations',
      features: [
        'ISO 27001 Assessment Quiz',
        'Detailed Compliance Report',
        'Comprehensive Gap Analysis',
        'Implementation Roadmap',
        'Priority Support',
        '90-day Access',
        'Document Review (3 documents)'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Assessment',
      price: '$999',
      description: 'Full-scale assessment with ongoing support and consultation',
      features: [
        'ISO 27001 Assessment Quiz',
        'Executive Summary Report',
        'Detailed Gap Analysis',
        'Custom Implementation Plan',
        'Dedicated Support',
        '180-day Access',
        'Full Document Review',
        '1-on-1 Consultation Call',
        'Follow-up Assessment'
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleProceedToPayment = () => {
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
          Back to Document Upload
        </button>
        
        <button 
          className={`proceed-btn ${selectedPlan ? 'enabled' : 'disabled'}`}
          onClick={handleProceedToPayment}
          disabled={!selectedPlan}
        >
          {selectedPlan ? 'Proceed to Payment' : 'Select a Plan to Continue'}
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
