import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { ISBN } = req.query;

  const url = `https://imagenv9-i33jpf2c6a-uc.a.run.app/libros${
    ISBN ? `/${ISBN}` : ""
  }`; // Asegúrate de cambiar esto a la URL de tu API

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
  } else if (method === "PUT") {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } else if (method === "DELETE") {
    const response = await fetch(url, { method });
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
