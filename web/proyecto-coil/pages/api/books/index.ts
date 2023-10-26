import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://imagenv9-i33jpf2c6a-uc.a.run.app/libros",
    {
      method: req.method, // El método de la solicitud (GET, POST, etc.)
    }
  );

  const data = await response.json(); // Transforma la respuesta en JSON

  res.status(response.status).json(data); // Envia la respuesta al cliente
}
