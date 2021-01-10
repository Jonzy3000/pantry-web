import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  getUser,
  saveRecipeForUser,
} from "../../server/infrastructure/mongodb/usersRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session?.accessToken) {
    res.status(401).end();
  }
  const user = await getUser(session.accessToken);
  if (!user) {
    res.status(401).end();
  }

  if (req.method == "PATCH") {
    const { recipeId } = req.body;

    if (typeof recipeId !== "string") {
      res.status(400).send("Invalid recipeId");
    }

    await saveRecipeForUser(user.id, recipeId);
    res.status(201).end();
  }

  if (req.method == "GET") {
    res.status(200).json(user);
  }

  res.status(501).end();
}
