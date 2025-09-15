zimport React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ComplianceSelector from '../ComplianceSelector/ComplianceSelector';
import PersonalizedReports from '../PersonalizedReports/PersonalizedReports';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');
  const [assessmentData, setAssessmentData] = useState(null);
  const [userHistory, setUserHistory] = useState({
    completedQuizzes: [],
    receivedReports: [],
    totalPoints: 0,
    lastActivity: null
  });
  
  const [gapAnalysis, setGapAnalysis] = useState({
    complianceGaps: [],
    riskMetrics: [],
    performanceTrends: [],
    criticalAlerts: [],
    overallScore: 0
  });
  
  const [processSteps, setProcessSteps] = useState({
    currentStep: 1,
    steps: []
  });
  
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';

  // Load user history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('userHistory') || '{}');
    if (Object.keys(savedHistory).length > 0) {
      setUserHistory(savedHistory);
    } else {
      // Initialize with sample data
      const sampleHistory = {
        completedQuizzes: [
          {
            id: 1,
            title: "GDPR Compliance Assessment",
            completedDate: "2024-01-15",
            score: 85,
            totalQuestions: 20,
            category: "Data Protection",
            points: 170
          },
          {
            id: 2,
            title: "HIPAA Security Quiz",
            completedDate: "2024-01-12",
            score: 92,
            totalQuestions: 15,
            category: "Healthcare",
            points: 184
          },
          {
            id: 3,
            title: "ISO 27001 Basics",
            completedDate: "2024-01-10",
            score: 78,
            totalQuestions: 25,
            category: "Information Security",
            points: 156
          }
        ],
        receivedReports: [
          {
            id: 1,
            title: "GDPR Compliance Deep Dive",
            expert: "Dr. Sarah Mitchell",
            receivedDate: "2024-01-15",
            type: "Expert Report",
            status: "Completed",
            points: 200
          },
          {
            id: 2,
            title: "Personalized Compliance Roadmap",
            expert: "System Generated",
            receivedDate: "2024-01-12",
            type: "Personalized Report",
            status: "In Progress",
            points: 150
          },
          {
            id: 3,
            title: "HIPAA Security Assessment",
            expert: "Michael Chen",
            receivedDate: "2024-01-10",
            type: "Expert Report",
            status: "Completed",
            points: 180
          }
        ],
        totalPoints: 1040,
        lastActivity: "2024-01-15"
      };
      setUserHistory(sampleHistory);
      localStorage.setItem('userHistory', JSON.stringify(sampleHistory));
    }

    // Initialize gap analysis data
    const sampleGapAnalysis = {
      complianceGaps: [
        {
          id: 1,
          category: "Data Protection",
          title: "GDPR Article 32 - Security of Processing",
          currentLevel: 65,
          targetLevel: 90,
          gap: 25,
          priority: "High",
          status: "In Progress",
          lastUpdated: "2024-01-15",
          description: "Missing encryption at rest for personal data storage",
          miniChart: [60, 62, 63, 64, 65, 65, 65]
        },
        {
          id: 2,
          category: "Healthcare",
          title: "HIPAA Administrative Safeguards",
          currentLevel: 78,
          targetLevel: 95,
          gap: 17,
          priority: "Medium",
          status: "Planned",
          lastUpdated: "2024-01-12",
          description: "Incomplete workforce training program documentation",
          miniChart: [75, 76, 77, 78, 78, 78, 78]
        },
        {
          id: 3,
          category: "Information Security",
          title: "ISO 27001 Control A.12.6 - Technical Vulnerability Management",
          currentLevel: 45,
          targetLevel: 85,
          gap: 40,
          priority: "Critical",
          status: "Not Started",
          lastUpdated: "2024-01-10",
          description: "No formal vulnerability assessment process in place",
          miniChart: [45, 45, 45, 45, 45, 45, 45]
        },
        {
          id: 4,
          category: "Financial",
          title: "SOX Section 404 - Internal Controls",
          currentLevel: 82,
          targetLevel: 95,
          gap: 13,
          priority: "Low",
          status: "In Progress",
          lastUpdated: "2024-01-14",
          description: "Minor documentation gaps in control testing procedures",
          miniChart: [80, 81, 81, 82, 82, 82, 82]
        }
      ],
      riskMetrics: [
        {
          id: 1,
          metric: "Data Breach Risk",
          currentValue: 15,
          threshold: 10,
          unit: "%",
          trend: "increasing",
          status: "warning",
          miniChart: [12, 13, 14, 15, 16, 15, 15]
        },
        {
          id: 2,
          metric: "Compliance Score",
          currentValue: 72,
          threshold: 85,
          unit: "%",
          trend: "stable",
          status: "warning",
          miniChart: [68, 70, 69, 71, 72, 70, 72]
        },
        {
          id: 3,
          metric: "Audit Findings",
          currentValue: 8,
          threshold: 5,
          unit: "count",
          trend: "decreasing",
          status: "warning",
          miniChart: [12, 10, 9, 8, 8, 8, 8]
        },
        {
          id: 4,
          metric: "Training Completion",
          currentValue: 89,
          threshold: 95,
          unit: "%",
          trend: "increasing",
          status: "good",
          miniChart: [75, 78, 80, 82, 85, 87, 89]
        }
      ],
      performanceTrends: [
        { date: "2024-01-01", compliance: 68, risk: 18, training: 75 },
        { date: "2024-01-02", compliance: 70, risk: 17, training: 78 },
        { date: "2024-01-03", compliance: 69, risk: 19, training: 80 },
        { date: "2024-01-04", compliance: 71, risk: 16, training: 82 },
        { date: "2024-01-05", compliance: 72, risk: 15, training: 85 },
        { date: "2024-01-06", compliance: 70, risk: 17, training: 87 },
        { date: "2024-01-07", compliance: 72, risk: 15, training: 89 }
      ],
      criticalAlerts: [
        {
          id: 1,
          type: "Critical",
          title: "ISO 27001 Vulnerability Management Gap",
          description: "Critical gap in technical vulnerability management process",
          timestamp: "2024-01-15 14:30",
          action: "Immediate action required",
          miniChart: [45, 45, 45, 45, 45, 45, 45]
        },
        {
          id: 2,
          type: "High",
          title: "GDPR Encryption Gap",
          description: "Personal data not encrypted at rest",
          timestamp: "2024-01-15 10:15",
          action: "Address within 48 hours",
          miniChart: [60, 62, 63, 64, 65, 65, 65]
        },
        {
          id: 3,
          type: "Medium",
          title: "HIPAA Training Documentation",
          description: "Incomplete workforce training records",
          timestamp: "2024-01-14 16:45",
          action: "Address within 1 week",
          miniChart: [75, 76, 77, 78, 78, 78, 78]
        }
      ],
      overallScore: 72
    };
    setGapAnalysis(sampleGapAnalysis);
    localStorage.setItem('gapAnalysis', JSON.stringify(sampleGapAnalysis));

    // Initialize compliance process steps
    const sampleProcessSteps = {
      currentStep: 2,
      steps: [
        {
          id: 1,
          title: "Assessment & Analysis",
          description: "Conduct comprehensive compliance assessment",
          icon: "🎯",
          status: "completed",
          completedDate: "2024-01-10"
        },
        {
          id: 2,
          title: "Gap Identification",
          description: "Identify compliance gaps and risks",
          icon: "🔍",
          status: "in-progress",
          completedDate: null
        },
        {
          id: 3,
          title: "Remediation Planning",
          description: "Create detailed remediation plans",
          icon: "📋",
          status: "pending",
          completedDate: null
        },
        {
          id: 4,
          title: "Implementation",
          description: "Implement compliance controls and processes",
          icon: "⚙️",
          status: "pending",
          completedDate: null
        },
        {
          id: 5,
          title: "Testing & Validation",
          description: "Test and validate compliance measures",
          icon: "🧪",
          status: "pending",
          completedDate: null
        },
        {
          id: 6,
          title: "Documentation",
          description: "Document all compliance activities",
          icon: "📄",
          status: "pending",
          completedDate: null
        },
        {
          id: 7,
          title: "Monitoring & Review",
          description: "Establish ongoing monitoring and review",
          icon: "📊",
          status: "pending",
          completedDate: null
        }
      ]
    };
    setProcessSteps(sampleProcessSteps);
    localStorage.setItem('processSteps', JSON.stringify(sampleProcessSteps));

  }, []);

  // Check for assessment data from quiz
  useEffect(() => {
    if (location.state?.showPersonalizedReports && location.state?.assessmentData) {
      setAssessmentData(location.state.assessmentData);
      setActiveTab('Reports'); // Switch to Reports tab to show assessment results
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <h2>Dashbrd X</h2>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search dashboard..." />
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'Home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('Home'); }}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'Reports' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('Reports'); }}>Reports</a>
            </li>
           
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'Products' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('Products'); }}>Expert Reports</a>
            </li>
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'Tasks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('Tasks'); }}>Tasks</a>
            </li>
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'GapAnalysis' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('GapAnalysis'); }}>Gap Analysis</a>
            </li>
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeTab === 'ProcessSteps' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('ProcessSteps'); }}>Process Steps</a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">Suscriptions</a>
            </li>
        
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile" onClick={handleProfileClick}>
            <div className="user-avatar">
              <img src="/l7.png" alt="User" />
            </div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-settings">Account settings</div>
            </div>
            <div className="notification-bell">
              <span className="bell-icon">🔔</span>
              <span className="notification-count">0</span>
            </div>
          </div>
          <button className="get-template-btn">
            Get template →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="breadcrumbs">
            <span>Dashboard</span>
            <span className="separator">&gt;</span>
            <span>Reports</span>
          </div>
          <div className="header-actions">
            <button className="create-report-btn">
              + Create report
            </button>
            <div className="header-notifications">
              <span className="bell-icon">🔔</span>
            </div>
            <div className="header-avatar" onClick={handleProfileClick}>
              <img src="/l7.png" alt="User" />
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === 'Home' && <ComplianceSelector />}
          
          {activeTab === 'Products' && <PersonalizedReports assessmentData={assessmentData} />}
          
          {activeTab === 'Reports' && (
            <>
              {/* Assessment Results Section - Show when user returns from quiz */}
              {assessmentData && (
                <div className="assessment-results-section">
                  <div className="section-header">
                    <h2>Your Assessment Results</h2>
                    <p>Real-time analysis of your {assessmentData.complianceType} assessment</p>
                    <div className="assessment-badge">
                      <span className="badge-icon">📊</span>
                      <span>Power BI Real-time Analytics</span>
                    </div>
                  </div>

                  <div className="results-grid">
                    {/* Score Overview */}
                    <div className="result-card score-card">
                      <div className="card-header">
                        <h3>Overall Score</h3>
                        <span className="score-badge">{assessmentData.score}%</span>
                      </div>
                      <div className="score-breakdown">
                        <div className="score-detail">
                          <span className="label">Points Earned:</span>
                          <span className="value">{assessmentData.totalPoints.toFixed(1)} / {assessmentData.maxPoints}</span>
                        </div>
                        <div className="score-detail">
                          <span className="label">Completion Date:</span>
                          <span className="value">{new Date(assessmentData.completedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="score-detail">
                          <span className="label">Assessment Type:</span>
                          <span className="value">{assessmentData.complianceType}</span>
                        </div>
                      </div>
                      <div className="score-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${assessmentData.score}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Power BI Analytics Simulation */}
                    <div className="result-card analytics-card">
                      <div className="card-header">
                        <h3>Power BI Analytics</h3>
                        <span className="live-indicator">● LIVE</span>
                      </div>
                      <div className="analytics-content">
                        <div className="analytics-metrics">
                          <div className="metric">
                            <span className="metric-label">Compliance Level</span>
                            <span className="metric-value">{assessmentData.score >= 80 ? 'Excellent' : assessmentData.score >= 60 ? 'Good' : assessmentData.score >= 40 ? 'Fair' : 'Needs Improvement'}</span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">Risk Score</span>
                            <span className="metric-value">{100 - assessmentData.score}%</span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">Maturity Level</span>
                            <span className="metric-value">{assessmentData.score >= 80 ? 'Advanced' : assessmentData.score >= 60 ? 'Intermediate' : 'Basic'}</span>
                          </div>
                        </div>
                        <div className="analytics-chart">
                          <div className="chart-title">Compliance Distribution</div>
                          <div className="chart-bars">
                            <div className="bar-group">
                              <div className="bar" style={{height: `${assessmentData.score}%`, backgroundColor: '#3b82f6'}}></div>
                              <span className="bar-label">Your Score</span>
                            </div>
                            <div className="bar-group">
                              <div className="bar" style={{height: '75%', backgroundColor: '#10b981'}}></div>
                              <span className="bar-label">Industry Avg</span>
                            </div>
                            <div className="bar-group">
                              <div className="bar" style={{height: '90%', backgroundColor: '#8b5cf6'}}></div>
                              <span className="bar-label">Best Practice</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="result-card recommendations-card">
                      <div className="card-header">
                        <h3>AI-Powered Recommendations</h3>
                        <span className="ai-badge">🤖 AI Generated</span>
                      </div>
                      <div className="recommendations-list">
                        {assessmentData.recommendations.map((rec, index) => (
                          <div key={index} className="recommendation-item">
                            <span className="rec-number">{index + 1}</span>
                            <span className="rec-text">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Real-time Insights */}
                    <div className="result-card insights-card">
                      <div className="card-header">
                        <h3>Real-time Insights</h3>
                        <span className="update-time">Updated: {new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="insights-content">
                        <div className="insight-item">
                          <div className="insight-icon">📈</div>
                          <div className="insight-text">
                            <strong>Performance Trend:</strong> Your score is {assessmentData.score >= 70 ? 'above' : 'below'} industry average
                          </div>
                        </div>
                        <div className="insight-item">
                          <div className="insight-icon">🎯</div>
                          <div className="insight-text">
                            <strong>Focus Area:</strong> {assessmentData.score < 60 ? 'Basic implementation needed' : assessmentData.score < 80 ? 'Process optimization recommended' : 'Maintain excellence'}
                          </div>
                        </div>
                        <div className="insight-item">
                          <div className="insight-icon">⚡</div>
                          <div className="insight-text">
                            <strong>Next Steps:</strong> {assessmentData.score < 60 ? 'Start with fundamental controls' : 'Focus on advanced monitoring'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default Analytics Section - Show when no assessment data */}
              {!assessmentData && (
                <div className="analytics-section">
                  <div className="section-header">
                    <h2>Analytics Dashboard</h2>
                    <p>Compliance analytics and insights</p>
                  </div>

                <div className="analytics-grid">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="metric-content">
                      <h3>1,247</h3>
                      <p>Total Users</p>
                      <span className="metric-change positive">+12%</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="metric-content">
                      <h3>89</h3>
                      <p>Assessments Today</p>
                      <span className="metric-change positive">+8%</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="metric-content">
                      <h3>156</h3>
                      <p>Reports Generated</p>
                      <span className="metric-change positive">+15%</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="metric-content">
                      <h3>92%</h3>
                      <p>Compliance Rate</p>
                      <span className="metric-change positive">+5%</span>
                    </div>
                  </div>
                </div>

                <div className="charts-section">
                  <div className="chart-card">
                    <h3>Compliance Trends</h3>
                    <div className="simple-chart">
                      <div className="chart-bars">
                        <div className="bar" style={{height: '60%'}}></div>
                        <div className="bar" style={{height: '75%'}}></div>
                        <div className="bar" style={{height: '80%'}}></div>
                        <div className="bar" style={{height: '85%'}}></div>
                        <div className="bar" style={{height: '90%'}}></div>
                        <div className="bar" style={{height: '92%'}}></div>
                      </div>
                      <div className="chart-labels">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Assessment Types</h3>
                    <div className="pie-chart">
                      <div className="pie-slice gdpr" style={{transform: 'rotate(0deg)'}}></div>
                      <div className="pie-slice hipaa" style={{transform: 'rotate(120deg)'}}></div>
                      <div className="pie-slice iso" style={{transform: 'rotate(240deg)'}}></div>
                      <div className="pie-center">
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-dot gdpr"></span>
                        <span>GDPR (45%)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot hipaa"></span>
                        <span>HIPAA (35%)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot iso"></span>
                        <span>ISO (20%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Risk Assessment</h3>
                    <div className="risk-chart">
                      <div className="risk-item high">
                        <span className="risk-label">High Risk</span>
                        <div className="risk-bar">
                          <div className="risk-fill" style={{width: '15%'}}></div>
                        </div>
                        <span className="risk-count">23</span>
                      </div>
                      <div className="risk-item medium">
                        <span className="risk-label">Medium Risk</span>
                        <div className="risk-bar">
                          <div className="risk-fill" style={{width: '35%'}}></div>
                        </div>
                        <span className="risk-count">67</span>
                      </div>
                      <div className="risk-item low">
                        <span className="risk-label">Low Risk</span>
                        <div className="risk-bar">
                          <div className="risk-fill" style={{width: '50%'}}></div>
                        </div>
                        <span className="risk-count">98</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>User Activity</h3>
                    <div className="activity-chart">
                      <div className="activity-bars">
                        <div className="activity-bar" style={{height: '40%'}}>
                          <span className="bar-value">40</span>
                        </div>
                        <div className="activity-bar" style={{height: '60%'}}>
                          <span className="bar-value">60</span>
                        </div>
                        <div className="activity-bar" style={{height: '80%'}}>
                          <span className="bar-value">80</span>
                        </div>
                        <div className="activity-bar" style={{height: '70%'}}>
                          <span className="bar-value">70</span>
                        </div>
                        <div className="activity-bar" style={{height: '90%'}}>
                          <span className="bar-value">90</span>
                        </div>
                        <div className="activity-bar" style={{height: '85%'}}>
                          <span className="bar-value">85</span>
                        </div>
                        <div className="activity-bar" style={{height: '95%'}}>
                          <span className="bar-value">95</span>
                        </div>
                      </div>
                      <div className="activity-labels">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Compliance Score Distribution</h3>
                    <div className="distribution-chart">
                      <div className="distribution-item">
                        <span className="score-range">90-100%</span>
                        <div className="score-bar">
                          <div className="score-fill excellent" style={{width: '25%'}}></div>
                        </div>
                        <span className="score-count">45</span>
                      </div>
                      <div className="distribution-item">
                        <span className="score-range">80-89%</span>
                        <div className="score-bar">
                          <div className="score-fill good" style={{width: '35%'}}></div>
                        </div>
                        <span className="score-count">62</span>
                      </div>
                      <div className="distribution-item">
                        <span className="score-range">70-79%</span>
                        <div className="score-bar">
                          <div className="score-fill average" style={{width: '25%'}}></div>
                        </div>
                        <span className="score-count">38</span>
                      </div>
                      <div className="distribution-item">
                        <span className="score-range">60-69%</span>
                        <div className="score-bar">
                          <div className="score-fill poor" style={{width: '15%'}}></div>
                        </div>
                        <span className="score-count">18</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Geographic Distribution</h3>
                    <div className="geo-chart">
                      <div className="geo-item">
                        <span className="geo-country">🇺🇸 USA</span>
                        <div className="geo-bar">
                          <div className="geo-fill" style={{width: '40%'}}></div>
                        </div>
                        <span className="geo-count">156</span>
                      </div>
                      <div className="geo-item">
                        <span className="geo-country">🇪🇺 Europe</span>
                        <div className="geo-bar">
                          <div className="geo-fill" style={{width: '35%'}}></div>
                        </div>
                        <span className="geo-count">134</span>
                      </div>
                      <div className="geo-item">
                        <span className="geo-country">🇨🇦 Canada</span>
                        <div className="geo-bar">
                          <div className="geo-fill" style={{width: '20%'}}></div>
                        </div>
                        <span className="geo-count">78</span>
                      </div>
                      <div className="geo-item">
                        <span className="geo-country">🌏 Asia</span>
                        <div className="geo-bar">
                          <div className="geo-fill" style={{width: '15%'}}></div>
                        </div>
                        <span className="geo-count">45</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="additional-charts">
                  <div className="chart-card">
                    <h3>Performance Metrics</h3>
                    <div className="performance-grid">
                      <div className="perf-item">
                        <span className="perf-label">Response Time</span>
                        <div className="perf-value">2.3s</div>
                        <div className="perf-bar">
                          <div className="perf-fill" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="perf-item">
                        <span className="perf-label">Uptime</span>
                        <div className="perf-value">99.9%</div>
                        <div className="perf-bar">
                          <div className="perf-fill" style={{width: '99%'}}></div>
                        </div>
                      </div>
                      <div className="perf-item">
                        <span className="perf-label">Error Rate</span>
                        <div className="perf-value">0.1%</div>
                        <div className="perf-bar">
                          <div className="perf-fill" style={{width: '95%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Data Processing</h3>
                    <div className="processing-stats">
                      <div className="stat-item">
                        <div className="stat-icon">
                          <i className="fas fa-database"></i>
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">2.4M</div>
                          <div className="stat-label">Records Processed</div>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">
                          <i className="fas fa-sync"></i>
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">156</div>
                          <div className="stat-label">Sync Operations</div>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                          <div className="stat-value">45ms</div>
                          <div className="stat-label">Avg Processing Time</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>System Health</h3>
                    <div className="health-metrics">
                      <div className="health-item">
                        <span className="health-label">CPU Usage</span>
                        <div className="health-bar">
                          <div className="health-fill cpu" style={{width: '65%'}}></div>
                        </div>
                        <span className="health-value">65%</span>
                      </div>
                      <div className="health-item">
                        <span className="health-label">Memory</span>
                        <div className="health-bar">
                          <div className="health-fill memory" style={{width: '78%'}}></div>
                        </div>
                        <span className="health-value">78%</span>
                      </div>
                      <div className="health-item">
                        <span className="health-label">Storage</span>
                        <div className="health-bar">
                          <div className="health-fill storage" style={{width: '42%'}}></div>
                        </div>
                        <span className="health-value">42%</span>
                      </div>
                      <div className="health-item">
                        <span className="health-label">Network</span>
                        <div className="health-bar">
                          <div className="health-fill network" style={{width: '89%'}}></div>
                        </div>
                        <span className="health-value">89%</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>API Usage</h3>
                    <div className="api-stats">
                      <div className="api-item">
                        <div className="api-endpoint">/api/assessments</div>
                        <div className="api-usage">
                          <div className="api-bar">
                            <div className="api-fill" style={{width: '85%'}}></div>
                          </div>
                          <span className="api-count">1,247 calls</span>
                        </div>
                      </div>
                      <div className="api-item">
                        <div className="api-endpoint">/api/reports</div>
                        <div className="api-usage">
                          <div className="api-bar">
                            <div className="api-fill" style={{width: '72%'}}></div>
                          </div>
                          <span className="api-count">892 calls</span>
                        </div>
                      </div>
                      <div className="api-item">
                        <div className="api-endpoint">/api/users</div>
                        <div className="api-usage">
                          <div className="api-bar">
                            <div className="api-fill" style={{width: '58%'}}></div>
                          </div>
                          <span className="api-count">634 calls</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Real-time Monitoring</h3>
                    <div className="monitoring-grid">
                      <div className="monitor-item">
                        <div className="monitor-label">Active Sessions</div>
                        <div className="monitor-value">247</div>
                        <div className="monitor-indicator online"></div>
                      </div>
                      <div className="monitor-item">
                        <div className="monitor-label">Queue Length</div>
                        <div className="monitor-value">12</div>
                        <div className="monitor-indicator warning"></div>
                      </div>
                      <div className="monitor-item">
                        <div className="monitor-label">Throughput</div>
                        <div className="monitor-value">1.2K/min</div>
                        <div className="monitor-indicator online"></div>
                      </div>
                      <div className="monitor-item">
                        <div className="monitor-label">Errors</div>
                        <div className="monitor-value">3</div>
                        <div className="monitor-indicator error"></div>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Data Flow</h3>
                    <div className="flow-diagram">
                      <div className="flow-step">
                        <div className="flow-icon">
                          <i className="fas fa-upload"></i>
                        </div>
                        <div className="flow-label">Data Input</div>
                        <div className="flow-value">2.4M</div>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <div className="flow-icon">
                          <i className="fas fa-cogs"></i>
                        </div>
                        <div className="flow-label">Processing</div>
                        <div className="flow-value">1.8M</div>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <div className="flow-icon">
                          <i className="fas fa-download"></i>
                        </div>
                        <div className="flow-label">Output</div>
                        <div className="flow-value">1.6M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </>
          )}

          {activeTab === 'Tasks' && (
            <div className="tasks-section">
              <div className="section-header">
                <h2>User History & Tasks</h2>
                <p>Track your completed quizzes and received reports</p>
              </div>

              <div className="history-stats">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>{userHistory.completedQuizzes.length}</h3>
                    <p>Quizzes Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-content">
                    <h3>{userHistory.receivedReports.length}</h3>
                    <p>Reports Received</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>{userHistory.totalPoints}</h3>
                    <p>Total Points</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <h3>{userHistory.lastActivity}</h3>
                    <p>Last Activity</p>
                  </div>
                </div>
              </div>

              <div className="history-content">
                <div className="history-section">
                  <div className="section-title">
                    <h3>Completed Quizzes</h3>
                    <span className="count-badge">{userHistory.completedQuizzes.length}</span>
                  </div>
                  <div className="quiz-list">
                    {userHistory.completedQuizzes.map((quiz) => (
                      <div key={quiz.id} className="quiz-item">
                        <div className="quiz-info">
                          <h4>{quiz.title}</h4>
                          <p className="quiz-category">{quiz.category}</p>
                          <div className="quiz-meta">
                            <span className="quiz-date">Completed: {quiz.completedDate}</span>
                            <span className="quiz-questions">{quiz.totalQuestions} questions</span>
                          </div>
                        </div>
                        <div className="quiz-score">
                          <div className="score-circle">
                            <span className="score-value">{quiz.score}%</span>
                          </div>
                          <div className="score-details">
                            <span className="points">+{quiz.points} pts</span>
                            <div className="score-bar">
                              <div 
                                className="score-fill" 
                                style={{width: `${quiz.score}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="quiz-actions">
                          <button className="action-btn view-btn">View Details</button>
                          <button className="action-btn retake-btn">Retake</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="history-section">
                  <div className="section-title">
                    <h3>Received Reports</h3>
                    <span className="count-badge">{userHistory.receivedReports.length}</span>
                  </div>
                  <div className="reports-list">
                    {userHistory.receivedReports.map((report) => (
                      <div key={report.id} className="report-item">
                        <div className="report-info">
                          <h4>{report.title}</h4>
                          <p className="report-expert">by {report.expert}</p>
                          <div className="report-meta">
                            <span className="report-date">Received: {report.receivedDate}</span>
                            <span className="report-type">{report.type}</span>
                          </div>
                        </div>
                        <div className="report-status">
                          <span className={`status-badge ${report.status.toLowerCase().replace(' ', '-')}`}>
                            {report.status}
                          </span>
                          <div className="report-points">+{report.points} pts</div>
                        </div>
                        <div className="report-actions">
                          <button className="action-btn download-btn">Download</button>
                          <button className="action-btn view-btn">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'GapAnalysis' && (
            <div className="gap-analysis-section">
              <div className="section-header">
                <h2>Gap Analysis Dashboard</h2>
                <p>Comprehensive compliance gap analysis and risk monitoring</p>
              </div>

              {/* Overall Score and Key Metrics */}
              <div className="overall-metrics">
                <div className="overall-score-card">
                  <div className="score-circle-large">
                    <span className="score-value-large">{gapAnalysis.overallScore}%</span>
                    <span className="score-label">Overall Compliance</span>
                  </div>
                  <div className="score-details">
                    <div className="score-trend">
                      <span className="trend-indicator positive">↗</span>
                      <span className="trend-text">+3% from last week</span>
                    </div>
                  </div>
                </div>
                
                <div className="key-metrics-grid">
                  {gapAnalysis.riskMetrics.map((metric) => (
                    <div key={metric.id} className={`metric-card ${metric.status}`}>
                      <div className="metric-header">
                        <h4>{metric.metric}</h4>
                        <span className={`status-indicator ${metric.status}`}></span>
                      </div>
                      <div className="metric-value">
                        <span className="value">{metric.currentValue}</span>
                        <span className="unit">{metric.unit}</span>
                      </div>
                      <div className="metric-threshold">
                        <span>Threshold: {metric.threshold}{metric.unit}</span>
                      </div>
                      <div className="metric-trend">
                        <span className={`trend-arrow ${metric.trend}`}>
                          {metric.trend === 'increasing' ? '↗' : metric.trend === 'decreasing' ? '↘' : '→'}
                        </span>
                        <span className="trend-text">{metric.trend}</span>
                      </div>
                      <div className="mini-chart">
                        <div className="mini-chart-container">
                          {metric.miniChart.map((value, index) => (
                            <div
                              key={index}
                              className="mini-chart-bar"
                              style={{
                                height: `${(value / Math.max(...metric.miniChart)) * 100}%`,
                                backgroundColor: metric.status === 'good' ? '#10b981' : '#f59e0b'
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="mini-chart-labels">
                          <span>7d</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="alerts-section">
                <div className="section-title">
                  <h3>Critical Alerts</h3>
                  <span className="alert-count">{gapAnalysis.criticalAlerts.length}</span>
                </div>
                <div className="alerts-list">
                  {gapAnalysis.criticalAlerts.map((alert) => (
                    <div key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
                      <div className="alert-icon">
                        {alert.type === 'Critical' ? '🚨' : alert.type === 'High' ? '⚠️' : 'ℹ️'}
                      </div>
                      <div className="alert-content">
                        <h4>{alert.title}</h4>
                        <p>{alert.description}</p>
                        <div className="alert-meta">
                          <span className="alert-time">{alert.timestamp}</span>
                          <span className="alert-action">{alert.action}</span>
                        </div>
                      </div>
                      <div className="alert-actions">
                        <button className="action-btn urgent-btn">Take Action</button>
                      </div>
                      <div className="alert-mini-chart">
                        <div className="mini-chart-container">
                          {alert.miniChart.map((value, index) => (
                            <div
                              key={index}
                              className="mini-chart-bar"
                              style={{
                                height: `${(value / 100) * 100}%`,
                                backgroundColor: alert.type === 'Critical' ? '#ef4444' : 
                                               alert.type === 'High' ? '#f59e0b' : '#3b82f6'
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="mini-chart-labels">
                          <span>7d trend</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Gaps Grid */}
              <div className="gaps-section">
                <div className="section-title">
                  <h3>Compliance Gaps</h3>
                  <div className="gaps-summary">
                    <span className="total-gaps">{gapAnalysis.complianceGaps.length} Total Gaps</span>
                    <span className="critical-gaps">
                      {gapAnalysis.complianceGaps.filter(gap => gap.priority === 'Critical').length} Critical
                    </span>
                  </div>
                </div>
                <div className="gaps-grid">
                  {gapAnalysis.complianceGaps.map((gap) => (
                    <div key={gap.id} className={`gap-card ${gap.priority.toLowerCase()}`}>
                      <div className="gap-header">
                        <div className="gap-category">{gap.category}</div>
                        <div className={`priority-badge ${gap.priority.toLowerCase()}`}>
                          {gap.priority}
                        </div>
                      </div>
                      <h4 className="gap-title">{gap.title}</h4>
                      <p className="gap-description">{gap.description}</p>
                      
                      <div className="gap-progress">
                        <div className="progress-labels">
                          <span>Current: {gap.currentLevel}%</span>
                          <span>Target: {gap.targetLevel}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill current" 
                            style={{width: `${gap.currentLevel}%`}}
                          ></div>
                          <div 
                            className="progress-fill target" 
                            style={{width: `${gap.targetLevel}%`}}
                          ></div>
                        </div>
                        <div className="gap-amount">
                          Gap: {gap.gap}%
                        </div>
                      </div>

                      <div className="gap-meta">
                        <div className="gap-status">
                          <span className={`status-badge ${gap.status.toLowerCase().replace(' ', '-')}`}>
                            {gap.status}
                          </span>
                        </div>
                        <div className="gap-updated">
                          Updated: {gap.lastUpdated}
                        </div>
                      </div>

                      <div className="gap-actions">
                        <button className="action-btn view-btn">View Details</button>
                        <button className="action-btn plan-btn">Create Plan</button>
                      </div>
                      <div className="gap-mini-chart">
                        <div className="mini-chart-container">
                          {gap.miniChart.map((value, index) => (
                            <div
                              key={index}
                              className="mini-chart-line"
                              style={{
                                height: `${(value / 100) * 100}%`,
                                backgroundColor: gap.priority === 'Critical' ? '#ef4444' : 
                                               gap.priority === 'High' ? '#f59e0b' : 
                                               gap.priority === 'Medium' ? '#3b82f6' : '#10b981'
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="mini-chart-labels">
                          <span>7d trend</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Trends Chart */}
              <div className="trends-section">
                <div className="section-title">
                  <h3>Performance Trends</h3>
                  <span className="trend-period">Last 7 Days</span>
                </div>
                <div className="trends-chart">
                  <div className="chart-container">
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color compliance"></span>
                        <span>Compliance Score</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color risk"></span>
                        <span>Risk Level</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color training"></span>
                        <span>Training Progress</span>
                      </div>
                    </div>
                    <div className="chart-area">
                      <div className="chart-grid">
                        {Array.from({length: 7}, (_, i) => (
                          <div key={i} className="grid-line"></div>
                        ))}
                      </div>
                      <div className="chart-lines">
                        <div className="chart-line compliance">
                          {gapAnalysis.performanceTrends.map((point, index) => (
                            <div 
                              key={index}
                              className="chart-point"
                              style={{
                                left: `${(index / (gapAnalysis.performanceTrends.length - 1)) * 100}%`,
                                bottom: `${point.compliance}%`
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="chart-line risk">
                          {gapAnalysis.performanceTrends.map((point, index) => (
                            <div 
                              key={index}
                              className="chart-point"
                              style={{
                                left: `${(index / (gapAnalysis.performanceTrends.length - 1)) * 100}%`,
                                bottom: `${point.risk * 4}%`
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="chart-line training">
                          {gapAnalysis.performanceTrends.map((point, index) => (
                            <div 
                              key={index}
                              className="chart-point"
                              style={{
                                left: `${(index / (gapAnalysis.performanceTrends.length - 1)) * 100}%`,
                                bottom: `${point.training}%`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ProcessSteps' && (
            <div className="process-steps-section">
              <div className="section-header">
                <h2>Compliance Process Steps</h2>
                <p>Follow these steps to complete your compliance journey</p>
              </div>

              {/* Progress Indicator */}
              <div className="progress-indicator">
                <div className="progress-line">
                  {processSteps.steps.map((step, index) => (
                    <div key={step.id} className="progress-step">
                      <div className={`step-circle ${step.status}`}>
                        {step.status === 'completed' ? '✓' : step.id}
                      </div>
                      {index < processSteps.steps.length - 1 && (
                        <div className={`progress-connector ${step.status === 'completed' ? 'completed' : ''}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Steps Cards */}
              <div className="process-cards">
                {processSteps.steps.map((step) => (
                  <div key={step.id} className={`process-card ${step.status}`}>
                    <div className="card-header">
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-number">STEP {step.id}</div>
                    </div>
                    <div className="card-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                      {step.completedDate && (
                        <div className="completion-date">
                          Completed: {step.completedDate}
                        </div>
                      )}
                    </div>
                    <div className="card-footer">
                      <div className={`status-badge ${step.status}`}>
                        {step.status === 'completed' ? 'Completed' : 
                         step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </div>
                      {step.status === 'in-progress' && (
                        <button className="action-btn continue-btn">Continue</button>
                      )}
                      {step.status === 'pending' && (
                        <button className="action-btn start-btn" disabled>Start</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Process Summary */}
              <div className="process-summary">
                <div className="summary-card">
                  <h3>Process Overview</h3>
                  <div className="summary-stats">
                    <div className="stat-item">
                      <span className="stat-number">{processSteps.steps.filter(s => s.status === 'completed').length}</span>
                      <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{processSteps.steps.filter(s => s.status === 'in-progress').length}</span>
                      <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{processSteps.steps.filter(s => s.status === 'pending').length}</span>
                      <span className="stat-label">Pending</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${(processSteps.steps.filter(s => s.status === 'completed').length / processSteps.steps.length) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
