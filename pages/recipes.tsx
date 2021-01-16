import React from "react";
import { PrivatePage } from "../components/common/PrivatePage";
import { useUserRecipes } from "../api-queries/useUserRecipes";
import {
  NoRecipes,
  RecipeList,
  RecipeListSkeleton,
} from "../components/RecipeList";

const Recipes = () => {
  const { data: userRecipes, isLoading, isError, isIdle } = useUserRecipes();

  if (isLoading || isIdle) {
    return <RecipeListSkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (userRecipes && userRecipes.length == 0) {
    return <NoRecipes />;
  }

  return (
    <div>
      <h1 className="font-medium text-4xl">My Recipes</h1>
      <RecipeList recipes={userRecipes} />
    </div>
  );
};

const PrivateRecipes = () => (
  <PrivatePage fallback={<RecipeListSkeleton />}>
    <Recipes />
  </PrivatePage>
);

export default PrivateRecipes;
