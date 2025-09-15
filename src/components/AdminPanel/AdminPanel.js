import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import adminService from '../../services/adminService';

// Admin Login Component
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onLogin(credentials);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Panel</h1>
          <p>Compliance Eye Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
              placeholder="Enter admin username"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              placeholder="Enter admin password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Default credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [standards, setStandards] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [systemSettings, setSystemSettings] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    totalUsers: 0,
    activeAssessments: 0,
    completedAssessments: 0,
    averageScore: 0,
    location: 'Unknown',
    systemHealth: 'Good',
    lastBackup: null,
    storageUsed: '2.3 GB'
  });

  // Form states
  const [showAddFramework, setShowAddFramework] = useState(false);
  const [showAddStandard, setShowAddStandard] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(false);
  const [showQuestionWorkflow, setShowQuestionWorkflow] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [workflowStep, setWorkflowStep] = useState('framework'); // 'framework', 'standard', 'questions'

  // Form data
  const [frameworkForm, setFrameworkForm] = useState({
    name: '',
    description: '',
    category: 'CUSTOM'
  });

  const [standardForm, setStandardForm] = useState({
    name: '',
    description: '',
    version: '1.0',
    framework: ''
  });

  const [questionsForm, setQuestionsForm] = useState({
    questions: []
  });

  // Workflow form data
  const [workflowData, setWorkflowData] = useState({
    framework: null,
    standard: null,
    questions: []
  });

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Load all admin data
  const loadAllData = async () => {
    try {
      const [metricsData, usersData, assessmentsData, standardsData, frameworksData] = await Promise.all([
        adminService.getRealTimeMetrics(),
        adminService.getAllUsersData(),
        adminService.getAssessmentsData(),
        adminService.getStandardsData(),
        adminService.getFrameworksData()
      ]);
      
      setRealTimeData({
        totalUsers: metricsData.total_users,
        activeAssessments: metricsData.active_assessments,
        completedAssessments: metricsData.completed_assessments,
        averageScore: metricsData.average_score,
        location: await getCurrentLocation(),
        systemHealth: 'Good',
        lastBackup: new Date().toISOString(),
        storageUsed: '2.3 GB'
      });
      setUsers(usersData);
      setAssessments(assessmentsData);
      setStandards(standardsData);
      setFrameworks(frameworksData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  // Load real-time data
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadRealTimeData = async () => {
      try {
        const data = await adminService.getRealTimeMetrics();
        setRealTimeData(prev => ({
          ...prev,
          totalUsers: data.total_users,
          activeAssessments: data.active_assessments,
          completedAssessments: data.completed_assessments,
          averageScore: data.average_score,
          location: await getCurrentLocation()
        }));
      } catch (error) {
        console.error('Error loading real-time data:', error);
      }
    };

    loadRealTimeData();
    const interval = setInterval(loadRealTimeData, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

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

  // Load frameworks data
  useEffect(() => {
    const loadFrameworksData = async () => {
      try {
        const data = await adminService.getFrameworksData();
        setFrameworks(data);
      } catch (error) {
        console.error('Error loading frameworks data:', error);
      }
    };

    loadFrameworksData();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const location = await adminService.getCurrentLocation();
      return `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`;
    } catch (error) {
      return 'Location unavailable';
    }
  };

  // Form handlers
  const handleAddFramework = async (e) => {
    e.preventDefault();
    try {
      await adminService.addFramework(frameworkForm);
      setFrameworkForm({ name: '', description: '', category: 'CUSTOM' });
      setShowAddFramework(false);
      // Reload frameworks
      const data = await adminService.getFrameworksData();
      setFrameworks(data);
    } catch (error) {
      console.error('Error adding framework:', error);
    }
  };

  const handleAddStandard = async (e) => {
    e.preventDefault();
    try {
      await adminService.addStandard(standardForm);
      setStandardForm({ name: '', description: '', version: '1.0', framework: '' });
      setShowAddStandard(false);
      // Reload standards
      const data = await adminService.getStandardsData();
      setStandards(data);
    } catch (error) {
      console.error('Error adding standard:', error);
    }
  };

  const handleAddQuestions = async (e) => {
    e.preventDefault();
    try {
      await adminService.addQuestions(selectedStandard.id, questionsForm.questions);
      setQuestionsForm({ questions: [] });
      setShowAddQuestions(false);
      // Reload standards
      const data = await adminService.getStandardsData();
      setStandards(data);
    } catch (error) {
      console.error('Error adding questions:', error);
    }
  };

  const addQuestion = () => {
    setQuestionsForm(prev => ({
      questions: [...prev.questions, {
        question_text: '',
        question_number: prev.questions.length + 1,
        options: [
          { option_text: '', option_letter: 'A', points: 2.0, order: 1 },
          { option_text: '', option_letter: 'B', points: 4.0, order: 2 },
          { option_text: '', option_letter: 'C', points: 5.5, order: 3 },
          { option_text: '', option_letter: 'D', points: 8.0, order: 4 }
        ]
      }]
    }));
  };

  const updateQuestion = (index, field, value) => {
    setQuestionsForm(prev => ({
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateOption = (questionIndex, optionIndex, field, value) => {
    setQuestionsForm(prev => ({
      questions: prev.questions.map((q, qi) => 
        qi === questionIndex ? {
          ...q,
          options: q.options.map((opt, oi) => 
            oi === optionIndex ? { ...opt, [field]: value } : opt
          )
        } : q
      )
    }));
  };

  const removeQuestion = (index) => {
    setQuestionsForm(prev => ({
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  // Workflow handlers
  const startQuestionWorkflow = () => {
    setShowQuestionWorkflow(true);
    setWorkflowStep('framework');
    setWorkflowData({ framework: null, standard: null, questions: [] });
  };

  const handleFrameworkSelection = (framework) => {
    setWorkflowData(prev => ({ ...prev, framework }));
    setWorkflowStep('standard');
  };

  const handleCreateFramework = async (frameworkData) => {
    try {
      const newFramework = await adminService.addFramework(frameworkData);
      setWorkflowData(prev => ({ ...prev, framework: newFramework }));
      setWorkflowStep('standard');
      // Reload frameworks
      const data = await adminService.getFrameworksData();
      setFrameworks(data);
    } catch (error) {
      console.error('Error creating framework:', error);
    }
  };

  const handleStandardSelection = (standard) => {
    setWorkflowData(prev => ({ ...prev, standard }));
    setWorkflowStep('questions');
  };

  const handleCreateStandard = async (standardData) => {
    try {
      const newStandard = await adminService.addStandard({
        ...standardData,
        framework: workflowData.framework.id
      });
      setWorkflowData(prev => ({ ...prev, standard: newStandard }));
      setWorkflowStep('questions');
      // Reload standards
      const data = await adminService.getStandardsData();
      setStandards(data);
    } catch (error) {
      console.error('Error creating standard:', error);
    }
  };

  const handleWorkflowQuestionsSubmit = async () => {
    try {
      await adminService.addQuestions(workflowData.standard.id, workflowData.questions);
      setWorkflowData({ framework: null, standard: null, questions: [] });
      setShowQuestionWorkflow(false);
      setWorkflowStep('framework');
      // Reload standards
      const data = await adminService.getStandardsData();
      setStandards(data);
    } catch (error) {
      console.error('Error adding questions:', error);
    }
  };

  const addWorkflowQuestion = () => {
    setWorkflowData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        question_text: '',
        question_number: prev.questions.length + 1,
        options: [
          { option_text: '', option_letter: 'A', points: 2.0, order: 1 },
          { option_text: '', option_letter: 'B', points: 4.0, order: 2 },
          { option_text: '', option_letter: 'C', points: 5.5, order: 3 },
          { option_text: '', option_letter: 'D', points: 8.0, order: 4 }
        ]
      }]
    }));
  };

  const updateWorkflowQuestion = (index, field, value) => {
    setWorkflowData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateWorkflowOption = (questionIndex, optionIndex, field, value) => {
    setWorkflowData(prev => ({
      ...prev,
      questions: prev.questions.map((q, qi) => 
        qi === questionIndex ? {
          ...q,
          options: q.options.map((opt, oi) => 
            oi === optionIndex ? { ...opt, [field]: value } : opt
          )
        } : q
      )
    }));
  };

  const removeWorkflowQuestion = (index) => {
    setWorkflowData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  // Authentication handlers
  const handleLogin = async (credentials) => {
    try {
      const response = await adminService.adminLogin(credentials);
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      loadAllData();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Enhanced dashboard functions
  const getSystemHealthColor = (health) => {
    switch (health) {
      case 'Good': return '#10b981';
      case 'Warning': return '#f59e0b';
      case 'Critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  // Authentication component
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }


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

  const renderFrameworks = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Compliance Frameworks</h2>
        <button className="add-btn" onClick={() => setShowAddFramework(true)}>+ Add Framework</button>
      </div>
      
      <div className="frameworks-grid">
        {frameworks.map(framework => (
          <div key={framework.id} className="framework-card">
            <div className="framework-header">
              <h3>{framework.name}</h3>
              <span className={`status-indicator ${framework.is_active ? 'active' : 'inactive'}`}>
                {framework.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="framework-info">
              <p><strong>Category:</strong> {framework.category}</p>
              <p><strong>Description:</strong> {framework.description}</p>
              <p><strong>Standards:</strong> {framework.standards?.length || 0}</p>
              <p><strong>Created:</strong> {new Date(framework.created_at).toLocaleDateString()}</p>
            </div>
            <div className="framework-actions">
              <button className="action-btn">Edit</button>
              <button className="action-btn" onClick={() => {
                setSelectedFramework(framework);
                setActiveTab('standards');
              }}>View Standards</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Framework Modal */}
      {showAddFramework && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Framework</h3>
              <button className="close-btn" onClick={() => setShowAddFramework(false)}>×</button>
            </div>
            <form onSubmit={handleAddFramework} className="modal-form">
              <div className="form-group">
                <label>Framework Name</label>
                <input
                  type="text"
                  value={frameworkForm.name}
                  onChange={(e) => setFrameworkForm({...frameworkForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={frameworkForm.description}
                  onChange={(e) => setFrameworkForm({...frameworkForm, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={frameworkForm.category}
                  onChange={(e) => setFrameworkForm({...frameworkForm, category: e.target.value})}
                >
                  <option value="EU">EU Compliance</option>
                  <option value="USA">USA Compliance</option>
                  <option value="ISO">ISO Standards</option>
                  <option value="IEC">IEC Standards</option>
                  <option value="CUSTOM">Custom</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddFramework(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Add Framework</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderStandards = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Compliance Standards</h2>
        <div className="header-actions">
          <button className="workflow-btn" onClick={startQuestionWorkflow}>
            📝 Add Questions Workflow
          </button>
          <button className="add-btn" onClick={() => setShowAddStandard(true)}>+ Add Standard</button>
        </div>
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
              <button className="action-btn" onClick={() => {
                setSelectedStandard(standard);
                setShowAddQuestions(true);
              }}>Add Questions</button>
              <button className="action-btn">Deactivate</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Standard Modal */}
      {showAddStandard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Standard</h3>
              <button className="close-btn" onClick={() => setShowAddStandard(false)}>×</button>
            </div>
            <form onSubmit={handleAddStandard} className="modal-form">
              <div className="form-group">
                <label>Standard Name</label>
                <input
                  type="text"
                  value={standardForm.name}
                  onChange={(e) => setStandardForm({...standardForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={standardForm.description}
                  onChange={(e) => setStandardForm({...standardForm, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Version</label>
                <input
                  type="text"
                  value={standardForm.version}
                  onChange={(e) => setStandardForm({...standardForm, version: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Framework</label>
                <select
                  value={standardForm.framework}
                  onChange={(e) => setStandardForm({...standardForm, framework: e.target.value})}
                  required
                >
                  <option value="">Select Framework</option>
                  {frameworks.map(framework => (
                    <option key={framework.id} value={framework.id}>{framework.name}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddStandard(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Add Standard</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Questions Modal */}
      {showAddQuestions && selectedStandard && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3>Add Questions to {selectedStandard.name}</h3>
              <button className="close-btn" onClick={() => setShowAddQuestions(false)}>×</button>
            </div>
            <form onSubmit={handleAddQuestions} className="modal-form">
              <div className="questions-container">
                {questionsForm.questions.map((question, index) => (
                  <div key={index} className="question-card">
                    <div className="question-header">
                      <h4>Question {question.question_number}</h4>
                      <button type="button" className="remove-btn" onClick={() => removeQuestion(index)}>Remove</button>
                    </div>
                    <div className="form-group">
                      <label>Question Text</label>
                      <textarea
                        value={question.question_text}
                        onChange={(e) => updateQuestion(index, 'question_text', e.target.value)}
                        required
                        rows="3"
                      />
                    </div>
                    <div className="options-container">
                      <h5>Answer Options</h5>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-row">
                          <div className="option-letter">{option.option_letter}</div>
                          <input
                            type="text"
                            value={option.option_text}
                            onChange={(e) => updateOption(index, optionIndex, 'option_text', e.target.value)}
                            placeholder={`Option ${option.option_letter}`}
                            required
                          />
                          <input
                            type="number"
                            value={option.points}
                            onChange={(e) => updateOption(index, optionIndex, 'points', parseFloat(e.target.value))}
                            step="0.1"
                            min="0"
                            max="10"
                          />
                          <span className="points-label">points</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="button" className="add-question-btn" onClick={addQuestion}>
                  + Add Question
                </button>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddQuestions(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Add Questions</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
            className={`nav-item ${activeTab === 'frameworks' ? 'active' : ''}`}
            onClick={() => setActiveTab('frameworks')}
          >
            <span className="nav-icon">🏗️</span>
            <span>Frameworks</span>
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
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'assessments' && renderAssessments()}
          {activeTab === 'frameworks' && renderFrameworks()}
          {activeTab === 'standards' && renderStandards()}
          {activeTab === 'individual' && renderIndividualData()}
        </div>
      </div>

      {/* Question Workflow Modal */}
      {showQuestionWorkflow && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3>Add Questions Workflow</h3>
              <button className="close-btn" onClick={() => setShowQuestionWorkflow(false)}>×</button>
            </div>
            
            <div className="workflow-container">
              {/* Step 1: Framework Selection */}
              {workflowStep === 'framework' && (
                <div className="workflow-step">
                  <div className="step-header">
                    <h4>Step 1: Select or Create Framework</h4>
                    <p>Choose an existing compliance framework or create a new one</p>
                  </div>
                  
                  <div className="framework-selection">
                    <h5>Existing Frameworks:</h5>
                    <div className="framework-list">
                      {frameworks.map(framework => (
                        <div 
                          key={framework.id} 
                          className={`framework-item ${workflowData.framework?.id === framework.id ? 'selected' : ''}`}
                          onClick={() => handleFrameworkSelection(framework)}
                        >
                          <div className="framework-info">
                            <h6>{framework.name}</h6>
                            <p>{framework.description}</p>
                            <span className="category-badge">{framework.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="divider">
                      <span>OR</span>
                    </div>
                    
                    <h5>Create New Framework:</h5>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateFramework(frameworkForm);
                    }} className="workflow-form">
                      <div className="form-group">
                        <label>Framework Name</label>
                        <input
                          type="text"
                          value={frameworkForm.name}
                          onChange={(e) => setFrameworkForm({...frameworkForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={frameworkForm.description}
                          onChange={(e) => setFrameworkForm({...frameworkForm, description: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={frameworkForm.category}
                          onChange={(e) => setFrameworkForm({...frameworkForm, category: e.target.value})}
                        >
                          <option value="EU">EU Compliance</option>
                          <option value="USA">USA Compliance</option>
                          <option value="ISO">ISO Standards</option>
                          <option value="IEC">IEC Standards</option>
                          <option value="CUSTOM">Custom</option>
                        </select>
                      </div>
                      <button type="submit" className="submit-btn">Create Framework</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 2: Standard Selection */}
              {workflowStep === 'standard' && (
                <div className="workflow-step">
                  <div className="step-header">
                    <h4>Step 2: Select or Create Standard</h4>
                    <p>Choose a standard under {workflowData.framework?.name} or create a new one</p>
                  </div>
                  
                  <div className="standard-selection">
                    <h5>Existing Standards:</h5>
                    <div className="standard-list">
                      {standards.filter(s => s.framework?.id === workflowData.framework?.id).map(standard => (
                        <div 
                          key={standard.id} 
                          className={`standard-item ${workflowData.standard?.id === standard.id ? 'selected' : ''}`}
                          onClick={() => handleStandardSelection(standard)}
                        >
                          <div className="standard-info">
                            <h6>{standard.name}</h6>
                            <p>{standard.description}</p>
                            <span className="version-badge">v{standard.version}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="divider">
                      <span>OR</span>
                    </div>
                    
                    <h5>Create New Standard:</h5>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateStandard(standardForm);
                    }} className="workflow-form">
                      <div className="form-group">
                        <label>Standard Name</label>
                        <input
                          type="text"
                          value={standardForm.name}
                          onChange={(e) => setStandardForm({...standardForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={standardForm.description}
                          onChange={(e) => setStandardForm({...standardForm, description: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Version</label>
                        <input
                          type="text"
                          value={standardForm.version}
                          onChange={(e) => setStandardForm({...standardForm, version: e.target.value})}
                          required
                        />
                      </div>
                      <button type="submit" className="submit-btn">Create Standard</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 3: Questions */}
              {workflowStep === 'questions' && (
                <div className="workflow-step">
                  <div className="step-header">
                    <h4>Step 3: Add Questions</h4>
                    <p>Add questions for {workflowData.standard?.name} under {workflowData.framework?.name}</p>
                  </div>
                  
                  <div className="questions-container">
                    {workflowData.questions.map((question, index) => (
                      <div key={index} className="question-card">
                        <div className="question-header">
                          <h4>Question {question.question_number}</h4>
                          <button type="button" className="remove-btn" onClick={() => removeWorkflowQuestion(index)}>Remove</button>
                        </div>
                        <div className="form-group">
                          <label>Question Text</label>
                          <textarea
                            value={question.question_text}
                            onChange={(e) => updateWorkflowQuestion(index, 'question_text', e.target.value)}
                            required
                            rows="3"
                          />
                        </div>
                        <div className="options-container">
                          <h5>Answer Options</h5>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="option-row">
                              <div className="option-letter">{option.option_letter}</div>
                              <input
                                type="text"
                                value={option.option_text}
                                onChange={(e) => updateWorkflowOption(index, optionIndex, 'option_text', e.target.value)}
                                placeholder={`Option ${option.option_letter}`}
                                required
                              />
                              <input
                                type="number"
                                value={option.points}
                                onChange={(e) => updateWorkflowOption(index, optionIndex, 'points', parseFloat(e.target.value))}
                                step="0.1"
                                min="0"
                                max="10"
                              />
                              <span className="points-label">points</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button type="button" className="add-question-btn" onClick={addWorkflowQuestion}>
                      + Add Question
                    </button>
                  </div>
                  
                  <div className="workflow-actions">
                    <button type="button" className="back-btn" onClick={() => setWorkflowStep('standard')}>
                      ← Back to Standards
                    </button>
                    <button type="button" className="submit-btn" onClick={handleWorkflowQuestionsSubmit}>
                      Complete Workflow
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
