import { NextApiRequest, NextApiResponse } from "next";
import { rescrapeAllRecipes } from "../../scrape/rescrapeAllRecipes";
import { getUserFromSession } from "./../me";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromSession(req);

  if (!user || !user.roles.includes("admin")) {
    res.status(401).end();
    return;
  }

  console.log(req.method);
  console.log(req.body);
  if (req.method === "POST") {
    if (req.body["type"] === "rescrape") {
      await rescrapeAllRecipes();
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }
}
