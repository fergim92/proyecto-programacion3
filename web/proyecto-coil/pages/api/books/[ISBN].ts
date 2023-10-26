import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { ISBN },
  } = req;

  const headers = new Headers();
  // Copiar las cabeceras de req.headers al objeto Headers
  for (const key of Object.keys(req.headers)) {
    const value = req.headers[key];
    if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  if (req.method === "POST") {
    const response = await fetch(
      "https://imagenv9-i33jpf2c6a-uc.a.run.app/libros",
      {
        method: req.method,
        headers: headers,
        body: req.body,
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } else if (req.method === "GET") {
    const response = await fetch(
      `https://imagenv9-i33jpf2c6a-uc.a.run.app/libros/${ISBN}`,
      {
        method: req.method,
        headers: headers,
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } else if (req.method === "PUT") {
    const response = await fetch(
      `https://imagenv9-i33jpf2c6a-uc.a.run.app/libros/${ISBN}`,
      {
        method: req.method,
        headers: headers,
        body: req.body,
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } else if (req.method === "DELETE") {
    const response = await fetch(
      `https://imagenv9-i33jpf2c6a-uc.a.run.app/libros/${ISBN}`,
      {
        method: req.method,
        headers: headers,
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
