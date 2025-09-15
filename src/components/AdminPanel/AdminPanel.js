import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import adminService from '../../services/adminService';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [standards, setStandards] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    totalUsers: 0,
    activeAssessments: 0,
    completedAssessments: 0,
    averageScore: 0,
    location: 'Unknown'
  });

  // Load real-time data
  useEffect(() => {
    const loadRealTimeData = async () => {
      try {
        const data = await adminService.getRealTimeMetrics();
        setRealTimeData({
          totalUsers: data.total_users,
          activeAssessments: data.active_assessments,
          completedAssessments: data.completed_assessments,
          averageScore: data.average_score,
          location: await getCurrentLocation()
        });
      } catch (error) {
        console.error('Error loading real-time data:', error);
      }
    };

    loadRealTimeData();
    
    // Update every 5 seconds
    const interval = setInterval(loadRealTimeData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load users data
  useEffect(() => {
    const loadUsersData = async () => {
      try {
        const data = await adminService.getAllUsersData();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users data:', error);
      }
    };

    loadUsersData();
  }, []);

  // Load assessments data
  useEffect(() => {
    const loadAssessmentsData = async () => {
      try {
        const data = await adminService.getAssessmentsData();
        setAssessments(data);
      } catch (error) {
        console.error('Error loading assessments data:', error);
      }
    };

    loadAssessmentsData();
  }, []);

  // Load standards data
  useEffect(() => {
    const loadStandardsData = async () => {
      try {
        const data = await adminService.getStandardsData();
        setStandards(data);
      } catch (error) {
        console.error('Error loading standards data:', error);
      }
    };

    loadStandardsData();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const location = await adminService.getCurrentLocation();
      return `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`;
    } catch (error) {
      return 'Location unavailable';
    }
  };


  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="location-indicator">
          <span className="location-icon">📍</span>
          <span>{realTimeData.location}</span>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Total Users</h3>
            <div className="metric-value">{realTimeData.totalUsers}</div>
            <div className="metric-change">+12% from last month</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Active Assessments</h3>
            <div className="metric-value">{realTimeData.activeAssessments}</div>
            <div className="metric-change">+5% from yesterday</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>Completed</h3>
            <div className="metric-value">{realTimeData.completedAssessments}</div>
            <div className="metric-change">+8% from last week</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>Average Score</h3>
            <div className="metric-value">{realTimeData.averageScore}%</div>
            <div className="metric-change">+3% improvement</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Assessment Completion Rate</h3>
          <div className="donut-chart">
            <div className="donut-segment segment-1">45%</div>
            <div className="donut-segment segment-2">30%</div>
            <div className="donut-segment segment-3">25%</div>
          </div>
        </div>

        <div className="chart-container">
          <h3>Score Distribution</h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: '60%' }}>60%</div>
            <div className="bar" style={{ height: '80%' }}>80%</div>
            <div className="bar" style={{ height: '45%' }}>45%</div>
            <div className="bar" style={{ height: '90%' }}>90%</div>
            <div className="bar" style={{ height: '70%' }}>70%</div>
          </div>
        </div>

        <div className="chart-container">
          <h3>User Activity</h3>
          <div className="line-chart">
            <div className="line-point" style={{ left: '10%', top: '20%' }}></div>
            <div className="line-point" style={{ left: '30%', top: '40%' }}></div>
            <div className="line-point" style={{ left: '50%', top: '30%' }}></div>
            <div className="line-point" style={{ left: '70%', top: '60%' }}></div>
            <div className="line-point" style={{ left: '90%', top: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="add-btn">+ Add User</button>
      </div>
      
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {(user.first_name || user.username).charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <p>@{user.username}</p>
              <div className="user-stats">
                <span>Assessments: {user.total_assessments}</span>
                <span>Avg Score: {user.average_score.toFixed(1)}%</span>
              </div>
              <div className="user-location">
                📍 Last login: {new Date(user.last_login).toLocaleString()}
              </div>
            </div>
            <div className="user-actions">
              <button className="action-btn">View Details</button>
              <button className="action-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Assessment Management</h2>
        <button className="add-btn">+ Add Assessment</button>
      </div>
      
      <div className="assessments-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Standard</th>
              <th>Status</th>
              <th>Score</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map(assessment => (
              <tr key={assessment.id}>
                <td>{assessment.user?.username || 'Unknown'}</td>
                <td>{assessment.standard?.name || 'Unknown'}</td>
                <td>
                  <span className={`status-badge ${assessment.status.toLowerCase()}`}>
                    {assessment.status}
                  </span>
                </td>
                <td>{assessment.percentage?.toFixed(1) || 0}%</td>
                <td>{assessment.completed_at ? new Date(assessment.completed_at).toLocaleString() : 'In Progress'}</td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStandards = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Compliance Standards</h2>
        <button className="add-btn">+ Add Standard</button>
      </div>
      
      <div className="standards-grid">
        {standards.map(standard => (
          <div key={standard.id} className="standard-card">
            <div className="standard-header">
              <h3>{standard.name}</h3>
              <span className={`status-indicator ${standard.is_active ? 'active' : 'inactive'}`}>
                {standard.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="standard-info">
              <p><strong>Framework:</strong> {standard.framework?.name || 'Unknown'}</p>
              <p><strong>Questions:</strong> {standard.questions?.length || 0}</p>
              <p><strong>Created:</strong> {new Date(standard.created_at).toLocaleDateString()}</p>
            </div>
            <div className="standard-actions">
              <button className="action-btn">Edit</button>
              <button className="action-btn">Questions</button>
              <button className="action-btn">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIndividualData = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Individual User Data</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search users..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>
      
      <div className="individual-data-grid">
        {users.map(user => (
          <div key={user.id} className="individual-card">
            <div className="individual-header">
              <div className="user-avatar">{(user.first_name || user.username).charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.email}</p>
                <p>@{user.username}</p>
              </div>
              <div className="user-status">
                <span className="status-online">Online</span>
                <p>Last login: {new Date(user.last_login).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="individual-stats">
              <div className="stat-item">
                <span className="stat-label">Total Assessments</span>
                <span className="stat-value">{user.total_assessments}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Score</span>
                <span className="stat-value">{user.average_score.toFixed(1)}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{user.completed_assessments}</span>
              </div>
            </div>

            <div className="quiz-responses">
              <h4>Recent Quiz Responses</h4>
              {assessments.filter(a => a.user?.username === user.username).map(assessment => (
                <div key={assessment.id} className="response-item">
                  <div className="response-header">
                    <span>{assessment.standard?.name || 'Unknown'}</span>
                    <span className="score">{assessment.percentage?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="response-details">
                    <div className="response-row">
                      <span className="question">Status: {assessment.status}</span>
                      <span className="answer">Completed: {assessment.completed_at ? new Date(assessment.completed_at).toLocaleString() : 'In Progress'}</span>
                      <span className="points">{assessment.percentage?.toFixed(1) || 0}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">L</div>
            <span>Compliance Eye Admin</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">🏠</span>
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon">👥</span>
            <span>Users</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'assessments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assessments')}
          >
            <span className="nav-icon">📊</span>
            <span>Assessments</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'standards' ? 'active' : ''}`}
            onClick={() => setActiveTab('standards')}
          >
            <span className="nav-icon">📋</span>
            <span>Standards</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            <span className="nav-icon">👤</span>
            <span>Individual Data</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="time-widget">
            <div className="time">05:14</div>
            <div className="location">📍 Real-time Location</div>
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div className="header-left">
            <button className="menu-btn">☰</button>
            <h1>Admin Panel</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">🔔</button>
            <div className="user-profile">
              <div className="profile-avatar">A</div>
              <span>Admin User</span>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'assessments' && renderAssessments()}
          {activeTab === 'standards' && renderStandards()}
          {activeTab === 'individual' && renderIndividualData()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
