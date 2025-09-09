from rest_framework import serializers
from .models import Client, BusinessMetric, Insight, ContactSubmission

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class BusinessMetricSerializer(serializers.ModelSerializer):
    percentage_complete = serializers.ReadOnlyField()
    
    class Meta:
        model = BusinessMetric
        fields = '__all__'

class InsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insight
        fields = '__all__'

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'

class SnowflakeDataSerializer(serializers.Serializer):
    """Serializer for data coming from Snowflake"""
    data = serializers.ListField()
    source = serializers.CharField(default='snowflake')
    timestamp = serializers.DateTimeField()
