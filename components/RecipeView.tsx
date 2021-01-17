import { Recipe } from "../types/recipe";
import ReactHtmlParser from "react-html-parser";
import React from "react";
import { signIn } from "next-auth/client";
import { useUser } from "../api-queries/useUser";
import { useUserMutation } from "../api-queries/useUserMutation";
import { Button } from "./common/Button";
import { Clock } from "heroicons-react";
import { timeStamp } from "console";
import { RecipeTimeBar } from "./RecipeTimeBar";
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
      <div className="flex  space-x-4 justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-semibold">{recipe.title}</h1>
        </div>
        <SaveButton recipeId={recipe.id} />
      </div>
      <div>{recipe.description && ReactHtmlParser(recipe.description)}</div>
      <div className="mt-4 w-full flex justify-center">
        <RecipeTimeBar times={recipe.times} />
      </div>

      <h2 className="text-2xl font-medium mt-8 mb-2">Ingredients</h2>
      <div>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((it) => (
            <li className="text-lg" key={it}>
              {it}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-medium mt-8 mb-2">Instructions</h2>
      <div>
        <ul className="list-decimal list-inside">
          {recipe.instructions.map((it) => (
            <li key={Math.random() * 100} className="mb-6 text-lg">
              {ReactHtmlParser(it)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const RecipeSkeletonView = () => {
  return (
    <div className="px-4 w-full animate-pulse">
      <div className="flex space-x-4 w-full justify-between items-center mt-4">
        <div className="bg-gray-200 h-8 rounded w-48"></div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-4xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-4xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
      </div>
      <div className="mt-8">
        <div className="bg-gray-200 h-8 rounded w-48"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-96"></div>
      </div>
      <div className="mt-8">
        <div className="bg-gray-200 h-8 rounded w-48"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-4xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-4xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-xl"></div>
        <div className="bg-gray-100 mt-2 h-6 rounded w-full max-w-4xl"></div>
      </div>
    </div>
  );
};
