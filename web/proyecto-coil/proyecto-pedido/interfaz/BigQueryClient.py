import json
import base64
from google.cloud import bigquery
from google.oauth2 import service_account
from dotenv import load_dotenv
import os
from google.cloud.exceptions import NotFound

class BigQueryClient:
    def __init__(self):
        load_dotenv(dotenv_path='C:/Users/gimen/Documents/ic/prog3/proyecto-programacion3/web/proyecto-coil/.env.local')
        project_id = os.environ.get('GOOGLE_CLOUD_PROJECT_ID')
        credentials_base64 = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_BASE64')
        credentials_json = json.loads(base64.b64decode(credentials_base64))
        credentials = service_account.Credentials.from_service_account_info(credentials_json)
        self.client = bigquery.Client(project=project_id, credentials=credentials)