# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /backend

# Copia los archivos de tu aplicación al contenedor
COPY . .

# Actualiza pip
RUN pip install --no-cache-dir --upgrade pip

# Instala las dependencias de la aplicación
RUN pip install -r requirements.txt

# Expone el puerto en el que se ejecutará la aplicación Flask
EXPOSE 8080

# Comando para ejecutar la aplicación Flask
CMD ["python", "app.py"]

