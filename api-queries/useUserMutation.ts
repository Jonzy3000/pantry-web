import { useMutation, useQueryClient } from "react-query";
import { User } from "../types/user";

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (recipeId: string) =>
      fetch("/api/me", {
        method: "PATCH",
        body: JSON.stringify({ recipeId }),
        headers: { "Content-Type": "application/json" },
      }),
    {
      onMutate: async (newRecipe) => {
        const user = queryClient.getQueryData<User>("me");
        queryClient.setQueryData("me", {
          ...user,
          recipes: [...user.recipes, newRecipe],
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries("me");
      },
    }
  );
};
