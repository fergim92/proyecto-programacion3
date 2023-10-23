# app.py
from flask import Flask, jsonify, request
from Catalogo import Catalogo
import os
app = Flask(__name__)

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service_account_key.json"
catalogo = Catalogo('ancient-tractor-402615', 'proyecto')

@app.route('/libros', methods=['GET'])
def obtener_libros():
    libros = catalogo.obtener_libros()
    # Convierte tus libros a un formato que pueda ser enviado como JSON
    libros_json = [dict(row) for row in libros]
    return jsonify(libros_json)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)


