# proyecto-programacion3

Aquí te dejo tu texto en formato Markdown:

```markdown
# Gestión de Biblioteca

Una biblioteca está interesada en automatizar la gestión de préstamos. Según el enunciado del problema de la sesión COIL 2 y siguiendo la distribución de las preguntas para cada uno de los estudiantes (o grupos), se pide:

Codificar un programa en **PYTHON** para automatizar la gestión de préstamos en la biblioteca.

## Grupo 1: Laura – Lucas - Mariela
### Diseñar el procesamiento de los PRÉSTAMOS:
- Diseñar las **Altas de Préstamos** con los siguientes atributos: ID (código único), fecha de préstamo, fecha de devolución, y estado (por ejemplo: activo, devuelto, vencido).
- Diseñar las **Bajas de Préstamos**.
- Diseñar las **Modificaciones de Préstamos**.
- Diseñar las **Consultas de Préstamos**.

#### Relaciones:
- Un préstamo está asociado a un usuario, pero un usuario puede tener varios préstamos activos.
- Un préstamo se realiza en una sucursal, pero una sucursal puede tener varios préstamos activos.
- Un préstamo puede involucrar varios libros, y un libro puede estar involucrado en varios préstamos.
- Un préstamo es realizado por un empleado, pero un empleado puede realizar varios préstamos.
- Un evento puede tener varios préstamos asociados, y un préstamo puede estar relacionado con un evento (por ejemplo, eventos de promoción de lectura).

## Grupo 2: José – Cristian - Esteban
### Diseñar el procesamiento de los USUARIOS:
- Diseñar las **Altas de Usuarios** con los siguientes atributos: ID (código único), nombre, dirección y correo electrónico.
- Diseñar las **Bajas de Usuarios**.
- Diseñar las **Modificaciones de Usuarios**.
- Diseñar las **Consultas de Usuarios**.

#### Relaciones:
- Un préstamo está asociado a un usuario, pero un usuario puede tener varios préstamos activos.
- Un usuario es afiliado a una membresía, y a una membresía pueden afiliarse muchos usuarios.

## Grupo 3: Tomás - Jonás
### Diseñar el procesamiento de los EMPLEADOS:
- Diseñar las **Altas de Empleados** con los siguientes atributos: ID (código único), nombre, cargo y fecha de contratación.
- Diseñar las **Bajas de Empleados**.
- Diseñar las **Modificaciones de Empleados**.
- Diseñar las **Consultas de Empleados**.

#### Relaciones:
- Un préstamo es realizado por un empleado, pero un empleado puede realizar varios préstamos.
- Un evento es organizado por un empleado, y un empleado puede organizar varios eventos.

## Grupo 4: Fernando - Mauricio
### Diseñar el procesamiento de los LIBROS:
- Diseñar las **Altas de Libros** con los siguientes atributos: ISBN (código único), título, año de publicación y cantidad disponible.
- Diseñar las **Bajas de Libros**.
- Diseñar las **Modificaciones de Libros**.
- Diseñar las **Consultas de Libros**.

#### Relaciones:
- Un autor puede haber escrito varios libros y un libro puede tener varios autores.
- Un libro puede pertenecer a una o varias categorías y una categoría puede tener varios libros.
- Un libro está escrito en un idioma específico.
- Un evento puede tener varios libros asociados, y un libro puede estar relacionado con varios eventos (por ejemplo, libros destacados en eventos).
- Un libro es publicado por una editorial, pero una editorial puede publicar varios libros.
- Un préstamo puede involucrar varios libros, y un libro puede estar involucrado en varios préstamos.

## Grupo 5: Diego - Agostina
### Diseñar el procesamiento de los AUTORES:
- Diseñar las **Altas de Autores** con los siguientes atributos: ID (código único), nombre y nacionalidad.
- Diseñar las **Bajas de Autores**.
- Diseñar las **Modificaciones de Autores**.
- Diseñar las **Consultas de Autores**.

#### Relaciones:
- Un autor puede haber escrito varios libros y un libro puede tener varios autores.

## Todos:
- Elaborar el **Diseño de Altas, Bajas, Modificaciones y Consultas** de la Biblioteca. Asimismo, deben integrar las tres partes para obtener un diseño único.
- Elaborar el Programa para la **Gestión de la Biblioteca** según lo diseñado.

Además de Préstamos, Usuarios y Empleados, intervienen las siguientes entidades:
- **CATEGORÍAS** de libros con atributos: ID (código único) y nombre de la categoría.
- **IDIOMAS** con los atributos: ID (código único) y nombre del idioma.
- **SUCURSALES** con los atributos: ID (código único), nombre y ubicación.
- **EDITORIALES** con los atributos: ID (código único), nombre y país.
- **MEMBRESÍAS** de usuarios con los atributos: ID (código único), tipo de membresía y fecha de vencimiento.
- **EVENTOS** de la biblioteca con los atributos: ID (código único), nombre del evento, fecha y lugar.

### Notas:
Un "evento" representa una actividad o reunión planificada que tiene lugar en la biblioteca. Estos eventos pueden variar en naturaleza y propósito, y pueden incluir actividades como charlas de autores, clubes de lectura, talleres educativos, ferias del libro y otras iniciativas para fomentar la participación de la comunidad y promover la cultura de la lectura.

Una "categoría" representa una clasificación o etiqueta que se asigna a los libros para organizarlos y facilitar su búsqueda y selección por parte de los usuarios. Por ejemplo, en una biblioteca, los libros pueden clasificarse en diversas categorías como "Ficción", "No Ficción", "Ciencia Ficción", "Historia", "Biografía", etc. Cada categoría proporciona una manera de agrupar y organizar los libros según su temática o género.

Asuma todo lo que crea conveniente; puede agregar otros atributos en las entidades de ser necesario.

```

Espero que te sirva.
