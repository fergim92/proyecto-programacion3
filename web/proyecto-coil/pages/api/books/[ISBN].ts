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
  const ISBN: string = req.query.ISBN as string;

  switch (req.method) {
  case "GET":
    await handleGet(ISBN, res);
    break;
  case "PUT":
    await handlePut(ISBN, req, res);
    break;
  case "DELETE":
    await handleDelete(ISBN, res);
    break;
  default:
    res.status(405).json({ message: "Método no permitido" });
  }
}

async function handleGet(ISBN: string, res: NextApiResponse) {
  const query = `SELECT * FROM ${fullTableName} WHERE ISBN = @ISBN`;
  const options = {
    query: query,
    params: { ISBN: ISBN },
  };

  try {
    const [rows] = await bigQueryClient.query(options);
    if (rows.length === 0) {
      res.status(404).json({ message: "Libro no encontrado" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error("Error al obtener libro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function handlePut(
  ISBN: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    titulo,
    cantidad_disponible,
    anio_de_publicacion,
    id_idioma,
    id_editorial,
    imagen_url,
  } = req.body;

  const updates = [];
  if (titulo !== undefined) updates.push(`titulo = '${titulo}'`);
  if (cantidad_disponible !== undefined)
    updates.push(`cantidad_disponible = ${cantidad_disponible}`);
  if (anio_de_publicacion !== undefined)
    updates.push(`anio_de_publicacion = ${anio_de_publicacion}`);
  if (id_idioma !== undefined) updates.push(`id_idioma = ${id_idioma}`);
  if (id_editorial !== undefined)
    updates.push(`id_editorial = ${id_editorial}`);
  if (imagen_url !== undefined) updates.push(`imagen_url = '${imagen_url}'`);

  if (updates.length === 0) {
    return res.status(400).json({ message: "No hay datos para actualizar" });
  }

  const query = `
        UPDATE ${fullTableName}
        SET ${updates.join(", ")}
        WHERE ISBN = @ISBN
    `;

  const options = {
    query: query,
    params: { ISBN: ISBN },
  };

  try {
    await bigQueryClient.query(options);
    res.status(200).json({ message: "Libro actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function handleDelete(ISBN: string, res: NextApiResponse) {
  const query = `DELETE FROM ${fullTableName} WHERE ISBN = @ISBN`;
  const options = {
    query: query,
    params: { ISBN: ISBN },
  };

  try {
    await bigQueryClient.query(options);
    res.status(200).json({ message: "Libro eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}