#!/usr/bin/env python3
"""
Setup script for Compliance Eye Django backend with MySQL database
"""

import os
import sys
import subprocess
import django
from django.conf import settings
from django.core.management import execute_from_command_line

def setup_environment():
    """Setup environment variables"""
    print("Setting up environment variables...")
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("Creating .env file from template...")
        with open('env_example.txt', 'r') as f:
            content = f.read()
        
        with open('.env', 'w') as f:
            f.write(content)
        
        print("Please edit .env file with your MySQL credentials before continuing.")
        print("Required: MYSQL_PASSWORD")
        return False
    
    return True

def install_requirements():
    """Install Python requirements"""
    print("Installing Python requirements...")
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], check=True)
        print("Requirements installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing requirements: {e}")
        return False

def setup_database():
    """Setup MySQL database and run migrations"""
    print("Setting up database...")
    
    try:
        # Load Django settings
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'penh_backend.settings')
        django.setup()
        
        # Run migrations
        print("Running database migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        # Create superuser
        print("Creating superuser...")
        from django.contrib.auth.models import User
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@complianceeye.com', 'admin123')
            print("Superuser created: admin/admin123")
        else:
            print("Superuser already exists")
        
        # Populate sample data
        print("Populating sample data...")
        execute_from_command_line(['manage.py', 'populate_sample_data'])
        
        print("Database setup completed successfully!")
        return True
        
    except Exception as e:
        print(f"Error setting up database: {e}")
        return False

def main():
    """Main setup function"""
    print("=== Compliance Eye Django Backend Setup ===")
    print()
    
    # Check if we're in the right directory
    if not os.path.exists('manage.py'):
        print("Error: Please run this script from the backend directory")
        sys.exit(1)
    
    # Setup environment
    if not setup_environment():
        print("Please configure your .env file and run this script again.")
        sys.exit(1)
    
    # Install requirements
    if not install_requirements():
        print("Failed to install requirements. Please check the error messages above.")
        sys.exit(1)
    
    # Setup database
    if not setup_database():
        print("Failed to setup database. Please check the error messages above.")
        sys.exit(1)
    
    print()
    print("=== Setup Complete! ===")
    print()
    print("You can now start the Django development server with:")
    print("python manage.py runserver")
    print()
    print("Access the admin panel at: http://localhost:8000/admin/")
    print("Username: admin")
    print("Password: admin123")
    print()
    print("API endpoints are available at: http://localhost:8000/api/")
    print("Demo user credentials: demo/demo123")

if __name__ == '__main__':
    main()
