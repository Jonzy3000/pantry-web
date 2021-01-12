import { NextApiRequest, NextApiResponse } from "next";
import meHandler from "../../server/api/me";
import recipesHandler from "../../server/api/recipes";
import searchHandler from "../../server/api/search";
import actionsHandler from "../../server/api/admin/actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.url);
  console.log(req.query);
  try {
    if (!req.url) {
      console.log(404);
      res.status(404).end();
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
