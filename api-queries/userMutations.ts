import { useMutation, useQueryClient } from "react-query";
import { deleteRecipeForUser } from "../server/db/usersRepository";
import { Recipe } from "../types/recipe";
import { User } from "../types/user";

export const useUserAddRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (recipe: Recipe) =>
      fetch("/api/me", {
        method: "PATCH",
        body: JSON.stringify({ recipeId: recipe.id }),
        headers: { "Content-Type": "application/json" },
      }),
    {
      onMutate: async (newRecipe) => {
        await queryClient.cancelQueries("me");

        const user = queryClient.getQueryData<User>("me");
        const myRecipes =
          queryClient.getQueryData<Array<Recipe>>("myRecipes") || [];

        queryClient.setQueryData("me", {
          ...user,
          recipes: [...user.recipes, newRecipe.id],
        });

        queryClient.setQueryData("myRecipes", [newRecipe, ...myRecipes]);
      },
      onSettled: () => {
        queryClient.invalidateQueries("me");
        queryClient.invalidateQueries("myRecipies");
      },
    }
  );
};

export const useUserRemoveRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (recipeId: string) =>
      fetch(`/api/me/recipes/${recipeId}`, {
        method: "DELETE",
      }),
    {
      onMutate: async (deletedRecipe) => {
        await queryClient.cancelQueries("me");
        const user = queryClient.getQueryData<User>("me");
        const myRecipes = queryClient.getQueryData<Array<Recipe>>("myRecipes");

        queryClient.setQueryData("me", {
          ...user,
          recipes: user.recipes.filter((id) => id !== deletedRecipe),
        });

        queryClient.setQueryData(
          "myRecipes",
          myRecipes.filter((recipes) => recipes.id !== deletedRecipe)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries("myRecipies");
        queryClient.invalidateQueries("me");
      },
    }
  );
};
