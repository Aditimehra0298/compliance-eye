# Compliance Eye Django Backend

A comprehensive Django REST API backend for the Compliance Eye application, featuring MySQL database integration, compliance assessment management, and Power BI analytics integration.

## Features

- **Compliance Framework Management**: Support for EU, USA, ISO, and IEC compliance standards
- **Assessment System**: Dynamic quiz system with customizable scoring (2, 4, 5.5, 8 points per option)
- **Document Management**: File upload and management for compliance documents
- **Report Generation**: Automated report generation with recommendations
- **Analytics Integration**: Power BI and Snowflake integration for real-time analytics
- **User Management**: Extended user profiles with role-based access
- **REST API**: Comprehensive API endpoints for frontend integration

## Prerequisites

- Python 3.8+
- MySQL 8.0+
- pip (Python package manager)

## Quick Setup

1. **Clone and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Run the automated setup script**:
   ```bash
   python setup_mysql.py
   ```

3. **Configure your .env file** (if not already done):
   ```bash
   cp env_example.txt .env
   # Edit .env with your MySQL credentials
   ```

4. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

## Manual Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure MySQL Database

1. Create a MySQL database:
   ```sql
   CREATE DATABASE compliance_eye CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Create a MySQL user (optional):
   ```sql
   CREATE USER 'compliance_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON compliance_eye.* TO 'compliance_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 3. Configure Environment Variables

Create a `.env` file from the template:
```bash
cp env_example.txt .env
```

Edit `.env` with your MySQL credentials:
```env
MYSQL_DATABASE=compliance_eye
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_HOST=localhost
MYSQL_PORT=3306
```

### 4. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Populate Sample Data

```bash
python manage.py populate_sample_data
```

### 7. Start Development Server

```bash
python manage.py runserver
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Compliance Frameworks
- `GET /api/frameworks/` - List all frameworks
- `GET /api/frameworks/{id}/standards/` - Get standards for a framework
- `GET /api/standards/` - List all standards
- `GET /api/standards/{id}/questions/` - Get questions for a standard

### Assessments
- `GET /api/assessments/` - List user's assessments
- `POST /api/assessments/` - Create new assessment
- `POST /api/assessments/{id}/submit_response/` - Submit question response
- `POST /api/assessments/{id}/complete/` - Complete assessment

### Documents
- `GET /api/documents/` - List user's documents
- `POST /api/documents/` - Upload document
- `DELETE /api/documents/{id}/` - Delete document

### Reports
- `GET /api/reports/` - List user's reports

### Analytics
- `GET /api/analytics/` - List user's analytics data
- `GET /api/analytics/dashboard_metrics/` - Get dashboard metrics

### Contact
- `POST /api/contacts/` - Submit contact form

## Database Models

### Core Models
- **ComplianceFramework**: Compliance frameworks (EU, USA, ISO, IEC)
- **ComplianceStandard**: Specific standards within frameworks
- **UserProfile**: Extended user profile with company and role information
- **Assessment**: User assessments with scoring and status tracking
- **Question**: Assessment questions with multiple choice options
- **QuestionOption**: Answer options with point values (2, 4, 5.5, 8)
- **AssessmentResponse**: User responses to assessment questions
- **Document**: Uploaded compliance documents
- **Report**: Generated compliance reports with recommendations
- **AnalyticsData**: Analytics metrics for Power BI integration
- **ContactSubmission**: Contact form submissions

## Scoring System

The assessment system uses a custom scoring mechanism:
- **Option A**: 2 points (Not implemented or ad-hoc)
- **Option B**: 4 points (Partially implemented with basic controls)
- **Option C**: 5.5 points (Well implemented with good practices)
- **Option D**: 8 points (Fully implemented with best practices)

Total score is calculated as a percentage of maximum possible points.

## Sample Data

The `populate_sample_data` management command creates:
- 4 compliance frameworks (EU, USA, ISO, IEC)
- 7 compliance standards (ISO 27001, GDPR, HIPAA, etc.)
- 30 ISO 27001 questions with 4 options each
- Demo user account (demo/demo123)
- Admin user account (admin/admin123)

## Admin Interface

Access the Django admin interface at `http://localhost:8000/admin/`:
- **Username**: admin
- **Password**: admin123

## Development

### Running Tests
```bash
python manage.py test
```

### Creating Migrations
```bash
python manage.py makemigrations
```

### Applying Migrations
```bash
python manage.py migrate
```

### Collecting Static Files
```bash
python manage.py collectstatic
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in settings
2. Configure proper MySQL credentials
3. Set up static file serving
4. Configure CORS settings for your domain
5. Use a production WSGI server (e.g., Gunicorn)
6. Set up reverse proxy (e.g., Nginx)

## API Documentation

The API uses Django REST Framework with automatic API documentation available at:
- `http://localhost:8000/api/` - Browseable API interface

## Troubleshooting

### Common Issues

1. **MySQL Connection Error**: Ensure MySQL is running and credentials are correct
2. **Migration Errors**: Run `python manage.py migrate --fake-initial` if needed
3. **Permission Errors**: Ensure MySQL user has proper privileges
4. **Import Errors**: Ensure all dependencies are installed

### Logs

Check the Django logs in `backend.log` for detailed error information.

## Support

For issues and questions, please check the Django documentation or create an issue in the project repository.
