import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { ISBN },
  } = req;

  const url = `https://imagenv33-i33jpf2c6a-uc.a.run.app/libros/${ISBN}`;

  if (req.method === "GET") {
    const response = await fetch(url, {
      method: req.method,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } else if (req.method === "PUT") {
    const response = await fetch(url, {
      method: req.method,
      body: req.body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } else if (req.method === "DELETE") {
    const response = await fetch(url, {
      method: req.method,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
