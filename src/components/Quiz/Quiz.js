import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Get compliance data from navigation state
  const complianceData = location.state || {};

  const questions = [
    {
      id: 1,
      question: "Does your organization have a documented data protection policy?",
      options: ["Yes, fully documented", "Partially documented", "No documentation", "Not applicable"]
    },
    {
      id: 2,
      question: "Have you conducted a data protection impact assessment (DPIA)?",
      options: ["Yes, completed", "In progress", "Not started", "Not required"]
    },
    {
      id: 3,
      question: "Do you have a designated Data Protection Officer (DPO)?",
      options: ["Yes, appointed", "Planning to appoint", "Not required", "Not applicable"]
    },
    {
      id: 4,
      question: "Are your data processing activities recorded in a register?",
      options: ["Yes, comprehensive", "Partially recorded", "No register", "Not applicable"]
    },
    {
      id: 5,
      question: "Do you have procedures for handling data subject requests?",
      options: ["Yes, fully implemented", "Partially implemented", "No procedures", "Not applicable"]
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleBackToDashboard = () => {
    // Pass assessment data to dashboard
    const assessmentData = {
      compliance: complianceData.compliance,
      standard: complianceData.standard,
      option: complianceData.option,
      score: calculateScore(),
      answers: answers,
      recommendations: generateRecommendations()
    };
    
    navigate('/dashboard', { 
      state: { 
        showPersonalizedReports: true,
        assessmentData: assessmentData
      }
    });
  };

  const calculateScore = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const score = (answeredQuestions / totalQuestions) * 100;
    return Math.round(score);
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const score = calculateScore();
    
    // Based on compliance type and score, recommend specific reports
    if (complianceData.compliance === 'EU Compliance') {
      if (score < 60) {
        recommendations.push('GDPR Compliance Deep Dive');
        recommendations.push('Data Protection Impact Assessment');
      } else if (score < 80) {
        recommendations.push('GDPR Implementation Guide');
        recommendations.push('Privacy by Design Framework');
      } else {
        recommendations.push('GDPR Advanced Compliance');
        recommendations.push('Data Governance Excellence');
      }
    } else if (complianceData.compliance === 'USA Compliance') {
      if (score < 60) {
        recommendations.push('HIPAA Security Assessment');
        recommendations.push('SOX Compliance Review');
      } else if (score < 80) {
        recommendations.push('CCPA/CPRA Privacy Assessment');
        recommendations.push('Financial Controls Audit');
      } else {
        recommendations.push('Advanced US Compliance');
        recommendations.push('Regulatory Excellence Program');
      }
    } else if (complianceData.compliance === 'ISO Standards') {
      if (score < 60) {
        recommendations.push('ISO 27001 Implementation Guide');
        recommendations.push('Quality Management Systems');
      } else if (score < 80) {
        recommendations.push('ISO 14001 Environmental Management');
        recommendations.push('ISO 45001 Safety Management');
      } else {
        recommendations.push('ISO 22301 Business Continuity');
        recommendations.push('Integrated Management Systems');
      }
    } else if (complianceData.compliance === 'IEC Standards') {
      if (score < 60) {
        recommendations.push('IEC 62443 Cybersecurity Framework');
        recommendations.push('IEC 61508 Functional Safety');
      } else if (score < 80) {
        recommendations.push('IEC 60364 Electrical Installations');
        recommendations.push('IEC 61000 EMC Standards');
      } else {
        recommendations.push('IEC 62304 Medical Device Software');
        recommendations.push('Advanced IEC Compliance');
      }
    }
    
    return recommendations;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Assessment Complete!</h1>
          <p>Compliance Standard: {complianceData.standard || 'Selected Standard'}</p>
        </div>
        
        <div className="results-container">
          <div className="score-display">
            <h2>Your Score: {score}%</h2>
            <div className="score-bar">
              <div className="score-fill" style={{width: `${score}%`}}></div>
            </div>
          </div>
          
          <div className="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              <li>Review and update your data protection policies</li>
              <li>Conduct regular compliance training for staff</li>
              <li>Implement automated compliance monitoring</li>
              <li>Schedule regular compliance audits</li>
            </ul>
          </div>
          
          <div className="quiz-actions">
            <button className="back-btn" onClick={handleBackToDashboard}>
              Back to Dashboard
            </button>
            <button className="retake-btn" onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResults(false);
            }}>
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Compliance Assessment</h1>
        <p>{complianceData.compliance} - {complianceData.standard}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
          ></div>
        </div>
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">
          {questions[currentQuestion].question}
        </h2>
        
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <label 
              key={index} 
              className={`option-label ${answers[questions[currentQuestion].id] === option ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${questions[currentQuestion].id}`}
                value={option}
                checked={answers[questions[currentQuestion].id] === option}
                onChange={() => handleAnswerSelect(questions[currentQuestion].id, option)}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>

        <div className="quiz-actions">
          <button 
            className="prev-btn" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button 
            className="next-btn" 
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
