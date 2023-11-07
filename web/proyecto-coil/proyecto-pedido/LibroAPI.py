import os

# Carga la variable de entorno directamente desde el archivo .env
credenciales_path = os.environ.get('BIGQUERY_CREDENTIALS_FILE')

if credenciales_path is not None:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credenciales_path
else:
    print("La variable BIGQUERY_CREDENTIALS_FILE no está definida en el archivo .env.")
