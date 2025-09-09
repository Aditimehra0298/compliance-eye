import snowflake.connector
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class SnowflakeService:
    def __init__(self):
        self.config = settings.SNOWFLAKE_CONFIG
        
    def get_connection(self):
        """Get a Snowflake connection"""
        try:
            conn = snowflake.connector.connect(
                account=self.config['account'],
                user=self.config['user'],
                password=self.config['password'],
                warehouse=self.config['warehouse'],
                database=self.config['database'],
                schema=self.config['schema']
            )
            return conn
        except Exception as e:
            logger.error(f"Error connecting to Snowflake: {e}")
            return None
    
    def execute_query(self, query, params=None):
        """Execute a query and return results"""
        conn = self.get_connection()
        if not conn:
            return None
            
        try:
            cursor = conn.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            results = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            
            # Convert to list of dictionaries
            data = []
            for row in results:
                data.append(dict(zip(columns, row)))
            
            cursor.close()
            conn.close()
            
            return data
        except Exception as e:
            logger.error(f"Error executing query: {e}")
            if conn:
                conn.close()
            return None
    
    def get_business_metrics(self):
        """Get business transformation metrics from Snowflake"""
        query = """
        SELECT 
            metric_name,
            current_value,
            target_value,
            percentage_complete,
            last_updated
        FROM business_metrics 
        WHERE is_active = true
        ORDER BY last_updated DESC
        """
        return self.execute_query(query)
    
    def get_client_data(self):
        """Get client data from Snowflake"""
        query = """
        SELECT 
            client_id,
            client_name,
            industry,
            transformation_stage,
            success_score,
            last_contact_date
        FROM clients 
        WHERE status = 'active'
        ORDER BY last_contact_date DESC
        """
        return self.execute_query(query)
    
    def get_insights_data(self):
        """Get insights and analytics data from Snowflake"""
        query = """
        SELECT 
            insight_id,
            title,
            category,
            description,
            impact_score,
            created_date
        FROM insights 
        WHERE is_published = true
        ORDER BY created_date DESC
        """
        return self.execute_query(query)
