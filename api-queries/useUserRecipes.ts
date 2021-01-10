import { useQuery } from "react-query";
import { Recipe } from "../types/recipe";
import { useUser } from "./useUser";

export const useUserRecipes = () => {
  const { data: user } = useUser();

  const userId = user?.id;

  return useQuery<Array<Recipe>>(
    ["myRecipes", userId],
    () =>
      fetch("/api/recipes").then((res) => {
        if (res.ok) {
          return res.json().then((json) => json.recipes);
        } else {
          throw new Error();
        }
      }),
    { enabled: !!userId }
  );
};
