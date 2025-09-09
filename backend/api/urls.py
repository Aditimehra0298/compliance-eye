from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'clients', views.ClientViewSet)
router.register(r'metrics', views.BusinessMetricViewSet)
router.register(r'insights', views.InsightViewSet)
router.register(r'contacts', views.ContactSubmissionViewSet)
router.register(r'snowflake', views.SnowflakeDataViewSet, basename='snowflake')

urlpatterns = [
    path('', include(router.urls)),
    path('home/', views.home_data, name='home-data'),
]
