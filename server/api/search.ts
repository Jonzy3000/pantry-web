import { NextApiRequest, NextApiResponse } from "next";
import { findRecipeBySource, saveRecipe } from "../db/recipesRepository";
import { scrapeRecipe } from "../scrape/scrapeRecipe";
import { Recipe } from "../../types/recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const url = req.query?.url;

    if (!url || Array.isArray(url)) {
      res.status(400).send("Url query param must be a string");
      return;
    }

    try {
      const recipe = await getRecipe(url);
      saveRecipe(recipe);
      res.status(200).json(recipe);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(501).end();
  }
}

const getRecipe = async (url: string): Promise<Recipe> => {
  const cachedRecipe = await findRecipeBySource(url);
  if (cachedRecipe) {
    console.log("Using mongo recipe");
    return cachedRecipe;
  } else {
    console.log("Scraping recipe from, ", url);
    const scrapedRecipe = await scrapeRecipe(url);
    return scrapedRecipe;
  }
};
