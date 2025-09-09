from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    """Client model for business transformation tracking"""
    name = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    transformation_stage = models.CharField(
        max_length=50,
        choices=[
            ('discovery', 'Discovery'),
            ('planning', 'Planning'),
            ('implementation', 'Implementation'),
            ('optimization', 'Optimization'),
            ('completed', 'Completed'),
        ],
        default='discovery'
    )
    success_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name

class BusinessMetric(models.Model):
    """Business metrics for tracking transformation progress"""
    name = models.CharField(max_length=200)
    current_value = models.DecimalField(max_digits=10, decimal_places=2)
    target_value = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='metrics')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def percentage_complete(self):
        if self.target_value == 0:
            return 0
        return (self.current_value / self.target_value) * 100
    
    def __str__(self):
        return f"{self.name} - {self.client.name}"

class Insight(models.Model):
    """Insights and analytics data"""
    title = models.CharField(max_length=200)
    category = models.CharField(
        max_length=50,
        choices=[
            ('strategy', 'Strategy'),
            ('technology', 'Technology'),
            ('process', 'Process'),
            ('culture', 'Culture'),
            ('performance', 'Performance'),
        ]
    )
    description = models.TextField()
    impact_score = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class ContactSubmission(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Contact from {self.name} - {self.email}"