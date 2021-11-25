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
interface Props {
  recipe: Recipe;
}

const SaveButton = ({ recipe }: { recipe: Recipe }) => {
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

  if (data.recipes.includes(recipe.id)) {
    return (
      <Button
        className="w-24"
        variant="info"
        onClick={() => {
          removeMutation.mutate(recipe.id);
        }}
      >
        Remove
      </Button>
    );
  }
  return (
    <div>
      <Button
        className="w-24"
        variant="primary"
        onClick={() => {
          addMutation.mutate(recipe);
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
      <div className="grid grid-flow-col grid-rows-4 gap-y-4 gap-x-8 pb-6 border-b">
        <div className="col-span-2 row-span-3">
          <h1 className="text-4xl font-semibold">
            <a href={recipe.source} target="#">
              {recipe.title}
            </a>
          </h1>
          <div className="mt-2">
            {recipe.description && ReactHtmlParser(recipe.description)}
          </div>
        </div>
        <div className="col-span-2 self-end flex sm:flex-row-reverse gap-3 justify-between w-full">
          <SaveButton recipe={recipe} />
          <RecipeTimeBar times={recipe.times} />
        </div>
        <div className="hidden sm:block sm:row-span-4">
          {recipe.images.length > 0 && (
            <img
              className="rounded w-full h-full object-cover"
              src={recipe.images[0]}
            />
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Ingredients</h2>

        <ul className="list-disc list-outside">
          {recipe.ingredients.map((it) => (
            <li className="text-lg ml-4" key={it}>
              {it}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Instructions</h2>

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
