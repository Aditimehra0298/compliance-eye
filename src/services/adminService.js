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
        },
        {
          id: 3,
          name: 'USA Compliance',
          description: 'United States compliance frameworks and regulations',
          category: 'USA',
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          standards: []
        },
        {
          id: 4,
          name: 'IEC Standards',
          description: 'International Electrotechnical Commission standards',
          category: 'IEC',
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
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
        // EU Compliance Standards
        {
          id: 1,
          name: 'GDPR (General Data Protection Regulation)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Comprehensive data protection regulation governing the processing of personal data within the EU and EEA.',
          version: '2016/679'
        },
        {
          id: 2,
          name: 'Corporate Sustainability Due Diligence Directive (CSRD)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'EU directive requiring companies to conduct due diligence on environmental and human rights impacts.',
          version: '2023'
        },
        {
          id: 3,
          name: 'EU Deforestation Regulation (EUDR)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Regulation preventing products linked to deforestation from entering the EU market.',
          version: '2023/1115'
        },
        {
          id: 4,
          name: 'Batteries Regulation',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Regulation establishing requirements for the sustainability and safety of batteries and waste batteries.',
          version: '2023/1542'
        },
        {
          id: 5,
          name: 'Product Safety Regulation',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Comprehensive regulation ensuring product safety and consumer protection across the EU.',
          version: '2023/988'
        },
        {
          id: 6,
          name: 'AI Act',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'First comprehensive AI regulation establishing rules for artificial intelligence systems.',
          version: '2024/573'
        },
        {
          id: 7,
          name: 'Digital Services Act (DSA)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Regulation establishing obligations for digital service providers and online platforms.',
          version: '2022/2065'
        },
        {
          id: 8,
          name: 'Digital Markets Act (DMA)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Regulation ensuring fair and open digital markets by regulating gatekeeper platforms.',
          version: '2022/1925'
        },
        {
          id: 9,
          name: 'Fluorinated Gases Regulation',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Regulation controlling fluorinated greenhouse gases to reduce emissions and combat climate change.',
          version: '2023'
        },
        {
          id: 10,
          name: 'Union Customs Code (UCC)',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Comprehensive customs legislation governing customs procedures and controls in the EU.',
          version: '2023'
        },
        {
          id: 11,
          name: 'Whistleblower Protection Directive',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Directive protecting individuals who report breaches of EU law from retaliation.',
          version: '2019/1937'
        },
        {
          id: 12,
          name: 'Anti-Money Laundering Directives',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Directives preventing money laundering and terrorist financing in the financial sector.',
          version: '2023'
        },
        {
          id: 13,
          name: 'Transparent Working Conditions Directive',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Directive ensuring transparent and predictable working conditions for workers.',
          version: '2019/1152'
        },
        {
          id: 14,
          name: 'REACH Regulation',
          framework: { name: 'EU Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          description: 'Comprehensive regulation on chemicals and their safe use.',
          version: '2023'
        },

        // USA Compliance Standards
        {
          id: 15,
          name: 'HIPAA (Health Insurance Portability and Accountability Act)',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'Federal law protecting the privacy and security of health information in the US.',
          version: '2013'
        },
        {
          id: 16,
          name: 'SOX (Sarbanes-Oxley Act)',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'Federal law establishing requirements for public company accounting and financial reporting.',
          version: '2002'
        },
        {
          id: 17,
          name: 'CCPA (California Consumer Privacy Act) / CPRA',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'California state law providing comprehensive privacy rights and consumer protection.',
          version: '2023'
        },
        {
          id: 18,
          name: 'FISMA (Federal Information Security Management Act)',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'Federal law requiring federal agencies to develop information security programs.',
          version: '2014'
        },
        {
          id: 19,
          name: 'PCI DSS (Payment Card Industry Data Security Standard)',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'Security standards for organizations that handle credit card information.',
          version: '2018'
        },
        {
          id: 20,
          name: 'OSHA Regulations',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'Federal regulations ensuring safe and healthful working conditions.',
          version: '2023'
        },
        {
          id: 21,
          name: 'Various State Data Privacy and Employment Laws',
          framework: { name: 'USA Compliance' },
          questions: [],
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          description: 'State-specific laws governing data privacy, employment, and consumer protection.',
          version: '2024'
        },

        // ISO Standards
        {
          id: 22,
          name: 'ISO 9001 (Quality Management Systems)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for quality management systems, helping organizations improve efficiency.',
          version: '2015'
        },
        {
          id: 23,
          name: 'ISO/IEC 27001 (Information Security Management Systems)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for information security management systems and controls.',
          version: '2022'
        },
        {
          id: 24,
          name: 'ISO 14001 (Environmental Management Systems)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for environmental management systems and sustainability.',
          version: '2015'
        },
        {
          id: 25,
          name: 'ISO 45001 (Occupational Health and Safety)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for occupational health and safety management systems.',
          version: '2018'
        },
        {
          id: 26,
          name: 'ISO 20000 (IT Service Management)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for IT service management and service delivery.',
          version: '2018'
        },
        {
          id: 27,
          name: 'ISO 50001 (Energy Management)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for energy management systems and energy efficiency.',
          version: '2018'
        },
        {
          id: 28,
          name: 'ISO 22000 (Food Safety Management)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for food safety management systems in the food chain.',
          version: '2018'
        },
        {
          id: 29,
          name: 'ISO 31000 (Risk Management)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard providing principles and guidelines for risk management.',
          version: '2018'
        },
        {
          id: 30,
          name: 'ISO 22301 (Business Continuity Management)',
          framework: { name: 'ISO Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          description: 'International standard for business continuity management systems.',
          version: '2019'
        },

        // IEC Standards
        {
          id: 31,
          name: 'IEC 60364 (Electrical Installations)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for electrical installations in buildings and structures.',
          version: '2018'
        },
        {
          id: 32,
          name: 'IEC 61508 (Functional Safety of Electrical/Electronic Systems)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for functional safety of electrical/electronic systems.',
          version: '2010'
        },
        {
          id: 33,
          name: 'IEC 62443 (Industrial Automation and Control Systems Cybersecurity)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for cybersecurity in industrial automation and control systems.',
          version: '2018'
        },
        {
          id: 34,
          name: 'IEC 60601-1-2 (Electromagnetic Compatibility of Medical Electrical Equipment)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for electromagnetic compatibility of medical electrical equipment.',
          version: '2014'
        },
        {
          id: 35,
          name: 'IEC 61000 Series (Electromagnetic Compatibility - EMC)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'Comprehensive series of standards for electromagnetic compatibility and interference.',
          version: '2019'
        },
        {
          id: 36,
          name: 'IEC 61511 (Safety Instrumented Systems for Process Industries)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for safety instrumented systems in process industries.',
          version: '2016'
        },
        {
          id: 37,
          name: 'IEC 62061 (Safety of Machinery - Functional Safety)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for functional safety of machinery and safety-related systems.',
          version: '2021'
        },
        {
          id: 38,
          name: 'IEC 62304 (Medical Device Software Lifecycle Processes)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for medical device software lifecycle processes.',
          version: '2006'
        },
        {
          id: 39,
          name: 'IEC 60204 (Electrical Equipment of Machines)',
          framework: { name: 'IEC Standards' },
          questions: [],
          is_active: true,
          created_at: '2024-01-04T00:00:00Z',
          description: 'International standard for electrical equipment of machines and safety requirements.',
          version: '2018'
        }
      ];
    }
  }

  // Get quiz assessments with questions
  async getQuizAssessmentsData() {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz-assessments/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch quiz assessments data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching quiz assessments data:', error);
      // Return mock data for development
      return [
        {
          id: 1,
          standard: 'ISO 27001',
          framework: 'ISO Standards',
          status: 'ready',
          total_questions: 30,
          questions: [
            {
              id: 1,
              question_number: 1,
              question_text: 'Information Security Policy - Does your organization have a documented information security policy that is approved by management and communicated to all relevant personnel?',
              options: [
                { letter: 'A', text: 'No documented policy', points: 2 },
                { letter: 'B', text: 'Basic policy exists but not fully implemented', points: 4 },
                { letter: 'C', text: 'Well implemented with good practices', points: 5.5 },
                { letter: 'D', text: 'Excellent implementation with continuous improvement', points: 8 }
              ]
            },
            {
              id: 2,
              question_number: 2,
              question_text: 'Organization of Information Security - Is there a clear organizational structure for information security with defined roles and responsibilities?',
              options: [
                { letter: 'A', text: 'No clear structure', points: 2 },
                { letter: 'B', text: 'Basic structure exists', points: 4 },
                { letter: 'C', text: 'Well-defined structure with clear roles', points: 5.5 },
                { letter: 'D', text: 'Excellent structure with regular reviews', points: 8 }
              ]
            },
            {
              id: 3,
              question_number: 3,
              question_text: 'Human Resource Security - Are there security procedures in place for hiring, training, and termination of employees?',
              options: [
                { letter: 'A', text: 'No formal procedures', points: 2 },
                { letter: 'B', text: 'Basic procedures exist', points: 4 },
                { letter: 'C', text: 'Comprehensive procedures implemented', points: 5.5 },
                { letter: 'D', text: 'Excellent procedures with regular updates', points: 8 }
              ]
            }
          ],
          created_at: '2024-01-01T00:00:00Z',
          last_updated: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          standard: 'GDPR',
          framework: 'EU Compliance',
          status: 'ready',
          total_questions: 25,
          questions: [
            {
              id: 1,
              question_number: 1,
              question_text: 'Data Protection by Design - Does your organization implement data protection principles from the design stage of any processing activity?',
              options: [
                { letter: 'A', text: 'No implementation', points: 2 },
                { letter: 'B', text: 'Basic implementation', points: 4 },
                { letter: 'C', text: 'Good implementation', points: 5.5 },
                { letter: 'D', text: 'Excellent implementation', points: 8 }
              ]
            },
            {
              id: 2,
              question_number: 2,
              question_text: 'Consent Management - Do you have proper mechanisms for obtaining, recording, and managing user consent?',
              options: [
                { letter: 'A', text: 'No consent mechanisms', points: 2 },
                { letter: 'B', text: 'Basic consent collection', points: 4 },
                { letter: 'C', text: 'Comprehensive consent management', points: 5.5 },
                { letter: 'D', text: 'Advanced consent management with tracking', points: 8 }
              ]
            }
          ],
          created_at: '2024-01-02T00:00:00Z',
          last_updated: '2024-01-16T14:20:00Z'
        },
        {
          id: 3,
          standard: 'HIPAA',
          framework: 'USA Compliance',
          status: 'ready',
          total_questions: 20,
          questions: [
            {
              id: 1,
              question_number: 1,
              question_text: 'Administrative Safeguards - Do you have administrative policies and procedures to protect health information?',
              options: [
                { letter: 'A', text: 'No administrative safeguards', points: 2 },
                { letter: 'B', text: 'Basic policies exist', points: 4 },
                { letter: 'C', text: 'Comprehensive administrative safeguards', points: 5.5 },
                { letter: 'D', text: 'Excellent safeguards with regular audits', points: 8 }
              ]
            }
          ],
          created_at: '2024-01-03T00:00:00Z',
          last_updated: '2024-01-17T09:15:00Z'
        },
        {
          id: 4,
          standard: 'IEC 62443',
          framework: 'IEC Standards',
          status: 'in_progress',
          total_questions: 15,
          questions: [
            {
              id: 1,
              question_number: 1,
              question_text: 'Industrial Network Security - Do you have proper network segmentation and security controls for industrial systems?',
              options: [
                { letter: 'A', text: 'No network security measures', points: 2 },
                { letter: 'B', text: 'Basic network protection', points: 4 },
                { letter: 'C', text: 'Good network security implementation', points: 5.5 },
                { letter: 'D', text: 'Excellent network security with monitoring', points: 8 }
              ]
            }
          ],
          created_at: '2024-01-04T00:00:00Z',
          last_updated: '2024-01-18T16:45:00Z'
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
