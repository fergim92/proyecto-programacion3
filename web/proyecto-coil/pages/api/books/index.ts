import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const url = "https://imagenv33-i33jpf2c6a-uc.a.run.app/libros";

  if (method === "POST") {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } else if (method === "GET") {
    const response = await fetch(url, { method });
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
