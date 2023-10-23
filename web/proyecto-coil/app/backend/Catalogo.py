from LibroBigQuery import LibroBigQuery


class Catalogo:
    def __init__(self, project_id, dataset_id, table_id="libro"):
        self.libro_bq = LibroBigQuery(project_id, dataset_id, table_id)
        self.libros = self.cargar_libros()

    def cargar_libros(self):
        # Esta función se encarga de cargar todos los libros desde BigQuery
        libros_resultados = self.libro_bq.consulta_libros()
        libros_lista = []
        for libro in libros_resultados:
            libros_lista.append(libro)
        return libros_lista

    def listar_libros(self):
        # Esta función puede imprimir todos los libros o hacer algo más con ellos
        for libro in self.libros:
            print(libro)

    def obtener_libros(self):
        # Esta función retorna la lista de libros
        return self.libros
