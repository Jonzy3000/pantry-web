import { NextApiRequest, NextApiResponse } from "next";
import meHandler from "../../server/api/me";
import myRecipes from "../../server/api/me/recipes";
import recipesHandler from "../../server/api/recipes";
import searchHandler from "../../server/api/search";
import actionsHandler from "../../server/api/admin/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.url) {
      res.status(404).end();
      return;
    }

    if (req.url.includes("/api/me/recipes/")) {
      await myRecipes(req, res);
      return;
    }

    if (req.url.includes("/api/me")) {
      await meHandler(req, res);
      return;
    }

    if (req.url.includes("/api/recipes")) {
      await recipesHandler(req, res);
      return;
    }

    if (req.url.includes("/api/search")) {
      await searchHandler(req, res);
      return;
    }

    if (req.url.includes("/api/admin/action")) {
      await actionsHandler(req, res);
      return;
    }

    res.status(404).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}
