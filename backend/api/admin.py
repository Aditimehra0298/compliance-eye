from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import (
    ComplianceFramework, ComplianceStandard, UserProfile, Assessment,
    Question, QuestionOption, AssessmentResponse, Document, Report,
    AnalyticsData, ContactSubmission
)

# Unregister the default User admin
admin.site.unregister(User)

# Register User with UserProfile inline
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'

class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)

admin.site.register(User, CustomUserAdmin)

# Register Compliance Framework models
@admin.register(ComplianceFramework)
class ComplianceFrameworkAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_active', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['name']

@admin.register(ComplianceStandard)
class ComplianceStandardAdmin(admin.ModelAdmin):
    list_display = ['name', 'framework', 'version', 'is_active', 'created_at']
    list_filter = ['framework', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['framework', 'name']

# Register Assessment models
@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'standard', 'plan_type', 'status', 'percentage', 'started_at']
    list_filter = ['plan_type', 'status', 'framework', 'standard', 'started_at']
    search_fields = ['user__username', 'user__email', 'standard__name']
    readonly_fields = ['id', 'started_at', 'completed_at']
    ordering = ['-started_at']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_number', 'standard', 'is_active', 'created_at']
    list_filter = ['standard', 'is_active', 'created_at']
    search_fields = ['question_text']
    ordering = ['standard', 'question_number']

@admin.register(QuestionOption)
class QuestionOptionAdmin(admin.ModelAdmin):
    list_display = ['question', 'option_letter', 'option_text', 'points', 'order']
    list_filter = ['question__standard', 'points']
    search_fields = ['option_text']
    ordering = ['question', 'order']

@admin.register(AssessmentResponse)
class AssessmentResponseAdmin(admin.ModelAdmin):
    list_display = ['assessment', 'question', 'selected_option', 'points_earned', 'answered_at']
    list_filter = ['assessment__standard', 'answered_at']
    search_fields = ['assessment__user__username', 'question__question_text']
    readonly_fields = ['answered_at']
    ordering = ['-answered_at']

# Register Document and Report models
@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['file_name', 'user', 'document_type', 'file_size', 'uploaded_at']
    list_filter = ['document_type', 'uploaded_at', 'is_processed']
    search_fields = ['file_name', 'user__username']
    readonly_fields = ['id', 'uploaded_at']
    ordering = ['-uploaded_at']

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['title', 'assessment', 'report_type', 'compliance_level', 'risk_score', 'generated_at']
    list_filter = ['report_type', 'compliance_level', 'maturity_level', 'generated_at']
    search_fields = ['title', 'assessment__user__username']
    readonly_fields = ['id', 'generated_at']
    ordering = ['-generated_at']

# Register Analytics model
@admin.register(AnalyticsData)
class AnalyticsDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'metric_type', 'value', 'recorded_at']
    list_filter = ['metric_type', 'recorded_at']
    search_fields = ['user__username']
    readonly_fields = ['recorded_at']
    ordering = ['-recorded_at']

# Register Contact model
@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'company', 'subject', 'is_processed', 'created_at']
    list_filter = ['is_processed', 'created_at']
    search_fields = ['name', 'email', 'company', 'subject']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
