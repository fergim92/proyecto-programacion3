import sqlite3

class Libro:
    def __init__(self, db_name="proyecto.db"):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_table()
    
    def create_table(self):
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS libro (
            ISBN TEXT PRIMARY KEY,
            titulo TEXT,
            cantidad_disponible INTEGER,
            anio_de_publicacion INTEGER,
            id_idioma INTEGER,
            id_editorial INTEGER,
            FOREIGN KEY(id_idioma) REFERENCES idioma(id_idioma),
            FOREIGN KEY(id_editorial) REFERENCES editorial(id_editorial)
        )
        """)
        self.conn.commit()
    
    def alta_libro(self, ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial):
        try:
            self.cursor.execute("""
            INSERT INTO libro (ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial))
            self.conn.commit()
            return True
        except sqlite3.IntegrityError:
            print("Error: El ISBN ya existe en la base de datos.")
            return False

    def baja_libro(self, ISBN):
        self.cursor.execute("DELETE FROM libro WHERE ISBN = ?", (ISBN,))
        self.conn.commit()
    
    def modificar_libro(self, ISBN, titulo=None, cantidad_disponible=None, anio_de_publicacion=None, id_idioma=None, id_editorial=None):
        if titulo:
            self.cursor.execute("UPDATE libro SET titulo = ? WHERE ISBN = ?", (titulo, ISBN))
        if cantidad_disponible is not None:
            self.cursor.execute("UPDATE libro SET cantidad_disponible = ? WHERE ISBN = ?", (cantidad_disponible, ISBN))
        if anio_de_publicacion:
            self.cursor.execute("UPDATE libro SET anio_de_publicacion = ? WHERE ISBN = ?", (anio_de_publicacion, ISBN))
        if id_idioma:
            self.cursor.execute("UPDATE libro SET id_idioma = ? WHERE ISBN = ?", (id_idioma, ISBN))
        if id_editorial:
            self.cursor.execute("UPDATE libro SET id_editorial = ? WHERE ISBN = ?", (id_editorial, ISBN))
        self.conn.commit()

    def consulta_libros(self, ISBN=None):
        if ISBN:
            self.cursor.execute("SELECT * FROM libro WHERE ISBN = ?", (ISBN,))
        else:
            self.cursor.execute("SELECT * FROM libro")
        return self.cursor.fetchall()

    def close(self):
        self.conn.close()



