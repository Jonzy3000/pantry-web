import { convertImages } from "./convertImages";
import fetch from "node-fetch";
import cheerio from "cheerio";
import crypto from "crypto";
import { stripHtml } from "./stripHtml";
import { convertInstructions } from "./convertInstructions";
import { getRecipeSchema } from "./getRecipeSchema";
import { Recipe } from "../../types/recipe";
import { saveRecipe } from "../db/recipesRepository";

export const scrapeRecipe = async (url: string): Promise<Recipe> => {
  const html = await fetch(url)
    .then((data) => data.text())
    .catch(() => {
      throw "Bad url";
    });

  const $ = cheerio.load(html);

  // https://schema.org/Recipe
  const ldJsons = $('script[type="application/ld+json"]')
    .toArray()
    .map((ld) => $(ld).html())
    .filter((i) => i != null) as string[];

  try {
    if (!ldJsons) {
      throw new Error("catch me if you can");
    }

    const recipeJson = getRecipeSchema(ldJsons);

    const ingredients = recipeJson["recipeIngredient"];

    const instructions = convertInstructions(recipeJson["recipeInstructions"]);

    const hashedId = crypto.createHash("sha1").update(url).digest("hex");

    return {
      id: hashedId,
      images: convertImages(recipeJson["image"]),
      source: url,
      ingredients,
      instructions,
      title: stripHtml(recipeJson["name"]),
      description:
        recipeJson["description"] && stripHtml(recipeJson["description"]),
      times: {
        cook: recipeJson["cookTime"],
        prep: recipeJson["prepTime"],
        total: recipeJson["totalTime"],
      },
    };
  } catch (e) {
    console.error(e);
    doItTheHardway($);

    throw "Could not find recipe";
  }
};

export const findNestedRecipeSchema = (array: any[]): any | undefined => {
  return array.find((it) => it["@type"] === "Recipe");
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const doItTheHardway = (_$: cheerio.Root) => {};
