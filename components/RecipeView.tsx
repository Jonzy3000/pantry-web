import { Recipe } from "../types/recipe";
import ReactHtmlParser from "react-html-parser";
import React from "react";
import { signIn } from "next-auth/client";
import { useUser } from "../api-queries/useUser";
import { useUserMutation } from "../api-queries/useUserMutation";
import { Button } from "./common/Button";

interface Props {
  recipe: Recipe;
}

const SaveButton = ({ recipeId }: { recipeId: string }) => {
  const { data, isLoading, isIdle, isError, isLoggedOut } = useUser();

  const mutation = useUserMutation();

  if (isLoggedOut) {
    return <></>;
  }

  if (isLoading || isIdle) {
    return <Button variant="loading" />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (data.recipes.includes(recipeId)) {
    // TODO add unsave
    return <></>;
  }
  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          mutation.mutate(recipeId);
        }}
      >
        Save Recipe
      </Button>
    </div>
  );
};

export const RecipeView = ({ recipe }: Props) => {
  return (
    <div className="px-4">
      <div className="flex h-14 space-x-4 justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-semibold">{recipe.title}</h1>
        </div>
        <SaveButton recipeId={recipe.id} />
      </div>
      <div>{recipe.description && ReactHtmlParser(recipe.description)}</div>

      <h2 className="text-2xl mt-8 mb-2">Ingredients</h2>
      <div>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl mt-8 mb-2">Instructions</h2>
      <div>
        <ul className="list-decimal list-inside">
          {recipe.instructions.map((it) => (
            <li key={Math.random() * 100} className="mb-6">
              {ReactHtmlParser(it)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
