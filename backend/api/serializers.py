from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    ComplianceFramework, ComplianceStandard, UserProfile, Assessment,
    Question, QuestionOption, AssessmentResponse, Document, Report,
    AnalyticsData, ContactSubmission
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class ComplianceFrameworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceFramework
        fields = '__all__'

class ComplianceStandardSerializer(serializers.ModelSerializer):
    framework = ComplianceFrameworkSerializer(read_only=True)
    
    class Meta:
        model = ComplianceStandard
        fields = '__all__'

class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ['id', 'option_text', 'option_letter', 'points', 'order']

class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'question_number', 'options']

class AssessmentResponseSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)
    selected_option = QuestionOptionSerializer(read_only=True)
    
    class Meta:
        model = AssessmentResponse
        fields = ['id', 'question', 'selected_option', 'points_earned', 'answered_at']

class AssessmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    framework = ComplianceFrameworkSerializer(read_only=True)
    standard = ComplianceStandardSerializer(read_only=True)
    responses = AssessmentResponseSerializer(many=True, read_only=True)
    
    class Meta:
        model = Assessment
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['id', 'uploaded_at', 'is_processed']

class ReportSerializer(serializers.ModelSerializer):
    assessment = AssessmentSerializer(read_only=True)
    
    class Meta:
        model = Report
        fields = '__all__'
        read_only_fields = ['id', 'generated_at']

class AnalyticsDataSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = AnalyticsData
        fields = '__all__'
        read_only_fields = ['id', 'recorded_at']

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'is_processed', 'processed_at']

class AssessmentCreateSerializer(serializers.Serializer):
    """Serializer for creating new assessments"""
    framework_id = serializers.IntegerField()
    standard_id = serializers.IntegerField()
    plan_type = serializers.ChoiceField(choices=[('basic', 'Basic (Free)'), ('advanced', 'Advanced (Paid)')])

class AssessmentResponseCreateSerializer(serializers.Serializer):
    """Serializer for submitting assessment responses"""
    question_id = serializers.IntegerField()
    selected_option_id = serializers.IntegerField()

class DocumentUploadSerializer(serializers.Serializer):
    """Serializer for document uploads"""
    document_type = serializers.ChoiceField(choices=[
        ('isms_scope', 'ISMS Scope Document'),
        ('security_policy', 'Information Security Policy'),
        ('risk_assessment', 'Risk Assessment Report'),
        ('soa', 'Statement of Applicability (SoA)'),
        ('incident_response', 'Incident Response Plan'),
        ('bcp_drp', 'Business Continuity & DRP'),
        ('other', 'Other'),
    ])
    file = serializers.FileField()

class SnowflakeDataSerializer(serializers.Serializer):
    """Serializer for data coming from Snowflake"""
    data = serializers.ListField()
    source = serializers.CharField(default='snowflake')
    timestamp = serializers.DateTimeField()
