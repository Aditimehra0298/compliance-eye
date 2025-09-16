from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q, Avg, Count
from django.shortcuts import get_object_or_404
from decimal import Decimal
import json

from .models import (
    ComplianceFramework, ComplianceStandard, UserProfile, Assessment,
    Question, QuestionOption, AssessmentResponse, Document, Report,
    AnalyticsData, ContactSubmission
)
from .serializers import (
    ComplianceFrameworkSerializer, ComplianceStandardSerializer, UserProfileSerializer,
    AssessmentSerializer, QuestionSerializer, AssessmentResponseSerializer,
    DocumentSerializer, ReportSerializer, AnalyticsDataSerializer,
    ContactSubmissionSerializer, AssessmentCreateSerializer,
    AssessmentResponseCreateSerializer, DocumentUploadSerializer,
    SnowflakeDataSerializer
)
from .snowflake_service import SnowflakeService

# Authentication Views
class LoginView(APIView):
    """User login endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return Response({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    }
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """User logout endpoint"""
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

# Compliance Framework Views
class ComplianceFrameworkViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for compliance frameworks"""
    queryset = ComplianceFramework.objects.filter(is_active=True)
    serializer_class = ComplianceFrameworkSerializer
    
    @action(detail=True, methods=['get'])
    def standards(self, request, pk=None):
        """Get standards for a specific framework"""
        framework = self.get_object()
        standards = ComplianceStandard.objects.filter(framework=framework, is_active=True)
        serializer = ComplianceStandardSerializer(standards, many=True)
        return Response(serializer.data)

class ComplianceStandardViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for compliance standards"""
    queryset = ComplianceStandard.objects.filter(is_active=True)
    serializer_class = ComplianceStandardSerializer
    
    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        """Get questions for a specific standard"""
        standard = self.get_object()
        questions = Question.objects.filter(standard=standard, is_active=True)
        serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)

# Assessment Views
class AssessmentViewSet(viewsets.ModelViewSet):
    """ViewSet for assessments"""
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Assessment.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Create a new assessment"""
        serializer = AssessmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            framework = get_object_or_404(ComplianceFramework, id=serializer.validated_data['framework_id'])
            standard = get_object_or_404(ComplianceStandard, id=serializer.validated_data['standard_id'])
            
            assessment = Assessment.objects.create(
                user=request.user,
                framework=framework,
                standard=standard,
                plan_type=serializer.validated_data['plan_type']
            )
            
            # Calculate max score
            questions = Question.objects.filter(standard=standard, is_active=True)
            max_score = sum(option.points for question in questions for option in question.options.all())
            assessment.max_score = max_score
            assessment.save()
            
            return Response(AssessmentSerializer(assessment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def submit_response(self, request, pk=None):
        """Submit a response to an assessment question"""
        assessment = self.get_object()
        serializer = AssessmentResponseCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            question = get_object_or_404(Question, id=serializer.validated_data['question_id'])
            selected_option = get_object_or_404(QuestionOption, id=serializer.validated_data['selected_option_id'])
            
            # Create or update response
            response, created = AssessmentResponse.objects.get_or_create(
                assessment=assessment,
                question=question,
                defaults={
                    'selected_option': selected_option,
                    'points_earned': selected_option.points
                }
            )
            
            if not created:
                response.selected_option = selected_option
                response.points_earned = selected_option.points
                response.save()
            
            # Update assessment score
            total_score = sum(r.points_earned for r in assessment.responses.all())
            assessment.total_score = total_score
            assessment.percentage = (total_score / assessment.max_score * 100) if assessment.max_score > 0 else 0
            assessment.save()
            
            return Response({'message': 'Response submitted successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark assessment as completed"""
        assessment = self.get_object()
        assessment.status = 'completed'
        assessment.completed_at = timezone.now()
        assessment.save()
        
        # Generate report
        self._generate_report(assessment)
        
        return Response({'message': 'Assessment completed successfully'})
    
    def _generate_report(self, assessment):
        """Generate a report for the completed assessment"""
        # Determine compliance level based on percentage
        if assessment.percentage >= 80:
            compliance_level = 'excellent'
            maturity_level = 'advanced'
        elif assessment.percentage >= 60:
            compliance_level = 'good'
            maturity_level = 'intermediate'
        elif assessment.percentage >= 40:
            compliance_level = 'fair'
            maturity_level = 'basic'
        else:
            compliance_level = 'needs_improvement'
            maturity_level = 'basic'
        
        # Generate recommendations based on score
        recommendations = self._generate_recommendations(assessment)
        
        # Create report
        report = Report.objects.create(
            assessment=assessment,
            report_type=assessment.plan_type,
            title=f"{assessment.standard.name} Compliance Report",
            summary=f"Assessment completed with {assessment.percentage}% compliance score.",
            recommendations=recommendations,
            compliance_level=compliance_level,
            risk_score=100 - assessment.percentage,
            maturity_level=maturity_level
        )
        
        # Record analytics data
        AnalyticsData.objects.create(
            user=assessment.user,
            metric_type='compliance_score',
            value=assessment.percentage,
            metadata={'assessment_id': str(assessment.id), 'standard': assessment.standard.name}
        )
    
    def _generate_recommendations(self, assessment):
        """Generate recommendations based on assessment responses"""
        recommendations = []
        
        if assessment.percentage < 60:
            recommendations.extend([
                "Implement basic security controls and policies",
                "Conduct regular security awareness training",
                "Establish incident response procedures",
                "Review and update risk assessment processes"
            ])
        elif assessment.percentage < 80:
            recommendations.extend([
                "Enhance existing security controls",
                "Implement continuous monitoring",
                "Regular security audits and assessments",
                "Staff training and certification programs"
            ])
        else:
            recommendations.extend([
                "Maintain current security posture",
                "Implement advanced threat detection",
                "Regular compliance reviews and updates",
                "Consider advanced security certifications"
            ])
        
        return recommendations

# Document Views
class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for document management"""
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Upload a new document"""
        serializer = DocumentUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = request.FILES['file']
            document = Document.objects.create(
                user=request.user,
                document_type=serializer.validated_data['document_type'],
                file_name=file.name,
                file_path=file,
                file_size=file.size
            )
            return Response(DocumentSerializer(document).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Report Views
class ReportViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for reports"""
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Report.objects.filter(assessment__user=self.request.user)

# Analytics Views
class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for analytics data"""
    serializer_class = AnalyticsDataSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return AnalyticsData.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def dashboard_metrics(self, request):
        """Get dashboard metrics for Power BI integration"""
        user = request.user
        
        # Get user's assessment data
        assessments = Assessment.objects.filter(user=user)
        total_assessments = assessments.count()
        completed_assessments = assessments.filter(status='completed').count()
        avg_score = assessments.aggregate(avg_score=Avg('percentage'))['avg_score'] or 0
        
        # Get document count
        document_count = Document.objects.filter(user=user).count()
        
        # Get recent analytics data
        recent_analytics = AnalyticsData.objects.filter(user=user).order_by('-recorded_at')[:10]
        
        return Response({
            'total_assessments': total_assessments,
            'completed_assessments': completed_assessments,
            'average_score': float(avg_score),
            'document_count': document_count,
            'recent_analytics': AnalyticsDataSerializer(recent_analytics, many=True).data
        })

# Contact Views
class ContactSubmissionViewSet(viewsets.ModelViewSet):
    """ViewSet for contact submissions"""
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        """Create a new contact submission"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Snowflake Integration Views
class SnowflakeDataViewSet(viewsets.ViewSet):
    """ViewSet for Snowflake data integration"""
    permission_classes = [permissions.IsAuthenticated]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.snowflake_service = SnowflakeService()
    
    @action(detail=False, methods=['get'])
    def analytics_data(self, request):
        """Get analytics data from Snowflake for Power BI"""
        data = self.snowflake_service.get_analytics_data()
        if data is not None:
            return Response({
                'data': data,
                'source': 'snowflake',
                'timestamp': timezone.now()
            })
        return Response({'error': 'Unable to fetch data from Snowflake'}, status=500)

# Admin API Views
class AdminDashboardViewSet(viewsets.ViewSet):
    """ViewSet for admin dashboard data"""
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def real_time_metrics(self, request):
        """Get real-time metrics for admin dashboard"""
        from django.db.models import Count, Avg
        from django.contrib.auth.models import User
        
        # Get real-time data
        total_users = User.objects.count()
        active_assessments = Assessment.objects.filter(status='in_progress').count()
        completed_assessments = Assessment.objects.filter(status='completed').count()
        average_score = Assessment.objects.filter(status='completed').aggregate(
            avg_score=Avg('percentage')
        )['avg_score'] or 0
        
        # Get recent activity
        recent_assessments = Assessment.objects.filter(
            status='completed'
        ).order_by('-completed_at')[:10]
        
        # Get user locations (simulated)
        user_locations = [
            {'user': user.username, 'location': 'New York, NY', 'last_login': user.last_login}
            for user in User.objects.all()[:5]
        ]
        
            return Response({
            'total_users': total_users,
            'active_assessments': active_assessments,
            'completed_assessments': completed_assessments,
            'average_score': float(average_score),
            'recent_assessments': AssessmentSerializer(recent_assessments, many=True).data,
            'user_locations': user_locations,
                'timestamp': timezone.now()
            })
    
    @action(detail=False, methods=['get'])
    def individual_user_data(self, request):
        """Get detailed individual user data including quiz responses"""
        user_id = request.query_params.get('user_id')
        
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                assessments = Assessment.objects.filter(user=user)
                
                user_data = {
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'last_login': user.last_login,
                        'date_joined': user.date_joined
                    },
                    'profile': None,
                    'assessments': [],
                    'total_assessments': assessments.count(),
                    'average_score': 0
                }
                
                # Get user profile
                try:
                    profile = user.profile
                    user_data['profile'] = {
                        'company': profile.company,
                        'industry': profile.industry,
                        'role': profile.role,
                        'phone': profile.phone
                    }
                except:
                    pass
                
                # Get assessment details with responses
                for assessment in assessments:
                    assessment_data = AssessmentSerializer(assessment).data
                    responses = AssessmentResponse.objects.filter(assessment=assessment)
                    assessment_data['responses'] = []
                    
                    for response in responses:
                        response_data = {
                            'question': {
                                'id': response.question.id,
                                'question_number': response.question.question_number,
                                'question_text': response.question.question_text
                            },
                            'selected_option': {
                                'option_letter': response.selected_option.option_letter,
                                'option_text': response.selected_option.option_text,
                                'points': float(response.selected_option.points)
                            },
                            'points_earned': float(response.points_earned),
                            'answered_at': response.answered_at
                        }
                        assessment_data['responses'].append(response_data)
                    
                    user_data['assessments'].append(assessment_data)
                
                # Calculate average score
                if assessments.exists():
                    total_score = sum(a.percentage for a in assessments if a.percentage > 0)
                    count = sum(1 for a in assessments if a.percentage > 0)
                    user_data['average_score'] = total_score / count if count > 0 else 0
                
                return Response(user_data)
                
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=404)
        else:
            return Response({'error': 'user_id parameter required'}, status=400)
    
    @action(detail=False, methods=['get'])
    def all_users_data(self, request):
        """Get data for all users"""
        users = User.objects.all()
        users_data = []
        
        for user in users:
            assessments = Assessment.objects.filter(user=user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'last_login': user.last_login,
                'total_assessments': assessments.count(),
                'completed_assessments': assessments.filter(status='completed').count(),
                'average_score': 0
            }
            
            # Calculate average score
            completed_assessments = assessments.filter(status='completed')
            if completed_assessments.exists():
                total_score = sum(a.percentage for a in completed_assessments)
                user_data['average_score'] = total_score / completed_assessments.count()
            
            users_data.append(user_data)
        
        return Response(users_data)
    
    @action(detail=False, methods=['post'])
    def add_standard(self, request):
        """Add new compliance standard from admin panel"""
        framework_name = request.data.get('framework_name')
        standard_name = request.data.get('standard_name')
        description = request.data.get('description', '')
        version = request.data.get('version', '1.0')
        questions_data = request.data.get('questions', [])
        
        if not framework_name or not standard_name:
            return Response({'error': 'framework_name and standard_name required'}, status=400)
        
        try:
            # Get or create framework
            framework, created = ComplianceFramework.objects.get_or_create(
                name=framework_name,
                defaults={
                    'description': f'Framework for {framework_name}',
                    'category': 'CUSTOM'
                }
            )
            
            # Create standard
            standard = ComplianceStandard.objects.create(
                framework=framework,
                name=standard_name,
                description=description,
                version=version
            )
            
            # Create questions
            for question_data in questions_data:
                question = Question.objects.create(
                    standard=standard,
                    question_text=question_data['question_text'],
                    question_number=question_data['question_number']
                )
                
                # Create options
                for option_data in question_data.get('options', []):
                    QuestionOption.objects.create(
                        question=question,
                        option_text=option_data['option_text'],
                        option_letter=option_data['option_letter'],
                        points=option_data['points'],
                        order=option_data.get('order', 1)
                    )
            
            return Response({
                'message': 'Standard created successfully',
                'standard_id': standard.id
            }, status=201)
            
        except Exception as e:
            return Response({'error': str(e)}, status=500)

# Framework Management Views
class ComplianceFrameworkManagementViewSet(viewsets.ModelViewSet):
    """ViewSet for framework management"""
    queryset = ComplianceFramework.objects.all()
    serializer_class = ComplianceFrameworkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Create a new framework"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Standard Management Views
class ComplianceStandardManagementViewSet(viewsets.ModelViewSet):
    """ViewSet for standard management"""
    queryset = ComplianceStandard.objects.all()
    serializer_class = ComplianceStandardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Create a new standard"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def add_questions(self, request, pk=None):
        """Add questions to a standard"""
        standard = self.get_object()
        questions_data = request.data.get('questions', [])
        
        try:
            for question_data in questions_data:
                question = Question.objects.create(
                    standard=standard,
                    question_text=question_data['question_text'],
                    question_number=question_data['question_number']
                )
                
                # Create options
                for option_data in question_data.get('options', []):
                    QuestionOption.objects.create(
                        question=question,
                        option_text=option_data['option_text'],
                        option_letter=option_data['option_letter'],
                        points=option_data['points'],
                        order=option_data.get('order', 1)
                    )
            
            return Response({
                'message': f'Added {len(questions_data)} questions to {standard.name}',
                'questions_added': len(questions_data)
            }, status=201)
            
        except Exception as e:
            return Response({'error': str(e)}, status=500)

# Public API Views
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def home_data(request):
    """Get data for the home page"""
    return Response({
        'company_name': 'Compliance Eye',
        'headline': 'Your Comprehensive Compliance Assessment Platform',
        'subheadline': 'Streamline your compliance journey with AI-powered assessments and real-time analytics',
        'features': [
            'Multi-framework compliance assessments',
            'Real-time Power BI analytics',
            'Document management system',
            'Expert report generation',
            'Risk analysis and recommendations'
        ]
    })