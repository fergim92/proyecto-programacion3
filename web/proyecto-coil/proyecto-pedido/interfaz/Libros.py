import os
import flet as ft
from flet import TextField, ElevatedButton, Column, Row, Text, ListView, AlertDialog
from BigQueryClient import BigQueryClient


class Libros:
    def __init__(self, bigquery_client: BigQueryClient):
        self.bigquery_client = bigquery_client
        self.dataset_id = os.environ.get('BIGQUERY_DATASET_ID')
        self.table_libros = os.environ.get('BIGQUERY_TABLE_LIBROS')
        self.table_full_path = f"{self.dataset_id}.{self.table_libros}"
        self.lista_libros = ListView()  
        
    def setup_page(self, page):
        page.title = "Sistema de Gestión de Biblioteca"
        page.horizontal_alignment = "center"
        self.create_ui(page, page)  # Pasa page aquí también


    def create_ui(self, container, page):
        # Definición de todos los campos de texto
        self.isbn_text = TextField(label="ISBN", width=300, visible=False)
        self.titulo_text = TextField(label="Título", width=300, visible=False)
        self.cantidad_text = TextField(label="Cantidad Disponible", width=300, visible=False)
        self.anio_text = TextField(label="Año de Publicación", width=300, visible=False)
        self.idioma_text = TextField(label="ID Idioma", width=300, visible=False)
        self.editorial_text = TextField(label="ID Editorial", width=300, visible=False)

        # Definición de botones
        alta_button = ElevatedButton("Añadir libro", on_click=lambda e: self.toggle_add_book_fields(e, page, True))
        baja_button = ElevatedButton("Eliminar libro", on_click=lambda e: self.toggle_add_book_fields(e, page, False))
        consulta_button = ElevatedButton("Consultar libros", on_click=lambda e: self.consultar_libros_ocultar_campos(page))

        # Agregar elementos al contenedor
        container.add(
            Column([
                Text("Gestión de Libros", size=30),
                self.isbn_text,
                self.titulo_text,
                self.cantidad_text,
                self.anio_text,
                self.idioma_text,
                self.editorial_text,
                Row([alta_button, baja_button, consulta_button]),
                self.lista_libros  
            ])
        )

    # ... resto de tus métodos ...

    def toggle_add_book_fields(self, e, page, is_adding):
        # Mostrar campos para añadir, ocultar para eliminar
        visibility = is_adding
        self.isbn_text.visible = True  # ISBN siempre visible
        self.titulo_text.visible = visibility
        self.cantidad_text.visible = visibility
        self.anio_text.visible = visibility
        self.idioma_text.visible = visibility
        self.editorial_text.visible = visibility
        page.update()

    def consultar_libros_ocultar_campos(self, page):
        # Oculta todos los campos y muestra la lista de libros
        self.isbn_text.visible = False
        self.titulo_text.visible = False
        self.cantidad_text.visible = False
        self.anio_text.visible = False
        self.idioma_text.visible = False
        self.editorial_text.visible = False
        self.actualizar_lista_libros()
        page.update()

    def alta_libro(self, isbn, titulo, cantidad, anio, idioma, editorial, page):
        # Convierte los valores a los tipos de datos adecuados
        cantidad = int(cantidad) if cantidad else 0
        anio = int(anio) if anio else None
        idioma = int(idioma) if idioma else None
        editorial = int(editorial) if editorial else None

        # Verifica si el libro con el ISBN dado ya existe
        query = f"SELECT cantidad_disponible FROM `{self.table_full_path}` WHERE ISBN = '{isbn}'"
        query_job = self.bigquery_client.client.query(query)
        results = list(query_job.result())

        if results:
            # Si el libro ya existe, actualiza la cantidad disponible
            cantidad_existente = results[0].cantidad_disponible
            nueva_cantidad = cantidad_existente + cantidad
            update_query = f"""
                UPDATE `{self.table_full_path}`
                SET cantidad_disponible = {nueva_cantidad}
                WHERE ISBN = '{isbn}'
            """
            try:
                self.bigquery_client.client.query(update_query).result()
                print("Cantidad actualizada con éxito")
                return True
            except Exception as e:
                print("Error al actualizar el libro:", e)
                return False
        else:
            # Si el libro no existe, inserta un nuevo libro
            rows_to_insert = [{
                "ISBN": isbn,
                "titulo": titulo,
                "cantidad_disponible": cantidad,
                "anio_de_publicacion": anio,
                "id_idioma": idioma,
                "id_editorial": editorial
            }]

            try:
                errors = self.bigquery_client.client.insert_rows_json(self.table_full_path, rows_to_insert)
                if errors == []:
                    print("Libro añadido con éxito")
                    self.mostrar_alerta("Libro añadido con éxito", page)
                    return True
                else:
                    print("Error al añadir el libro:", errors)
                    self.mostrar_alerta("No se pudo añadir el libro", page)
                    return False
            except Exception as e:
                print("Ocurrió un error al insertar el libro:", e)
                return False
    

            


    def baja_libro(self, isbn, page):
        # Define la consulta SQL para eliminar el libro.
        query = f"DELETE FROM `{self.table_full_path}` WHERE ISBN = '{isbn}'"
        
        # Intenta ejecutar la consulta y maneja posibles excepciones.
        try:
            # Ejecuta la consulta.
            self.bigquery_client.client.query(query).result()
            print(f"Libro con ISBN {isbn} eliminado con éxito.")
            self.mostrar_alerta("Libro borrado con éxito", page)
            return True
        except Exception as e:
            # Imprime el mensaje de error si algo va mal.
            print(f"Error al eliminar el libro con ISBN {isbn}: {e}")
            self.mostrar_alerta("No se pudo borrar el libro", page)
            return False

    def consulta_libros(self):
        query = f"SELECT * FROM `{self.table_full_path}`"
        results = self.bigquery_client.client.query(query).result()
        libros = [dict(row) for row in results]
        return libros

    def actualizar_lista_libros(self):
        libros = self.consulta_libros()

        # Limpia la lista de libros actual
        self.lista_libros.controls = []

        # Agrega los libros consultados a la lista
        for libro in libros:
            texto_libro = f"ISBN: {libro['ISBN']}, Título: {libro.get('titulo', 'N/A')}, Cantidad Disponible: {libro.get('cantidad_disponible', 'N/A')}, Año de Publicación: {libro.get('anio_de_publicacion', 'N/A')}, ID Idioma: {libro.get('id_idioma', 'N/A')}, ID Editorial: {libro.get('id_editorial', 'N/A')}"
            self.lista_libros.controls.append(ft.Text(texto_libro))

        # Actualiza la lista de libros en la interfaz
        self.lista_libros.update()

    def toggle_add_book_fields(self, e, page, is_adding):
        # Mostrar campos para añadir, ocultar para eliminar
        visibility = is_adding
        self.isbn_text.visible = True  # ISBN siempre visible
        self.titulo_text.visible = visibility
        self.cantidad_text.visible = visibility
        self.anio_text.visible = visibility
        self.idioma_text.visible = visibility
        self.editorial_text.visible = visibility
        page.update()

    def consultar_libros_ocultar_campos(self, page):
        # Oculta todos los campos y muestra la lista de libros
        self.isbn_text.visible = False
        self.titulo_text.visible = False
        self.cantidad_text.visible = False
        self.anio_text.visible = False
        self.idioma_text.visible = False
        self.editorial_text.visible = False
        self.actualizar_lista_libros()
        page.update()
        
    def mostrar_alerta(self, mensaje, page):
        # Crear un botón para cerrar la alerta
        cerrar_btn = ElevatedButton("Cerrar", on_click=lambda e: page.remove(self.alerta))

        # Crear la alerta
        self.alerta = AlertDialog(
            title="Información",
            content=Text(mensaje),
            actions=[cerrar_btn]
        )

        # Mostrar la alerta en la página
        page.add(self.alerta)    