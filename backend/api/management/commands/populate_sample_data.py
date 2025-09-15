from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import (
    ComplianceFramework, ComplianceStandard, UserProfile, Question, QuestionOption
)

class Command(BaseCommand):
    help = 'Populate database with sample compliance data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample compliance data...')
        
        # Create compliance frameworks
        frameworks_data = [
            {
                'name': 'EU Compliance',
                'description': 'European Union compliance frameworks including GDPR, DSA, and other EU regulations',
                'category': 'EU'
            },
            {
                'name': 'USA Compliance',
                'description': 'United States compliance frameworks including HIPAA, SOX, and other US regulations',
                'category': 'USA'
            },
            {
                'name': 'ISO Standards',
                'description': 'International Organization for Standardization standards for information security and quality management',
                'category': 'ISO'
            },
            {
                'name': 'IEC Standards',
                'description': 'International Electrotechnical Commission standards for electrical and electronic technologies',
                'category': 'IEC'
            }
        ]
        
        frameworks = {}
        for framework_data in frameworks_data:
            framework, created = ComplianceFramework.objects.get_or_create(
                name=framework_data['name'],
                defaults=framework_data
            )
            frameworks[framework_data['name']] = framework
            if created:
                self.stdout.write(f'Created framework: {framework.name}')
        
        # Create compliance standards
        standards_data = [
            # ISO Standards
            {
                'framework': 'ISO Standards',
                'name': 'ISO 27001',
                'description': 'Information Security Management System (ISMS) standard',
                'version': '2022'
            },
            {
                'framework': 'ISO Standards',
                'name': 'ISO 27002',
                'description': 'Code of practice for information security controls',
                'version': '2022'
            },
            {
                'framework': 'ISO Standards',
                'name': 'ISO 9001',
                'description': 'Quality Management System standard',
                'version': '2015'
            },
            # EU Compliance
            {
                'framework': 'EU Compliance',
                'name': 'GDPR',
                'description': 'General Data Protection Regulation',
                'version': '2018'
            },
            {
                'framework': 'EU Compliance',
                'name': 'DSA',
                'description': 'Digital Services Act',
                'version': '2022'
            },
            # USA Compliance
            {
                'framework': 'USA Compliance',
                'name': 'HIPAA',
                'description': 'Health Insurance Portability and Accountability Act',
                'version': '2013'
            },
            {
                'framework': 'USA Compliance',
                'name': 'SOX',
                'description': 'Sarbanes-Oxley Act',
                'version': '2002'
            }
        ]
        
        standards = {}
        for standard_data in standards_data:
            framework = frameworks[standard_data['framework']]
            standard, created = ComplianceStandard.objects.get_or_create(
                framework=framework,
                name=standard_data['name'],
                defaults=standard_data
            )
            standards[standard_data['name']] = standard
            if created:
                self.stdout.write(f'Created standard: {standard.name}')
        
        # Create ISO 27001 questions
        iso27001_questions = [
            {
                'question_text': 'Information Security Policy - Does your organization have a documented information security policy that is approved by management and communicated to all relevant personnel?',
                'question_number': 1
            },
            {
                'question_text': 'Organization of Information Security - Is there a clear organizational structure for information security with defined roles and responsibilities?',
                'question_number': 2
            },
            {
                'question_text': 'Human Resource Security - Are there security procedures in place for hiring, training, and termination of employees?',
                'question_number': 3
            },
            {
                'question_text': 'Asset Management - Is there a comprehensive inventory of information assets with appropriate classification and handling procedures?',
                'question_number': 4
            },
            {
                'question_text': 'Access Control - Are there robust access control mechanisms to ensure only authorized personnel can access information systems?',
                'question_number': 5
            },
            {
                'question_text': 'Cryptography - Are cryptographic controls properly implemented to protect sensitive information?',
                'question_number': 6
            },
            {
                'question_text': 'Physical and Environmental Security - Are physical security controls in place to protect information processing facilities?',
                'question_number': 7
            },
            {
                'question_text': 'Operations Security - Are there procedures for secure operations, including change management and capacity planning?',
                'question_number': 8
            },
            {
                'question_text': 'Communications Security - Are network security controls implemented to protect information in transit?',
                'question_number': 9
            },
            {
                'question_text': 'System Acquisition, Development and Maintenance - Are security requirements integrated into system development lifecycle?',
                'question_number': 10
            },
            {
                'question_text': 'Supplier Relationships - Are there security requirements and monitoring procedures for suppliers and third parties?',
                'question_number': 11
            },
            {
                'question_text': 'Information Security Incident Management - Is there a formal incident management process for security incidents?',
                'question_number': 12
            },
            {
                'question_text': 'Information Security Aspects of Business Continuity Management - Are there business continuity plans that include information security considerations?',
                'question_number': 13
            },
            {
                'question_text': 'Compliance - Are there procedures to ensure compliance with legal, regulatory, and contractual requirements?',
                'question_number': 14
            },
            {
                'question_text': 'Risk Assessment - Is there a systematic approach to identifying, analyzing, and evaluating information security risks?',
                'question_number': 15
            },
            {
                'question_text': 'Risk Treatment - Are there risk treatment plans with appropriate security controls to address identified risks?',
                'question_number': 16
            },
            {
                'question_text': 'Security Objectives and Planning - Are information security objectives established and aligned with business objectives?',
                'question_number': 17
            },
            {
                'question_text': 'Management of Information Security Incidents and Improvements - Is there a process for managing security incidents and implementing improvements?',
                'question_number': 18
            },
            {
                'question_text': 'Monitoring, Measurement, Analysis and Evaluation - Are there procedures for monitoring and measuring the effectiveness of the ISMS?',
                'question_number': 19
            },
            {
                'question_text': 'Internal Audit - Is there a regular internal audit program to assess the effectiveness of the ISMS?',
                'question_number': 20
            },
            {
                'question_text': 'Management Review - Does top management regularly review the ISMS for its continuing suitability and effectiveness?',
                'question_number': 21
            },
            {
                'question_text': 'Corrective Actions - Are there procedures for taking corrective actions when non-conformities are identified?',
                'question_number': 22
            },
            {
                'question_text': 'Continual Improvement - Is there a process for continual improvement of the ISMS?',
                'question_number': 23
            },
            {
                'question_text': 'Documented Information - Is the ISMS properly documented with appropriate controls for document management?',
                'question_number': 24
            },
            {
                'question_text': 'Control of Documented Information - Are there procedures for creating, updating, and controlling documented information?',
                'question_number': 25
            },
            {
                'question_text': 'Leadership and Commitment - Does top management demonstrate leadership and commitment to the ISMS?',
                'question_number': 26
            },
            {
                'question_text': 'Policy - Is there a clear information security policy that is appropriate to the organization?',
                'question_number': 27
            },
            {
                'question_text': 'Organizational Roles, Responsibilities and Authorities - Are roles, responsibilities, and authorities clearly defined and communicated?',
                'question_number': 28
            },
            {
                'question_text': 'Planning - Is there adequate planning for the ISMS including risk assessment and risk treatment?',
                'question_number': 29
            },
            {
                'question_text': 'Support - Are adequate resources provided to support the ISMS including human resources, infrastructure, and environment?',
                'question_number': 30
            }
        ]
        
        iso27001_standard = standards['ISO 27001']
        
        for question_data in iso27001_questions:
            question, created = Question.objects.get_or_create(
                standard=iso27001_standard,
                question_number=question_data['question_number'],
                defaults=question_data
            )
            
            if created:
                self.stdout.write(f'Created question {question.question_number}: {question.question_text[:50]}...')
                
                # Create options for each question
                options_data = [
                    {'option_text': 'Not implemented or ad-hoc', 'option_letter': 'A', 'points': 2.0, 'order': 1},
                    {'option_text': 'Partially implemented with basic controls', 'option_letter': 'B', 'points': 4.0, 'order': 2},
                    {'option_text': 'Well implemented with good practices', 'option_letter': 'C', 'points': 5.5, 'order': 3},
                    {'option_text': 'Fully implemented with best practices', 'option_letter': 'D', 'points': 8.0, 'order': 4}
                ]
                
                for option_data in options_data:
                    QuestionOption.objects.create(
                        question=question,
                        **option_data
                    )
        
        # Create demo user
        demo_user, created = User.objects.get_or_create(
            username='demo',
            defaults={
                'email': 'demo@complianceeye.com',
                'first_name': 'Demo',
                'last_name': 'User'
            }
        )
        
        if created:
            demo_user.set_password('demo123')
            demo_user.save()
            self.stdout.write('Created demo user: demo/demo123')
        
        # Create user profile
        profile, created = UserProfile.objects.get_or_create(
            user=demo_user,
            defaults={
                'company': 'Demo Company',
                'industry': 'Technology',
                'role': 'compliance_officer'
            }
        )
        
        if created:
            self.stdout.write('Created demo user profile')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample data!')
        )
