from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class ComplianceFramework(models.Model):
    """Compliance frameworks like GDPR, HIPAA, ISO 27001, etc."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    category = models.CharField(
        max_length=50,
        choices=[
            ('EU', 'EU Compliance'),
            ('USA', 'USA Compliance'),
            ('ISO', 'ISO Standards'),
            ('IEC', 'IEC Standards'),
        ]
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class ComplianceStandard(models.Model):
    """Specific standards within frameworks"""
    framework = models.ForeignKey(ComplianceFramework, on_delete=models.CASCADE, related_name='standards')
    name = models.CharField(max_length=200)
    description = models.TextField()
    version = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['framework', 'name']
        unique_together = ['framework', 'name']
    
    def __str__(self):
        return f"{self.framework.name} - {self.name}"

class UserProfile(models.Model):
    """Extended user profile for compliance users"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    company = models.CharField(max_length=200, blank=True)
    industry = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(
        max_length=50,
        choices=[
            ('compliance_officer', 'Compliance Officer'),
            ('security_manager', 'Security Manager'),
            ('auditor', 'Auditor'),
            ('consultant', 'Consultant'),
            ('admin', 'Administrator'),
        ],
        default='compliance_officer'
    )
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.company}"

class Assessment(models.Model):
    """Compliance assessments conducted by users"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessments')
    framework = models.ForeignKey(ComplianceFramework, on_delete=models.CASCADE)
    standard = models.ForeignKey(ComplianceStandard, on_delete=models.CASCADE)
    plan_type = models.CharField(
        max_length=20,
        choices=[
            ('basic', 'Basic (Free)'),
            ('advanced', 'Advanced (Paid)'),
        ],
        default='basic'
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
            ('reviewed', 'Reviewed'),
        ],
        default='in_progress'
    )
    total_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    max_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.standard.name} ({self.status})"

class Question(models.Model):
    """Assessment questions for different standards"""
    standard = models.ForeignKey(ComplianceStandard, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_number = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['standard', 'question_number']
        unique_together = ['standard', 'question_number']
    
    def __str__(self):
        return f"Q{self.question_number}: {self.question_text[:50]}..."

class QuestionOption(models.Model):
    """Answer options for questions"""
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=200)
    option_letter = models.CharField(max_length=1)  # A, B, C, D
    points = models.DecimalField(max_digits=3, decimal_places=1)  # 2, 4, 5.5, 8
    is_correct = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=1)
    
    class Meta:
        ordering = ['question', 'order']
        unique_together = ['question', 'option_letter']
    
    def __str__(self):
        return f"{self.option_letter}: {self.option_text}"

class AssessmentResponse(models.Model):
    """User responses to assessment questions"""
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(QuestionOption, on_delete=models.CASCADE)
    points_earned = models.DecimalField(max_digits=3, decimal_places=1)
    answered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['assessment', 'question']
    
    def __str__(self):
        return f"{self.assessment.user.username} - Q{self.question.question_number}"

class Document(models.Model):
    """Uploaded compliance documents"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='documents', null=True, blank=True)
    document_type = models.CharField(
        max_length=50,
        choices=[
            ('isms_scope', 'ISMS Scope Document'),
            ('security_policy', 'Information Security Policy'),
            ('risk_assessment', 'Risk Assessment Report'),
            ('soa', 'Statement of Applicability (SoA)'),
            ('incident_response', 'Incident Response Plan'),
            ('bcp_drp', 'Business Continuity & DRP'),
            ('other', 'Other'),
        ]
    )
    file_name = models.CharField(max_length=255)
    file_path = models.FileField(upload_to='documents/')
    file_size = models.PositiveIntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.file_name}"

class Report(models.Model):
    """Generated compliance reports"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assessment = models.OneToOneField(Assessment, on_delete=models.CASCADE, related_name='report')
    report_type = models.CharField(
        max_length=50,
        choices=[
            ('basic', 'Basic Report'),
            ('advanced', 'Advanced Report'),
            ('expert', 'Expert Report'),
        ]
    )
    title = models.CharField(max_length=200)
    summary = models.TextField()
    recommendations = models.JSONField(default=list)  # List of recommendation strings
    compliance_level = models.CharField(
        max_length=20,
        choices=[
            ('excellent', 'Excellent'),
            ('good', 'Good'),
            ('fair', 'Fair'),
            ('needs_improvement', 'Needs Improvement'),
        ]
    )
    risk_score = models.DecimalField(max_digits=5, decimal_places=2)
    maturity_level = models.CharField(
        max_length=20,
        choices=[
            ('basic', 'Basic'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced'),
        ]
    )
    generated_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-generated_at']
    
    def __str__(self):
        return f"{self.assessment.user.username} - {self.title}"

class AnalyticsData(models.Model):
    """Analytics and metrics data for Power BI integration"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analytics')
    metric_type = models.CharField(
        max_length=50,
        choices=[
            ('compliance_score', 'Compliance Score'),
            ('risk_level', 'Risk Level'),
            ('maturity_level', 'Maturity Level'),
            ('assessment_count', 'Assessment Count'),
            ('document_count', 'Document Count'),
        ]
    )
    value = models.DecimalField(max_digits=10, decimal_places=2)
    metadata = models.JSONField(default=dict)  # Additional data for the metric
    recorded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-recorded_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.metric_type}: {self.value}"

class ContactSubmission(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    processed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Contact from {self.name} - {self.email}"