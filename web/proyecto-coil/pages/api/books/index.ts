import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await fetch(
      "https://imagenv9-i33jpf2c6a-uc.a.run.app/libros",
      {
        method: req.method,
        body: req.body,
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    const response = await fetch(
      "https://imagenv9-i33jpf2c6a-uc.a.run.app/libros",
      {
        method: req.method,
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  }
}
