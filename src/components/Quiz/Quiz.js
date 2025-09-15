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

  // ISO 27001 Questions based on the provided data
  const questions = [
    {
      id: 1,
      clause: "4.1",
      question: "Understanding the organization and its context - Has the organization identified and documented the list of external and internal issues?",
      options: [
        "My organization is aware of the internal and external issues but not documented them",
        "My organization has documented all possible internal and external issues in one format with the help of a brain storming session",
        "The enlisted internal and external issues are linked to ISO 27002 controls and also our internal process related to them and are reviewed on a yearly basis",
        "Internal and external issues are identified, enlisted and linked to ISO 27002 controls and also graded with regards to their ability to influence our organization success and this grading is then linked to the risk analysis elements"
      ]
    },
    {
      id: 2,
      clause: "4.2",
      question: "Understanding the needs and expectations of interested parties - Has the organization identified the list of Interested parties?",
      options: [
        "My organization has identified most important interested parties which are three like employees, customers and suppliers - and we have captured their requirements",
        "My organization has identified all legal and government stakeholders in addition to suppliers, customers and employees and have identified their contact person and documented their key requirements in a list",
        "We have identified level 2 suppliers and customers in addition to government, legal and employee stakeholders, we have documented separately for each stakeholder their requirements and also have identified how we are able to meet these requirements. We have also identified risk arising out of this exercise and included these risk in our formal risk assessment",
        "Our organization has a process for identifying all possible stakeholders and categorises them for importance. We review this list at least once in a year. There is a stakeholder engagement process with clearly accountable people who have responsibilities to identify explicit and implicit requirements. These requirements serve as input in making revisions to our ISMS policy and IS objectives"
      ]
    },
    {
      id: 3,
      clause: "4.3",
      question: "Determining the scope of the ISMS - Has the organization established the scope of the ISMS?",
      options: [
        "The organization has reduced the scope to limited set of activities because of any reason and does not covers all activities which may have additional risks",
        "We have a documented scope document which is part of our IS policy document. It identifies the building that we occupy and the software that we use and all key activities we do to service our client",
        "The scope document covers all activities and links to external and internal issues and interested parties requirements identified by the organization",
        "The scope is linked to organizational activities and interfaces with other activities performed by interested parties including vendors"
      ]
    },
    {
      id: 4,
      clause: "4.4",
      question: "Information Security Management System - Has the organization established an ISMS with defined processes and interactions?",
      options: [
        "Basic ISMS structure exists with minimal documentation, Processes are identified and listed",
        "ALL key processes identified and listed as a flow chart",
        "ISMS processes are listed as core and non core and high level and subprocesses are also identified ,integrated and regularly reviewed",
        "ISMS is fully integrated with business processes, continuously improved, and strategically aligned, Core and non core processes and subprocesses are mapped for responsibility and interafaces, whether they are linked to internal or external issue or any interested parties requirments"
      ]
    },
    {
      id: 5,
      clause: "5.1",
      question: "Leadership and commitment - Has the organization made an ISMS policy and IS objectives which are compatible with the direction of the organization?",
      options: [
        "Organization has basic awareness of leadership requirements but limited documentation",
        "Top management has documented commitment and established basic ISMS policy",
        "Leadership commitment is integrated into business processes with regular communication and IS objectives which are coming out of the IS policy are reviewed for achievement Top managment asks the key members for inputs to change the policy and to makeit more clear and understandable for action expected out from each employee",
        "Leadership demonstrates continuous commitment through measurable actions, resource allocation, and strategic integration , and at every moment of internal address highlights the Policy and what it means in the current context. It also reviews the IS objectives for achievement in the review meetings and encorages to refine these objectives by more engaegement."
      ]
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
        {/* Video Background */}
        <div className="quiz-video-background">
          <video 
            className="quiz-background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Untitled design (9).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="quiz-video-overlay"></div>
        </div>

        <div className="quiz-content">
          <div className="quiz-header">
            <h1>Assessment Complete!</h1>
            <p>ISO 27001 - {complianceData.standard || 'Selected Standard'}</p>
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
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Video Background */}
      <div className="quiz-video-background">
        <video 
          className="quiz-background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Untitled design (9).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="quiz-video-overlay"></div>
      </div>

      <div className="quiz-content">
        <div className="quiz-header">
          <h1>ISO 27001 Assessment</h1>
          <p>Clause {questions[currentQuestion].clause} - {complianceData.standard}</p>
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
    </div>
  );
};

export default Quiz;
