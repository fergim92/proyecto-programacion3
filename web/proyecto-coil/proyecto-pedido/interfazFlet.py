import os
import flet as ft
from flet import TextField, ElevatedButton, Column, Row, Text, ListView
from google.cloud import bigquery
import json
import base64
from dotenv import load_dotenv
from google.oauth2 import service_account

# Carga las variables de entorno desde '.env.local'
load_dotenv(dotenv_path='C:/Users/gimen/Documents/ic/prog3/proyecto-programacion3/web/proyecto-coil/.env.local')


# Variables de entorno
project_id = os.environ.get('GOOGLE_CLOUD_PROJECT_ID')
dataset_id = os.environ.get('BIGQUERY_DATASET_ID')
table_libros = os.environ.get('BIGQUERY_TABLE_LIBROS')
credentials_base64 = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_BASE64')

# Decodificar las credenciales de BigQuery
credentials_json = json.loads(base64.b64decode(credentials_base64))
credentials = service_account.Credentials.from_service_account_info(credentials_json)

# Configurar cliente de BigQuery
bigquery_client = bigquery.Client(project=project_id, credentials=credentials)

def main(page: ft.Page):
    page.title = "Sistema de Gestión de Biblioteca"
    page.horizontal_alignment = "center"

    # Configurar cliente de BigQuery
    bigquery_client = bigquery.Client(project=project_id, credentials=credentials)
    table_full_path = f"{dataset_id}.{table_libros}"




    def alta_libro(e):
        # Aquí deberías obtener los datos de los campos de texto y pasarlos a la función alta_libro
        # Por ejemplo: libro.alta_libro(isbn_text.value, titulo_text.value, ...)
        pass
    
    def baja_libro(e):
        # Aquí deberías obtener el ISBN y pasarlo a la función baja_libro
        pass
    
    def consulta_libros(e):
        # Aquí deberías actualizar la lista de libros mostrados en la interfaz
        pass
    
    # Campos de texto para la entrada del usuario
    isbn_text = TextField(label="ISBN", width=300)
    titulo_text = TextField(label="Título", width=300)
    cantidad_text = TextField(label="Cantidad Disponible", width=300)
    anio_text = TextField(label="Año de Publicación", width=300)
    idioma_text = TextField(label="ID Idioma", width=300)
    editorial_text = TextField(label="ID Editorial", width=300)
    
    # Botones para las operaciones
    alta_button = ElevatedButton("Añadir libro", on_click=alta_libro)
    baja_button = ElevatedButton("Eliminar libro", on_click=baja_libro)
    consulta_button = ElevatedButton("Consultar libros", on_click=consulta_libros)
    
    # Lista para mostrar libros
    lista_libros = ListView()

    # Organizar los widgets en la página
    page.add(
        Column([
            Text("Gestión de Libros", size=30),
            isbn_text,
            titulo_text,
            cantidad_text,
            anio_text,
            idioma_text,
            editorial_text,
            Row([alta_button, baja_button, consulta_button]),
            lista_libros
        ])
    )
    
    

# Ejecutar la aplicación
if __name__ == "__main__":
    ft.app(target=main)






