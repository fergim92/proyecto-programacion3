# Se importan las bibliotecas necesarias de Google Cloud BigQuery y sus excepciones.
from google.cloud import bigquery
from google.cloud.exceptions import NotFound

# Definición de la clase LibroBigQuery.
class LibroBigQuery:
    # Método de inicialización para la clase.
    def __init__(self, project_id, dataset_id, table_id="libro"):
        # Inicializa el cliente de BigQuery.
        self.client = bigquery.Client(project=project_id)
        # Define el ID completo de la tabla.
        self.table_id = f"{project_id}.{dataset_id}.{table_id}"
        # Referencia a la tabla dentro del conjunto de datos.
        self.table_ref = self.client.dataset(dataset_id).table(table_id)
        # Intenta crear la tabla.
        self.create_table()

    # Método para crear la tabla.
    def create_table(self):
        try:
            # Intenta obtener la tabla; si ya existe, no hará nada.
            self.client.get_table(self.table_id)
        except NotFound:
            # Si la tabla no existe, se define el esquema y se crea.
            schema = [
                # Define las columnas y tipos de datos de la tabla.
                # ...
            ]
            table = bigquery.Table(self.table_ref, schema=schema)
            self.client.create_table(table)

    # Método para añadir un libro a la tabla.
    def alta_libro(self, ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial, imagen_url=None):
        # Define los datos del libro a insertar.
        rows_to_insert = [{
        "ISBN": ISBN,
        "titulo": titulo,
        "cantidad_disponible": cantidad_disponible,
        "anio_de_publicacion": anio_de_publicacion,
        "id_idioma": id_idioma,
        "id_editorial": id_editorial,
        "imagen_url": imagen_url
        }]

        errors = self.client.insert_rows_json(self.table_id, rows_to_insert)
        # Si no hay errores, retorna True; de lo contrario, imprime errores y retorna False.
        if errors == []:
            return True
        else:
            print("Error:", errors)
            return False

    # Método para eliminar un libro de la tabla usando su ISBN.
    def baja_libro(self, ISBN):
        # Define la consulta SQL para eliminar el libro.
        query = f"DELETE FROM `{self.table_id}` WHERE ISBN = '{ISBN}'"
        # Ejecuta la consulta.
        self.client.query(query).result()

    # Método para modificar los datos de un libro existente usando su ISBN.
    def modificar_libro(self, ISBN, titulo=None, cantidad_disponible=None, anio_de_publicacion=None, id_idioma=None, id_editorial=None, imagen_url=None):
        # Lista de actualizaciones a realizar.
        updates = []
        # Comprueba qué campos se proporcionaron y construye la consulta SQL.
        # ...
        if updates:
            query = f"UPDATE `{self.table_id}` SET {', '.join(updates)} WHERE ISBN = '{ISBN}'"
            # Ejecuta la consulta.
            self.client.query(query).result()
        # Actualiza la URL de la imagen si se proporcionó.
        if imagen_url:
            updates.append(f"imagen_url = '{imagen_url}'")

    # Método para consultar todos los libros de la tabla.
    def consulta_libros(self):
        # Define la consulta SQL para seleccionar todos los registros.
        query = f"SELECT * FROM `{self.table_id}`"
        # Ejecuta la consulta y obtiene los resultados.
        results = self.client.query(query).result()
        return results
    
        # Método para consultar un libro específico por ISBN.
    def consulta_libro_por_isbn(self, ISBN):
        # Define la consulta SQL para seleccionar el registro con el ISBN dado.
        query = f"SELECT * FROM `{self.table_id}` WHERE ISBN = '{ISBN}'"
        # Ejecuta la consulta y obtiene el resultado.
        result = self.client.query(query).result()
        
        # Como estamos buscando un libro específico, deberíamos obtener solo una fila. 
        # Convertimos esa fila a un diccionario y la retornamos.
        for row in result:
            return dict(row)
        
        # Si no hay resultados, retornamos None.
        return None




