import tkinter as tk
from tkinter import messagebox, simpledialog
from Libro import Libro 

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Gestión de Libros")

        self.libro_db = Libro()

        # Widgets
        self.create_widgets()

    def create_widgets(self):
        # Alta de libro
        self.button_alta = tk.Button(self.root, text="Alta de Libro", command=self.alta_libro)
        self.button_alta.pack(pady=20)

        # Baja de libro
        self.button_baja = tk.Button(self.root, text="Baja de Libro", command=self.baja_libro)
        self.button_baja.pack(pady=20)

        # Modificación de libro
        self.button_modificacion = tk.Button(self.root, text="Modificar Libro", command=self.modificar_libro)
        self.button_modificacion.pack(pady=20)

    def alta_libro(self):
        data = self.get_libro_data()
        if data:
            success = self.libro_db.alta_libro(*data)
            if success:
                messagebox.showinfo("Éxito", "Libro añadido con éxito.")
            else:
                messagebox.showerror("Error", "No se pudo añadir el libro. Posiblemente el ISBN ya exista.")

    def baja_libro(self):
        isbn = simpledialog.askstring("Baja de Libro", "Introduce el ISBN del libro a eliminar:")
        if isbn:
            self.libro_db.baja_libro(isbn)
            messagebox.showinfo("Éxito", "Libro eliminado con éxito.")

    def modificar_libro(self):
        isbn = simpledialog.askstring("Modificar Libro", "Introduce el ISBN del libro a modificar:")
        if isbn:
            data = self.get_libro_data()
            if data:
                self.libro_db.modificar_libro(isbn, *data[1:])
                messagebox.showinfo("Éxito", "Libro modificado con éxito.")

    def get_libro_data(self):
        fields = ["ISBN", "Título", "Cantidad Disponible", "Año de Publicación", "ID Idioma", "ID Editorial"]
        data = []
        for field in fields:
            value = simpledialog.askstring("Ingreso de Datos", f"Introduce {field}:")
            if value is None:  # Si el usuario cancela
                return None
            if field in ["Cantidad Disponible", "Año de Publicación", "ID Idioma", "ID Editorial"]:
                try:
                    value = int(value)
                except ValueError:
                    messagebox.showerror("Error", f"{field} debe ser un número.")
                    return None
            data.append(value)
        return tuple(data)


if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
