import os
from flask import Flask, app, appcontext_popped, jsonify, request, Blueprint

from queries.LibroBigQuery import LibroBigQuery
from services.Catalogo import Catalogo

app = Flask(__name__)
@app.errorhandler(500)
def internal_error(error):
    app.logger.error("Server Error: %s", error)
    return jsonify({"message": "Internal server error"}), 500

libro_blueprint = Blueprint('libro', __name__)


class LibroAPI:
    @staticmethod
    def alta_libro():
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service_account_key.json"
        libro_bq = LibroBigQuery(project_id="ancient-tractor-402615", dataset_id="proyecto", table_id="libro")
        
        data = request.json
        ISBN = data['ISBN']
        titulo = data['titulo']
        cantidad_disponible = data['cantidad_disponible']
        anio_de_publicacion = data['anio_de_publicacion']
        id_idioma = data['id_idioma']
        id_editorial = data['id_editorial']
        imagen_url = data['imagen_url']
        
        success = libro_bq.alta_libro(ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial, imagen_url)
        
        if success:
            return jsonify({"message": "Libro añadido con éxito"}), 201
        else:
            return jsonify({"message": "Error al añadir libro"}), 500

    @staticmethod
    def baja_libro(ISBN):
        libro_bq = LibroBigQuery(project_id="ancient-tractor-402615", dataset_id="proyecto", table_id="libro")
        libro_bq.baja_libro(ISBN)
        return jsonify({"message": "Libro eliminado con éxito"}), 200

    @staticmethod
    def modificar_libro(ISBN):
        libro_bq = LibroBigQuery(project_id="ancient-tractor-402615", dataset_id="proyecto", table_id="libro")
        data = request.json
        # ... (procesamiento de datos)
        libro_bq.modificar_libro(...)
        return jsonify({"message": "Libro modificado con éxito"}), 200
    
    @staticmethod
    def obtener_libro_por_isbn(ISBN):
        libro_bq = LibroBigQuery(project_id="ancient-tractor-402615", dataset_id="proyecto", table_id="libro")
        libro = libro_bq.consulta_libro_por_isbn(ISBN)
        if libro:
            return jsonify(libro), 200
        else:
            return jsonify({"message": "Libro no encontrado"}), 404

    # Método estático para obtener todos los libros
    @staticmethod
    def obtener_libros():
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service_account_key.json"
        catalogo = Catalogo('ancient-tractor-402615', 'proyecto')
        libros = catalogo.obtener_libros()
        libros_json = [dict(row) for row in libros]
        return jsonify(libros_json)

# Rutas
@libro_blueprint.route('/libros', methods=['POST'])
def create_libro():
    return LibroAPI.alta_libro()

@libro_blueprint.route('/libros/<ISBN>', methods=['DELETE'])
def delete_libro(ISBN):
    return LibroAPI.baja_libro(ISBN)

@libro_blueprint.route('/libros/<ISBN>', methods=['PUT'])
def update_libro(ISBN):
    return LibroAPI.modificar_libro(ISBN)

@libro_blueprint.route('/libros/<ISBN>', methods=['GET'])
def get_libro(ISBN):
    return LibroAPI.obtener_libro_por_isbn(ISBN)

@libro_blueprint.route('/libros', methods=['GET'])
def get_libros():
    return LibroAPI.obtener_libros()

app.register_blueprint(libro_blueprint) 

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
