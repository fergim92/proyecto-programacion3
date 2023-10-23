from google.cloud import bigquery
from google.cloud.exceptions import NotFound

class LibroBigQuery:
    def __init__(self, project_id, dataset_id, table_id="libro"):
        self.client = bigquery.Client(project=project_id)
        self.table_id = f"{project_id}.{dataset_id}.{table_id}"
        self.table_ref = self.client.dataset(dataset_id).table(table_id)
        self.create_table()  # Llamar a create_table en el constructor

    def create_table(self):
        try:
            self.client.get_table(self.table_id)
        except NotFound:
            # La tabla no existe, definir el esquema y crearla
            schema = [
                bigquery.SchemaField("ISBN", "STRING", mode="REQUIRED"),
                bigquery.SchemaField("titulo", "STRING", mode="NULLABLE"),
                bigquery.SchemaField("cantidad_disponible", "INTEGER", mode="NULLABLE"),
                bigquery.SchemaField("anio_de_publicacion", "INTEGER", mode="NULLABLE"),
                bigquery.SchemaField("id_idioma", "INTEGER", mode="NULLABLE"),
                bigquery.SchemaField("id_editorial", "INTEGER", mode="NULLABLE"),
                bigquery.SchemaField("imagen_url", "STRING", mode="NULLABLE"),

            ]
            table = bigquery.Table(self.table_ref, schema=schema)
            self.client.create_table(table)

    def alta_libro(self, ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial, imagen_url=None):
        rows_to_insert = [
            {
                "ISBN": ISBN, 
                "titulo": titulo, 
                "cantidad_disponible": cantidad_disponible, 
                "anio_de_publicacion": anio_de_publicacion, 
                "id_idioma": id_idioma, 
                "id_editorial": id_editorial,
                "imagen_url": imagen_url  # Añadimos la URL de la imagen aquí
            }
        ]
        errors = self.client.insert_rows_json(self.table_id, rows_to_insert)
        if errors == []:
            return True
        else:
            print("Error:", errors)
            return False

    def baja_libro(self, ISBN):
        query = f"DELETE FROM `{self.table_id}` WHERE ISBN = '{ISBN}'"
        self.client.query(query).result()

    def modificar_libro(self, ISBN, titulo=None, cantidad_disponible=None, anio_de_publicacion=None, id_idioma=None, id_editorial=None, imagen_url=None):
        updates = []
        if titulo:
            updates.append(f"titulo = '{titulo}'")
        if cantidad_disponible is not None:
            updates.append(f"cantidad_disponible = {cantidad_disponible}")
        if anio_de_publicacion:
            updates.append(f"anio_de_publicacion = {anio_de_publicacion}")
        if id_idioma:
            updates.append(f"id_idioma = {id_idioma}")
        if id_editorial:
            updates.append(f"id_editorial = {id_editorial}")

        if updates:
            query = f"UPDATE `{self.table_id}` SET {', '.join(updates)} WHERE ISBN = '{ISBN}'"
            self.client.query(query).result()
            
        if imagen_url:
            updates.append(f"imagen_url = '{imagen_url}'")

    def consulta_libros(self):
        query = f"SELECT * FROM `{self.table_id}`"
        results = self.client.query(query).result()
        return results


