import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    // eslint-disable-next-line quotes
    `https://imagenv8-i33jpf2c6a-uc.a.run.app/libros`
  );
  const data = await response.json();
  res.status(200).json(data);
}
