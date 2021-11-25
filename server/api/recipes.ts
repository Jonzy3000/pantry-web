import { findRecipes } from "./../db/recipesRepository";
import { NextApiRequest, NextApiResponse } from "next";
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
    let size: number;
    let page: number;
    try {
      size = queryParamToNumber(req.query.size);
      page = queryParamToNumber(req.query.page);
    } catch (e) {
      res.status(400);
      return;
    }

    const recipes = await findRecipes(page, size);
    res.status(200).json({ recipes });
  }
}

const queryParamToNumber = (param: string | string[]): number | null => {
  if (Array.isArray(param) || Number.isInteger(param)) {
    throw new Error();
  }

  return param && Number(param);
};
