from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Client, BusinessMetric, Insight, ContactSubmission
from .serializers import (
    ClientSerializer, 
    BusinessMetricSerializer, 
    InsightSerializer, 
    ContactSubmissionSerializer,
    SnowflakeDataSerializer
)
from .snowflake_service import SnowflakeService

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active clients"""
        active_clients = Client.objects.filter(is_active=True)
        serializer = self.get_serializer(active_clients, many=True)
        return Response(serializer.data)

class BusinessMetricViewSet(viewsets.ModelViewSet):
    queryset = BusinessMetric.objects.all()
    serializer_class = BusinessMetricSerializer
    
    @action(detail=False, methods=['get'])
    def by_client(self, request):
        """Get metrics for a specific client"""
        client_id = request.query_params.get('client_id')
        if client_id:
            metrics = BusinessMetric.objects.filter(client_id=client_id)
            serializer = self.get_serializer(metrics, many=True)
            return Response(serializer.data)
        return Response({'error': 'client_id parameter required'}, status=400)

class InsightViewSet(viewsets.ModelViewSet):
    queryset = Insight.objects.all()
    serializer_class = InsightSerializer
    
    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get all published insights"""
        published_insights = Insight.objects.filter(is_published=True)
        serializer = self.get_serializer(published_insights, many=True)
        return Response(serializer.data)

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new contact submission"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SnowflakeDataViewSet(viewsets.ViewSet):
    """ViewSet for Snowflake data integration"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.snowflake_service = SnowflakeService()
    
    @action(detail=False, methods=['get'])
    def business_metrics(self, request):
        """Get business metrics from Snowflake"""
        data = self.snowflake_service.get_business_metrics()
        if data is not None:
            return Response({
                'data': data,
                'source': 'snowflake',
                'timestamp': timezone.now()
            })
        return Response({'error': 'Unable to fetch data from Snowflake'}, status=500)
    
    @action(detail=False, methods=['get'])
    def client_data(self, request):
        """Get client data from Snowflake"""
        data = self.snowflake_service.get_client_data()
        if data is not None:
            return Response({
                'data': data,
                'source': 'snowflake',
                'timestamp': timezone.now()
            })
        return Response({'error': 'Unable to fetch data from Snowflake'}, status=500)
    
    @action(detail=False, methods=['get'])
    def insights_data(self, request):
        """Get insights data from Snowflake"""
        data = self.snowflake_service.get_insights_data()
        if data is not None:
            return Response({
                'data': data,
                'source': 'snowflake',
                'timestamp': timezone.now()
            })
        return Response({'error': 'Unable to fetch data from Snowflake'}, status=500)

# API Views for the main website
def home_data(request):
    """Get data for the home page"""
    return Response({
        'company_name': 'PENH',
        'headline': 'Your Dedicated Partner In Business Transformation',
        'subheadline': 'Guiding You Towards Unprecedented Success with Proven Strategies',
        'social_links': {
            'instagram': '#',
            'facebook': '#',
            'twitter': '#',
            'linkedin': '#',
            'youtube': '#'
        }
    })