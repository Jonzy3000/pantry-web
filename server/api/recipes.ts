import { NextApiRequest, NextApiResponse } from "next";
import { performance } from "perf_hooks";
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
    const startTime = performance.now();
    const recipes = await findRecipesByIds(user.recipes);
    const endTime = performance.now();

    console.log(`Finding recipes took ${endTime - startTime}ms`)

    res.status(200).json({ recipes });
  }
}
