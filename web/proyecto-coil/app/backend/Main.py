import os
from Catalogo import Catalogo
from LibroBigQuery import LibroBigQuery
from google.cloud import bigquery
from google.oauth2 import service_account

# Establecer la variable de entorno para las credenciales
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service_account_key.json"

if __name__ == "__main__":
    # Reemplaza los siguientes valores con los detalles de tu proyecto y conjunto de datos
    project_id = "ancient-tractor-402615"
    dataset_id = "proyecto"
    table_id = "libro"  # Nombre de la tabla en BigQuery

    # Crear una instancia de LibroBigQuery
    libro_bq = LibroBigQuery(project_id=project_id, dataset_id=dataset_id, table_id=table_id)

    # Alta de un nuevo libro
    #libro_bq.alta_libro("1234567890", "Libro Ejemplo 1", 1, 2022, 1, 21, "https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg")
    #libro_bq.alta_libro("43244567890", "Libro Ejemplo 2", 5, 2021, 1, 22, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.canva.com%2Fes_mx%2Fportadas-libros%2Fplantillas%2F&psig=AOvVaw1ZJC_Iwy8RQKJWh999o9Km&ust=1698166017249000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLizv8bPjIIDFQAAAAAdAAAAABAI")
    #libro_bq.alta_libro("3247890", "Libro Ejemplo 3", 3, 2023, 1, 2, "https://media.licdn.com/dms/image/C4E12AQH8Dm6zaGzOow/article-inline_image-shrink_1500_2232/0/1652044936411?e=1701907200&v=beta&t=7-drKndGf52p7M--ZdH7Ztp-pGG5ALhBt3ZKxzTVNhw")
    #libro_bq.alta_libro("444890", "Libro Ejemplo 4", 5, 2021, 1, 1, "https://marketplace.canva.com/EAFjNCKkDPI/1/0/1003w/canva-portada-de-libro-de-fantas%C3%ADa-dram%C3%A1tico-verde-Ct1fLal3ekY.jpg")
    #libro_bq.alta_libro("5557890", "Libro Ejemplo 5", 5, 2022, 5, 2, "https://img2.rtve.es/imagenes/filosofia-felina-gatos-sentido-vida-john-gray/1650623523786.jpg")
    
    #Crear una instancia de Catalogo
    catalogo = Catalogo(project_id, dataset_id, table_id)
    
    # Imprimir la lista de libros
    catalogo.listar_libros()
    
    # O obtener la lista de libros para otro procesamiento
    libros = catalogo.obtener_libros()