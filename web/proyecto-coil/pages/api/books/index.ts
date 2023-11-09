import { NextApiRequest, NextApiResponse } from "next";
import { BigQuery } from "@google-cloud/bigquery";

let bigQueryClient: BigQuery;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
  // Decodificar la variable de entorno que contiene tus credenciales en Base64
  const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
  const credentialsJson = Buffer.from(credentialsBase64, "base64").toString("utf8");

  bigQueryClient = new BigQuery({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: JSON.parse(credentialsJson),
  });
} else {
  console.error("No se encontraron las credenciales de Google Cloud.");
}

const datasetId = process.env.BIGQUERY_DATASET_ID;
const tableLibros = process.env.BIGQUERY_TABLE_LIBROS;
const fullTableName = `${datasetId}.${tableLibros}`;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
  case "GET":
    await handleGet(req, res);
    break;
  case "POST":
    await handlePost(req, res);
    break;
  default:
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const queryLibros = `SELECT * FROM ${fullTableName};`;

  try {
    const [rows] = await bigQueryClient.query(queryLibros);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const {
    ISBN,
    titulo,
    cantidad_disponible,
    anio_de_publicacion,
    id_idioma,
    id_editorial,
    imagen_url,
  } = req.body;

  const query = `
    INSERT INTO ${fullTableName} (ISBN, titulo, cantidad_disponible, anio_de_publicacion, id_idioma, id_editorial, imagen_url)
    VALUES (@ISBN, @titulo, @cantidad_disponible, @anio_de_publicacion, @id_idioma, @id_editorial, @imagen_url)
  `;

  const options = {
    query: query,
    location: "US", // Cambia según tu configuración en BigQuery
    params: {
      ISBN,
      titulo,
      cantidad_disponible,
      anio_de_publicacion,
      id_idioma,
      id_editorial,
      imagen_url,
    },
  };

  try {
    await bigQueryClient.query(options);
    res.status(200).json({ message: "Libro insertado con éxito" });
  } catch (error) {
    console.error("Error al insertar el libro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
