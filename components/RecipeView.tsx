import { Recipe } from "../types/recipe";
import ReactHtmlParser from "react-html-parser";
import React, { useEffect } from "react";
import { useUser } from "../api-queries/useUser";
import {
  useUserAddRecipeMutation,
  useUserRemoveRecipeMutation,
} from "../api-queries/userMutations";
import { Button } from "./common/Button";
import { RecipeTimeBar } from "./RecipeTimeBar";
import { useRouter } from "next/router";
interface Props {
  recipe: Recipe;
}

const SaveButton = ({ recipeId }: { recipeId: string }) => {
  const { data, isLoading, isIdle, isError, isLoggedOut } = useUser();

  const addMutation = useUserAddRecipeMutation();
  const removeMutation = useUserRemoveRecipeMutation();

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
    return (
      <Button
        variant="info"
        onClick={() => {
          removeMutation.mutate(recipeId);
        }}
      >
        Remove
      </Button>
    );
  }
  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          addMutation.mutate(recipeId);
        }}
      >
        Save
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
      <div className="mt-2">
        {recipe.description && ReactHtmlParser(recipe.description)}
      </div>
      <div className="mt-4 w-full flex justify-center">
        <RecipeTimeBar times={recipe.times} />
      </div>

      <div className="flex  mt-4">
        <div className="flex-grow">
          <h2 className="text-2xl font-medium mb-2">Ingredients</h2>

          <ul className="list-disc list-outside">
            {recipe.ingredients.map((it) => (
              <li className="text-lg ml-4" key={it}>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden sm:block">
          {recipe.images.length > 0 && (
            <img
              className="w-60 ml-15 rounded object-cover"
              src={recipe.images[0]}
            />
          )}
        </div>
      </div>
      <h2 className="text-2xl font-medium mt-8 mb-2">Instructions</h2>
      <div>
        <ul className="list-decimal list-outside">
          {recipe.instructions.map((it) => (
            <li key={Math.random() * 100} className="mb-6 text-lg ml-4">
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
