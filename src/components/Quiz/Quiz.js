import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Get compliance data from navigation state
  const complianceData = location.state || {};

  // ISO 27001 Questions - All 30 questions based on the provided data
  const questions = [
    {
      id: 1,
      clause: "4.1",
      question: "Understanding the organization and its context - The organization shall determine external and internal issues that are relevant to its purpose and that affect its ability to achieve the intended outcome(s) of its ISMS",
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
      question: "Understanding the needs and expectations of interested parties - The organization shall determine: a) interested parties that are relevant to the ISMS, b) the relevant requirements of these interested parties",
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
      question: "Determining the scope of the ISMS - The organization shall determine the boundaries and applicability of the ISMS to establish its scope",
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
      question: "Information Security Management System - The organization shall establish, implement, maintain and continually improve an ISMS",
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
      question: "Leadership and commitment - Top management shall demonstrate leadership and commitment with respect to the ISMS",
      options: [
        "Organization has basic awareness of leadership requirements but limited documentation",
        "Top management has documented commitment and established basic ISMS policy",
        "Leadership commitment is integrated into business processes with regular communication and IS objectives which are coming out of the IS policy are reviewed for achievement Top managment asks the key members for inputs to change the policy and to makeit more clear and understandable for action expected out from each employee",
        "Leadership demonstrates continuous commitment through measurable actions, resource allocation, and strategic integration , and at every moment of internal address highlights the Policy and what it means in the current context. It also reviews the IS objectives for achievement in the review meetings and encorages to refine these objectives by more engaegement."
      ]
    },
    {
      id: 6,
      clause: "5.2",
      question: "Information security policy - Top management shall establish an information security policy",
      options: [
        "Basic information security policy exists with minimal communication",
        "Policy is well defined and documented covering several key aspects of ISMS and IS controls which the top management is committed to and communicated through standard channels",
        "Policy is having all implemented controls which the organization wants stake holders to know regularly reviewed, and aspects of ISMS which the top managment wants to focus upon . It is updated, and communicated through multiple channels",
        "Policy is having all implemented controls which the organization wants stake holders to know regularly reviewed, and aspects of ISMS which the top managment wants to focus upon . It is updated, and communicated through multiple channels. Policy is fully integrated with business objectives, regularly assessed for effectiveness, and continuously improved. Policies communication is integrated with the induction program and its understanding is assessed throughout the organizations and its key supply chain"
      ]
    },
    {
      id: 7,
      clause: "5.3",
      question: "Organizational roles, responsibilities and authorities - Top management shall ensure responsibilities and authorities for information security roles are assigned and communicated",
      options: [
        "Basic roles identified but not formally documented or communicated",
        "Roles and responsibilities documented and assigned to specific individuals",
        "Roles are integrated into job descriptions and a section for ISMS specific responsibility with regular performance monitoring",
        "Comprehensive role framework with clear accountability for ISMS specific processes (4.4)and IS controls(ISO 27002) , performance metrics against , and continuous competency development. Responisbility for monitoring and execution of IS control and processes is segregated"
      ]
    },
    {
      id: 8,
      clause: "6.1.1",
      question: "Actions to address risks and opportunities - General planning requirements",
      options: [
        "Basic understanding of risks exists but no formal assessment conducted",
        "Risk assessment has been conducted thoroughly for all physical servers ,buildings and applications and database with documented results",
        "Risk assessment is comprehensive and includes thoroughly for all physical servers ,buildings and applications and database, INformation and people assets with clearly defined scale of reverity and probability . It identified existing controls applied to minimize the risks and also declares the residual risks . It is regularly updated and linked to business processes",
        "Comprehensive risk management framework with continuous improvement of risk assessment methodology to come as close to reality with clearly defined scales or probability and severity- with evolving use of factors affecting probability of occerance ( threat exposure time, ability to detect a threat early) and also severity( Busines sand legal impact and ability to recreate the asset) . monitoring, treatment tracking with defined procedures and decision making in place , and business alignment with IS objectives and business strategies coming out risk analysis"
      ]
    },
    {
      id: 9,
      clause: "6.1.2",
      question: "Information security risk assessment - Define and apply risk assessment process",
      options: [
        "Basic risk identification without formal procedure or criteria",
        "Risk assessment procedure documented with basic criteria defined and tools and techniques defined",
        "Comprehensive risk assessment procedure with consistent applicationof tools and techniques with examples and regular reviews . It also has a well defined training program to teach and assess the team on risk assessment techniques",
        "The procedure for risk assessment and alos risk assessment is defined with responsibility of the trained team members to conduct initial and review risk analysis . The threshold Residual risk is also defined . Training rogram for risk analysis initial and refresher courses are done time to time with assessment eyeing more inputs into risk assessment, The preventive control assessment mechanism are also defined in the procedure"
      ]
    },
    {
      id: 10,
      clause: "6.1.3",
      question: "Information security risk treatment - Define and apply risk treatment process",
      options: [
        "Basic understanding of risk treatment options without formal planning",
        "Risk treatment plan developed with selected controls documented",
        "Comprehensive risk treatment plan with implemented controls and regular monitoring",
        "Advanced risk treatment framework with continuous optimization, effectiveness measurement, and strategic alignment"
      ]
    },
    {
      id: 11,
      clause: "6.2",
      question: "Information security objectives and planning - Establish measurable information security objectives",
      options: [
        "Basic awareness of need for objectives but not formally established IS objectives are theoreticlly established - subjective in nature",
        "Information security objectives are objectively defined for major IS processes documented and communicated",
        "Objectives are measurable, and are defined for all IS processes and most of the IS contols , with accountability of execution , and monitoring separated , and regularly reviewed. Planning of resources required and timeline is doneby the reposnible person",
        "Comprehensive objectives framework with performance metrics, continuous improvement, and strategic alignment. Comprehensive planning by responsible person is made including exact activities and timelines . Montitoring responsibility is separate, It is predecided how the results of achievements will be evaluated"
      ]
    },
    {
      id: 12,
      clause: "6.3",
      question: "Planning of changes - Ensure changes to ISMS are carried out in a planned manner",
      options: [
        "Changes are made reactively without formal planning process",
        "Basic change planning process exists with documentation",
        "A detailed change management process or procedure exists with impact assessment and formal approval",
        "Advanced change management framework with formal risk assessment, stakeholder engagement and approval , and continuous inputs to risk analysis post change"
      ]
    },
    {
      id: 13,
      clause: "7.1",
      question: "Resources - Determine and provide resources needed for ISMS establishment, implementation, maintenance and continual improvement",
      options: [
        "Organization has basic awareness of resource needs but lacks systematic assessment, documented allocation process, or strategic planning for ISMS resource requirements",
        "Resources are identified and allocated based on documented requirements with initial gap analysis and stakeholder input from key departments and business units",
        "Comprehensive resource planning framework ( Human resources, Knowledge resources, Technical resources-hardware and software ) is established with regular reviews, stakeholder engagement, ISMS objective alignment, and documented optimization processes linked to risk assessments and business changes",
        "Advanced resource management ( Human resources, Knowledge resources, Technical resources-hardware and software ) integrated with business strategy featuring dynamic allocation, predictive planning for emerging threats, continuous optimization based on ISMS effectiveness metrics, and strategic alignment with organizational transformation initiatives"
      ]
    },
    {
      id: 14,
      clause: "7.2",
      question: "Competence - Determine necessary competence of persons affecting information security performance",
      options: [
        "Basic understanding of competency needs without formal assessment or structured approach to skills development",
        "Competency requirements documented with basic training provided and initial skills assessment completed",
        "Regular competency assessment and development programs established with role-specific training metrices and SKILL levels are established and performance tracking",
        "Comprehensive competency management framework with continuous development, performance measurement, behavioral assessment, and strategic alignment with business objectives"
      ]
    },
    {
      id: 15,
      clause: "7.3",
      question: "Awareness - Ensure persons are aware of IS policy, their contribution and implications of non-conformity",
      options: [
        "Limited awareness activities, minimal documentation, no measurement of effectiveness/behavioral change",
        "Formal program, regular communication, basic training delivery, participation tracking",
        "Comprehensive program with regular assessment, behavioral change measurement, multi-channel communication, effectiveness reviews and a regular training program",
        "Advanced program with behavioral analytics( coming from monitoring tools) , adaptive learning pathways, continuous reinforcement, cultural integration, strategic alignment"
      ]
    },
    {
      id: 16,
      clause: "7.4",
      question: "Communication – Determine internal and external communications relevant to ISMS, including what, when, with whom, and how to communicate",
      options: [
        "Ad-hoc communication without formal planning, stakeholder analysis, or effectiveness measurement",
        "Basic communication plan established for key stakeholders with defined channels and regular communication schedule",
        "Comprehensive communication plan with stakeholder mapping, multi-channel approach, regular reviews, and basic effectiveness measurement",
        "Advanced communication framework with stakeholder engagement analytics, adaptive messaging, real-time feedback integration, and strategic communication alignment"
      ]
    },
    {
      id: 17,
      clause: "7.5",
      question: "Documented Information - Include required documented information and control its creation, updating, and management",
      options: [
        "Basic documentation exists without formal control processes, lacking version control and access restrictions",
        "Document control procedure established with basic approval workflows, version control, and document storage",
        "Comprehensive document control with lifecycle management, access controls, regular review cycles, retention scheduling, and integrity safeguards",
        "Advanced document management system with automated controls, electronic workflow automation, AI-based content classification, blockchain integrity verification, and organizational governance integration"
      ]
    },
    {
      id: 18,
      clause: "8.1",
      question: "Operational planning and control - Plan, implement and control processes needed to meet requirements with criteria establishment and process management",
      options: [
        "Basic operational activities without formal planning, criteria, control mechanisms, or change management",
        "Operational processes documented with basic control implementation and defined criteria",
        "Comprehensive operational control with integrated process management, change control, monitoring, and third-party service oversight",
        "Advanced operational framework with predictive analytics, automated controls, AI-driven optimization, strategic alignment, and continuous improvement"
      ]
    },
    {
      id: 19,
      clause: "8.2",
      question: "The organization shall perform information security risk assessments at planned intervals or when significant changes occur, taking into account the criteria established in 6.1.2 a.",
      options: [
        "Irregular risk assessments conducted with minimal documentation, using basic methodologies, lacking defined schedules or change management consideration.",
        "Regularly scheduled risk assessments performed with documented results and standard methodologies; initial processes for managing change-triggered assessments are established.",
        "Comprehensive risk assessment program formalized with advanced methodologies, automated change detection, frequent reviews integrating trend analysis, and linkage to ISMS objectives.",
        "An advanced and dynamic risk assessment framework leveraging AI-driven threat intelligence and predictive analytics, enabling real-time risk monitoring and strategic risk management optimization."
      ]
    },
    {
      id: 20,
      clause: "8.3",
      question: "Information security risk treatment - Implement risk treatment plan and retain documented information",
      options: [
        "Basic risk treatment activities without comprehensive implementation tracking, effectiveness monitoring, or optimization",
        "Risk treatment plan implemented with documented results, basic effectiveness monitoring, and progress tracking",
        "Comprehensive risk treatment implementation with regular effectiveness reviews, optimization mechanisms, and integration into business processes",
        "Advanced risk treatment framework with AI-powered effectiveness optimization, predictive analytics, continuous improvement, and strategic alignment"
      ]
    },
    {
      id: 21,
      clause: "9.1",
      question: "Monitoring, measurement, analysis and evaluation - Determine what needs to be monitored and measured, including information security processes and controls; define methods, timing, and responsible persons",
      options: [
        "Basic monitoring activities without formal measurement framework, analytics capabilities, or strategic integration",
        "Monitoring and measurement procedures established with regular reporting, basic analytics, and performance tracking systems",
        "Comprehensive monitoring framework with advanced analytics, trend analysis, predictive insights, and strategic performance management integration",
        "Advanced monitoring system with AI-powered analytics, automated insights generation, predictive performance optimization, and strategic intelligence dashboard"
      ]
    },
    {
      id: 22,
      clause: "9.2.1",
      question: "Internal audit - General requirements for conducting internal audits at planned intervals",
      options: [
        "Irregular internal audits without formal audit program, minimal documentation, or systematic follow-up",
        "Internal audit program established with planned intervals, documented audit criteria, and basic audit execution and reporting",
        "Comprehensive internal audit program with risk-based audit planning, qualified auditors, documented results, and systematic follow-up and continuous improvement",
        "Advanced internal audit framework including AI-assisted audit planning, automated evidence collection, risk-focused sampling, continuous audit monitoring, and strategic integration with business objectives"
      ]
    },
    {
      id: 23,
      clause: "9.2.2",
      question: "Plan, establish, implement, and maintain an internal audit programme(s), including frequency, methods, responsibilities, planning requirements, and reporting, to ensure objective and impartial audit processes aligned with risk and organizational priorities.",
      options: [
        "Basic audit activities with no comprehensive programme structure, undefined scope or responsibilities, and lacking systematic planning or reporting.",
        "Documented internal audit programme exists, with defined audit criteria, scope, responsibilities, and planned intervals, but with limited risk-based prioritization.",
        "Comprehensive internal audit programme implemented that integrates risk-based audit planning, clearly assigned responsibilities, consistent execution, and formalized reporting and review mechanisms.",
        "Advanced internal audit programme with dynamic risk assessment integration, continuous audit schedule optimization, AI-supported planning and reporting, enhanced stakeholder engagement, and continuous audit effectiveness evaluation."
      ]
    },
    {
      id: 24,
      clause: "9.3",
      question: "Management review - Top management shall review the organization's ISMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness.",
      options: [
        "Irregular management involvement without a formal review process, lacking documented evidence or strategic decision-making.",
        "Management review process established with documented inputs and outputs, following a standard agenda, held at planned intervals.",
        "Comprehensive management review includes strategic decision-making, integration of audit results, risk treatment status, objectives performance, and continual improvement actions. The process is regular, documented, and reviewed for effectiveness.",
        "Advanced management review framework leveraging predictive analytics, automated performance dashboards, AI-driven recommendations, including strategic planning integration and continuous organizational excellence measurement and improvement."
      ]
    },
    {
      id: 25,
      clause: "10.1",
      question: "Nonconformity and corrective action - The organization shall react to nonconformities, take actions to control and correct them, deal with consequences, evaluate the need to eliminate causes to prevent recurrence, and continually improve.",
      options: [
        "Reactive approach to nonconformities without a formal process, no root cause analysis or preventive measures, limited documentation.",
        "Nonconformity and corrective action process established with formal documentation, basic root cause analysis performed, and corrective measures applied.",
        "Comprehensive management of nonconformities, including advanced root cause analysis, preventive action plans, documented corrective actions, regular effectiveness reviews, and feedback loops for continual improvement.",
        "Advanced nonconformity management framework with AI-powered predictive analytics, automated root cause identification, strategic improvement actions integrated with organizational objectives, and continuous optimization of corrective processes."
      ]
    },
    {
      id: 26,
      clause: "10.2",
      question: "Continual improvement - Continually improve suitability, adequacy and effectiveness of ISMS",
      options: [
        "Limited improvement activities without systematic approach, innovation integration, or strategic alignment measurement",
        "Continual improvement process established with systematic documentation, performance measurement, and basic enhancement tracking",
        "Comprehensive improvement program with innovation integration, strategic alignment optimization, performance excellence, and systematic organizational enhancement",
        "Advanced improvement framework with AI-powered innovation analysis, automated strategic optimization, predictive excellence measurement, and organizational transformation leadership"
      ]
    },
    {
      id: 27,
      clause: "5.4",
      question: "Information security policy - The organization shall establish an information security policy that is appropriate to the purpose of the organization",
      options: [
        "Basic information security policy exists with minimal communication and no regular review",
        "Policy is documented and communicated to all personnel with basic review processes",
        "Policy is comprehensive, regularly reviewed, communicated through multiple channels, and includes specific security objectives",
        "Policy is fully integrated with business strategy, regularly assessed for effectiveness, includes measurable objectives, and is continuously improved based on performance metrics"
      ]
    },
    {
      id: 28,
      clause: "6.4",
      question: "Planning of changes - The organization shall determine the need for changes to the ISMS and the consequences of intended changes",
      options: [
        "Changes are made reactively without formal assessment of consequences or impact on ISMS",
        "Basic change assessment process exists with documentation of major changes and their impact",
        "Comprehensive change management process with formal impact assessment, stakeholder consultation, and risk evaluation for all changes",
        "Advanced change management framework with predictive impact analysis, automated change tracking, and strategic alignment with business objectives"
      ]
    },
    {
      id: 29,
      clause: "7.6",
      question: "Documented information - The organization shall control documented information required by the ISMS and by this International Standard",
      options: [
        "Basic documentation exists without formal control processes or version management",
        "Document control procedure established with basic approval workflows and version control",
        "Comprehensive document control with lifecycle management, access controls, and regular review cycles",
        "Advanced document management system with automated controls, AI-based classification, and blockchain integrity verification"
      ]
    },
    {
      id: 30,
      clause: "8.4",
      question: "Operational planning and control - The organization shall plan, implement and control the processes needed to meet information security requirements",
      options: [
        "Basic operational activities without formal planning or control mechanisms",
        "Operational processes documented with basic control implementation and defined criteria",
        "Comprehensive operational control with integrated process management and regular monitoring",
        "Advanced operational framework with predictive analytics, automated controls, and strategic alignment"
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
      <div className="quiz-page">
        {/* Header */}
        <div className="hero-nav-content">
          <div className="nav-container">
            <div className="nav-left">
              <div className="nav-logo">
                <img src="/l7.png" alt="Compliance Eye" className="logo-image" />
                <h2>Compliance Eye</h2>
              </div>
            </div>
            <div className="nav-menu">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            <div className="nav-right">
              <div className="social-nav">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          {/* Video Background */}
          <div className="quiz-video-background">
            <video 
              className="quiz-background-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              webkit-playsinline="true"
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="quiz-page">
      {/* Header */}
      <div className="hero-nav-content">
        <div className="nav-container">
          <div className="nav-left">
            <div className="nav-logo">
              <img src="/l7.png" alt="Compliance Eye" className="logo-image" />
              <h2>Compliance Eye</h2>
            </div>
          </div>
          <div className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-right">
            <div className="social-nav">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-container">
        {/* Video Background */}
        <div className="quiz-video-background">
          <video 
            className="quiz-background-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
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
            <p className="instruction-text">Choose only 1 answer</p>
          
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
      <Footer />
    </div>
  );
};

export default Quiz;
