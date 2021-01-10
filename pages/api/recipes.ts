import { NextApiRequest, NextApiResponse } from "next";
import { findAllByIds } from "../../server/infrastructure/mongodb/recipesRepository";
import { getUserFromSession } from "./me";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user = await getUserFromSession(req);

    if (!user) {
      res.status(401).end();
    }

    const recipes = await findAllByIds(user.recipes);
    res.status(200).json({ recipes });
  }
}