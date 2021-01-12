import { saveRecipe } from "../db/recipesRepository";
import { scrapeRecipe } from "./scrapeRecipe";
import { streamAllRecipes } from "./../db/recipesRepository";

export const rescrapeAllRecipes = async () => {
  const endPromise = new Promise<void>((resolve) => {
    streamAllRecipes(
      (recipe) =>
        scrapeRecipe(recipe.source)
          .then((newRecipe) => saveRecipe(newRecipe))
          .catch((e) => {
            console.log("could not re-scrape recipe:", recipe.id, "because", e);
          }),
      () => resolve()
    );
  });

  await endPromise;
  console.log("done");
};
