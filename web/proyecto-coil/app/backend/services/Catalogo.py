# Importa la clase LibroBigQuery para interactuar con BigQuery.
from queries.LibroBigQuery import LibroBigQuery

# Define la clase Catálogo.
class Catalogo:
    # Método de inicialización para la clase.
    def __init__(self, project_id, dataset_id, table_id="libro"):
        # Inicializa la instancia de LibroBigQuery.
        self.libro_bq = LibroBigQuery(project_id, dataset_id, table_id)
        # Carga todos los libros desde BigQuery.
        self.libros = self.cargar_libros()

    def cargar_libros(self):
        # Consulta todos los libros de BigQuery.
        libros_resultados = self.libro_bq.consulta_libros()
        libros_lista = []
        # Convierte los resultados de BigQuery en una lista de libros.
        for libro in libros_resultados:
            libros_lista.append(libro)
        return libros_lista

    def listar_libros(self):
        # Imprime cada libro de la lista.
        for libro in self.libros:
            print(libro)

    def obtener_libros(self):
        # Retorna la lista completa de libros.
        return self.libros
