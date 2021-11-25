import { useQuery } from "react-query";
import { Recipe } from "../types/recipe";

export const useRecipes = (initialRecipes: Array<Recipe> | null = null) => {
  return useQuery(
    "recipes",
    () =>
      fetch("/api/recipes?size=5&page=0").then((res) => {
        if (res.ok) {
          return res.json().then((json) => json["recipes"]);
        } else {
          throw new Error();
        }
      }),
    {
      initialData: initialRecipes,
    }
  );
};
