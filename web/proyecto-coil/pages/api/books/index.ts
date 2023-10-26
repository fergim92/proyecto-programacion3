import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = new Headers();

  // Copiar las cabeceras de req.headers al objeto Headers
  for (const key of Object.keys(req.headers)) {
    const value = req.headers[key];
    if (typeof value === "string") {
      headers.set(key, value);
    }
  }
  const response = await fetch(
    "https://imagenv9-i33jpf2c6a-uc.a.run.app/libros",
    {
      method: req.method, // El método de la solicitud (GET, POST, etc.)
      headers: headers, // Las cabeceras de la solicitud
    }
  );

  const data = await response.json(); // Transforma la respuesta en JSON

  res.status(response.status).json(data); // Envia la respuesta al cliente
}
