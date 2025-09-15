from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# Authentication
router.register(r'auth/login', views.LoginView, basename='login')
router.register(r'auth/logout', views.LogoutView, basename='logout')

# Compliance Framework & Standards
router.register(r'frameworks', views.ComplianceFrameworkViewSet)
router.register(r'standards', views.ComplianceStandardViewSet)

# Assessments
router.register(r'assessments', views.AssessmentViewSet)

# Documents
router.register(r'documents', views.DocumentViewSet)

# Reports
router.register(r'reports', views.ReportViewSet)

# Analytics
router.register(r'analytics', views.AnalyticsViewSet)

# Contact
router.register(r'contacts', views.ContactSubmissionViewSet)

# Snowflake Integration
router.register(r'snowflake', views.SnowflakeDataViewSet, basename='snowflake')

urlpatterns = [
    path('', include(router.urls)),
    path('home/', views.home_data, name='home-data'),
]
