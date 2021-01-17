import { findNestedRecipeSchema } from "./scrapeRecipe";

export const getRecipeSchema = (ldJsons: string[]): any => {
  const result = ldJsons
    .map((i) => {
      const json = JSON.parse(i);

      if (Array.isArray(json)) {
        const potentialMatch = findNestedRecipeSchema(json);
        if (potentialMatch) {
          return potentialMatch;
        }
      }

      if (Array.isArray(json["@graph"])) {
        const potentialMatch = findNestedRecipeSchema(json["@graph"]);
        if (potentialMatch) {
          return potentialMatch;
        }
      }

      if (json["@type"]?.toLowerCase() === "recipe") {
        return json;
      }

      return false;
    })
    .find((i) => i != false);

  if (!result) {
    throw "Incorrect json schema";
  } else {
    return result;
  }
};
