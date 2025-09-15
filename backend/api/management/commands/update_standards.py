from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import ComplianceFramework, ComplianceStandard, Question, QuestionOption
import json
import os

class Command(BaseCommand):
    help = 'Update compliance standards from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, help='Path to JSON file with standards data')
        parser.add_argument('--framework', type=str, help='Framework name to update')

    def handle(self, *args, **options):
        file_path = options.get('file')
        framework_name = options.get('framework')
        
        if not file_path or not os.path.exists(file_path):
            self.stdout.write(
                self.style.ERROR('Please provide a valid JSON file path')
            )
            return
        
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            # Get or create framework
            framework, created = ComplianceFramework.objects.get_or_create(
                name=framework_name or data.get('framework_name', 'Custom Framework'),
                defaults={
                    'description': data.get('framework_description', 'Custom compliance framework'),
                    'category': data.get('category', 'CUSTOM')
                }
            )
            
            if created:
                self.stdout.write(f'Created framework: {framework.name}')
            else:
                self.stdout.write(f'Using existing framework: {framework.name}')
            
            # Process standards
            for standard_data in data.get('standards', []):
                standard, created = ComplianceStandard.objects.get_or_create(
                    framework=framework,
                    name=standard_data['name'],
                    defaults={
                        'description': standard_data.get('description', ''),
                        'version': standard_data.get('version', '1.0')
                    }
                )
                
                if created:
                    self.stdout.write(f'Created standard: {standard.name}')
                else:
                    self.stdout.write(f'Updated standard: {standard.name}')
                
                # Process questions
                for question_data in standard_data.get('questions', []):
                    question, created = Question.objects.get_or_create(
                        standard=standard,
                        question_number=question_data['question_number'],
                        defaults={
                            'question_text': question_data['question_text']
                        }
                    )
                    
                    if created:
                        self.stdout.write(f'Created question {question.question_number}')
                    else:
                        # Update existing question
                        question.question_text = question_data['question_text']
                        question.save()
                        self.stdout.write(f'Updated question {question.question_number}')
                    
                    # Process options
                    for option_data in question_data.get('options', []):
                        option, created = QuestionOption.objects.get_or_create(
                            question=question,
                            option_letter=option_data['option_letter'],
                            defaults={
                                'option_text': option_data['option_text'],
                                'points': option_data['points'],
                                'order': option_data.get('order', 1)
                            }
                        )
                        
                        if not created:
                            # Update existing option
                            option.option_text = option_data['option_text']
                            option.points = option_data['points']
                            option.order = option_data.get('order', 1)
                            option.save()
            
            self.stdout.write(
                self.style.SUCCESS('Successfully updated standards from JSON file!')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error processing file: {str(e)}')
            )
