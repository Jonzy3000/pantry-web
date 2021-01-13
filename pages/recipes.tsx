import React from "react";
import { PrivatePage } from "../components/common/PrivatePage";
import { useUserRecipes } from "../api-queries/useUserRecipes";
import { RecipeList, RecipeListSkeleton } from "../components/RecipeList";

const Recipes = () => {
  const { data: userRecipes, isLoading, isError, isIdle } = useUserRecipes();

  if (isLoading || isIdle) {
    return <RecipeListSkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return <RecipeList recipes={userRecipes} />;
};

const PrivateRecipes = () => (
  <PrivatePage fallback={RecipeListSkeleton}>
    <Recipes />
  </PrivatePage>
);

export default PrivateRecipes;
