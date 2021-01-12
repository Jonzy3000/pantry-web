import { NextApiRequest, NextApiResponse } from "next";
import { findRecipesByIds } from "../db/recipesRepository";
import { getUserFromSession } from "./me";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromSession(req);

  if (!user) {
    res.status(401).end();
    return;
  }

  if (req.method === "GET") {
    const recipes = await findRecipesByIds(user.recipes);
    res.status(200).json({ recipes });
  }
}
