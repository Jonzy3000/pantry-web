import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  deleteRecipeForUser,
  getUser,
  saveRecipeForUser,
} from "../../db/usersRepository";
import { User } from "../../../types/user";
import { getUserFromSession } from "../me";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromSession(req);

  if (!user) {
    res.status(401).end();
    return;
  }

  if (req.method === "DELETE") {
    if (Array.isArray(req.query.api)) {
      const recipeId = req.query.api.pop();
      deleteRecipeForUser(user.id, recipeId);
      res.status(204).end();
      return;
    }

    res.status(404).end();
    return;
  }

  res.status(501).end();
}
