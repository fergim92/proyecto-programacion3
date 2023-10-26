# Usamos una imagen base de Python
FROM python:3.9-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /backend
ENV PYTHONPATH /backend

# Copiamos los archivos de requisitos primero para optimizar la construcción del contenedor (usando la caché de Docker)
COPY requirements.txt requirements.txt

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto de los archivos
COPY . .

# Exponemos el puerto que nuestra aplicación usará
EXPOSE 8080


# Establecemos la variable de entorno para las credenciales de Google Cloud (si estás usando un archivo JSON como credencial)
ENV GOOGLE_APPLICATION_CREDENTIALS=service_account_key.json

CMD ["python", "-m", "routes.LibroAPI"]


