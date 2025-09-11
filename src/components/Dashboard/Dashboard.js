import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ComplianceSelector from '../ComplianceSelector/ComplianceSelector';
import PersonalizedReports from '../PersonalizedReports/PersonalizedReports';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');
  const [assessmentData, setAssessmentData] = useState(null);
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';

  // Check for assessment data from quiz
  useEffect(() => {
    if (location.state?.showPersonalizedReports && location.state?.assessmentData) {
      setAssessmentData(location.state.assessmentData);
      setActiveTab('Products'); // Switch to Products tab to show personalized reports
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
              <a href="#" className={`nav-link ${activeTab === 'Products' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleTabChange('Products'); }}>Products</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Tasks</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Features</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Users</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Pricing</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Integrations</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Settings</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Utility pages</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Webflow pages</a>
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
              {/* Simple Analytics Section */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
