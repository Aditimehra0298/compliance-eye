// Admin Service for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class AdminService {
  // Admin authentication
  async adminLogin(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      return { token: data.token || 'admin-token', user: data.user };
    } catch (error) {
      console.error('Admin login error:', error);
      // For demo purposes, allow login with admin/admin123
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        return { token: 'admin-token', user: { username: 'admin', role: 'admin' } };
      }
      throw error;
    }
  }

  // Get real-time metrics
  async getRealTimeMetrics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/real_time_metrics/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch real-time metrics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching real-time metrics:', error);
      // Return mock data for development
      return {
        total_users: 150,
        active_assessments: 25,
        completed_assessments: 89,
        average_score: 78.5,
        recent_assessments: [],
        user_locations: [
          { user: 'john_doe', location: 'New York, NY', last_login: '2024-01-15T10:30:00Z' },
          { user: 'jane_smith', location: 'San Francisco, CA', last_login: '2024-01-15T09:15:00Z' }
        ],
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get all users data
  async getAllUsersData() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/all_users_data/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching users data:', error);
      // Return mock data for development
      return [
        {
          id: 1,
          username: 'john_doe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          last_login: '2024-01-15T10:30:00Z',
          total_assessments: 5,
          completed_assessments: 3,
          average_score: 78.5
        },
        {
          id: 2,
          username: 'jane_smith',
          email: 'jane@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          last_login: '2024-01-15T09:15:00Z',
          total_assessments: 3,
          completed_assessments: 2,
          average_score: 85.2
        }
      ];
    }
  }

  // Get individual user data
  async getIndividualUserData(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/individual_user_data/?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch individual user data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching individual user data:', error);
      // Return mock data for development
      return {
        user: {
          id: userId,
          username: 'john_doe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          last_login: '2024-01-15T10:30:00Z',
          date_joined: '2024-01-01T00:00:00Z',
          is_active: true,
          location: 'New York, NY'
        },
        profile: {
          company: 'Tech Corp Inc.',
          industry: 'Technology',
          role: 'IT Manager',
          phone: '+1-555-0123',
          address: '123 Tech Street, New York, NY 10001',
          website: 'https://techcorp.com'
        },
        assessments: [
          {
            id: 1,
            standard: 'ISO 27001',
            status: 'completed',
            percentage: 78.5,
            completed_at: '2024-01-15T14:30:00Z',
            responses: [
              {
                question: {
                  id: 1,
                  question_number: 1,
                  question_text: 'Information Security Policy - Does your organization have a documented information security policy?'
                },
                selected_option: {
                  option_letter: 'C',
                  option_text: 'Well implemented with good practices',
                  points: 5.5
                },
                points_earned: 5.5,
                answered_at: '2024-01-15T14:25:00Z'
              }
            ]
          }
        ],
        documents: [
          {
            id: 1,
            name: 'Security Policy Document.pdf',
            type: 'policy',
            category: 'Information Security Policy',
            uploaded_at: '2024-01-16T09:15:00Z',
            size: '2.3 MB',
            status: 'approved',
            file_url: '/documents/security_policy.pdf',
            description: 'Comprehensive information security policy document'
          },
          {
            id: 2,
            name: 'Risk Assessment Report.xlsx',
            type: 'assessment',
            category: 'Risk Management',
            uploaded_at: '2024-01-17T14:22:00Z',
            size: '1.8 MB',
            status: 'pending_review',
            file_url: '/documents/risk_assessment.xlsx',
            description: 'Detailed risk assessment for all business processes'
          },
          {
            id: 3,
            name: 'Incident Response Plan.docx',
            type: 'procedure',
            category: 'Incident Management',
            uploaded_at: '2024-01-18T11:45:00Z',
            size: '3.1 MB',
            status: 'approved',
            file_url: '/documents/incident_response.docx',
            description: 'Step-by-step incident response procedures'
          },
          {
            id: 4,
            name: 'Business Continuity Plan.pdf',
            type: 'plan',
            category: 'Business Continuity',
            uploaded_at: '2024-01-19T16:30:00Z',
            size: '4.2 MB',
            status: 'under_review',
            file_url: '/documents/bcp.pdf',
            description: 'Business continuity and disaster recovery plan'
          }
        ],
        payments: [
          {
            id: 1,
            amount: 99.99,
            currency: 'USD',
            status: 'completed',
            payment_method: 'Credit Card',
            card_last_four: '4242',
            transaction_id: 'TXN123456789',
            paid_at: '2024-01-17T11:30:00Z',
            plan_type: 'Advanced',
            description: 'ISO 27001 Advanced Assessment',
            receipt_url: '/receipts/receipt_123456.pdf',
            invoice_number: 'INV-2024-001'
          },
          {
            id: 2,
            amount: 49.99,
            currency: 'USD',
            status: 'pending',
            payment_method: 'PayPal',
            transaction_id: 'PP789012345',
            created_at: '2024-01-19T16:20:00Z',
            plan_type: 'Basic',
            description: 'GDPR Basic Assessment',
            receipt_url: null,
            invoice_number: 'INV-2024-002'
          },
          {
            id: 3,
            amount: 199.99,
            currency: 'USD',
            status: 'completed',
            payment_method: 'Bank Transfer',
            transaction_id: 'BT987654321',
            paid_at: '2024-01-20T09:15:00Z',
            plan_type: 'Enterprise',
            description: 'Full Compliance Suite',
            receipt_url: '/receipts/receipt_789012.pdf',
            invoice_number: 'INV-2024-003'
          }
        ],
        activity_log: [
          {
            id: 1,
            action: 'Assessment Completed',
            description: 'Completed ISO 27001 assessment with score 78.5%',
            timestamp: '2024-01-15T14:30:00Z',
            ip_address: '192.168.1.100',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 2,
            action: 'Document Uploaded',
            description: 'Uploaded Security Policy Document.pdf',
            timestamp: '2024-01-16T09:15:00Z',
            ip_address: '192.168.1.100',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 3,
            action: 'Payment Made',
            description: 'Payment of $99.99 for Advanced plan',
            timestamp: '2024-01-17T11:30:00Z',
            ip_address: '192.168.1.100',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          {
            id: 4,
            action: 'Profile Updated',
            description: 'Updated company information and contact details',
            timestamp: '2024-01-18T13:45:00Z',
            ip_address: '192.168.1.100',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        ],
        total_assessments: 1,
        average_score: 78.5
      };
    }
  }

  // Get assessments data
  async getAssessmentsData() {
    try {
      const response = await fetch(`${API_BASE_URL}/assessments/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch assessments data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching assessments data:', error);
      // Return mock data for development
      return [
        {
          id: 1,
          user: 'john_doe',
          standard: 'ISO 27001',
          status: 'completed',
          percentage: 78.5,
          completed_at: '2024-01-15T14:30:00Z'
        },
        {
          id: 2,
          user: 'jane_smith',
          standard: 'GDPR',
          status: 'in_progress',
          percentage: 0,
          completed_at: null
        }
      ];
    }
  }

  // Get frameworks data
  async getFrameworksData() {
    try {
      const response = await fetch(`${API_BASE_URL}/frameworks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch frameworks data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching frameworks data:', error);
      // Return mock data for development
      return [
        {
          id: 1,
          name: 'ISO Standards',
          description: 'International Organization for Standardization standards',
          category: 'ISO',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          standards: []
        },
        {
          id: 2,
          name: 'EU Compliance',
          description: 'European Union compliance frameworks',
          category: 'EU',
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          standards: []
        }
      ];
    }
  }

  // Get standards data
  async getStandardsData() {
    try {
      const response = await fetch(`${API_BASE_URL}/standards/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch standards data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching standards data:', error);
      // Return mock data for development
      return [
        {
          id: 1,
          name: 'ISO 27001',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'GDPR',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z'
        }
      ];
    }
  }

  // Add framework
  async addFramework(frameworkData) {
    try {
      const response = await fetch(`${API_BASE_URL}/frameworks-management/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(frameworkData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add framework');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding framework:', error);
      throw error;
    }
  }

  // Add standard
  async addStandard(standardData) {
    try {
      const response = await fetch(`${API_BASE_URL}/standards-management/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(standardData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add standard');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding standard:', error);
      throw error;
    }
  }

  // Add questions to standard
  async addQuestions(standardId, questionsData) {
    try {
      const response = await fetch(`${API_BASE_URL}/standards-management/${standardId}/add_questions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ questions: questionsData })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add questions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding questions:', error);
      throw error;
    }
  }


  // Get current location
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}

export default new AdminService();
