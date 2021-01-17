import React from "react";
import { PrivatePage } from "../components/common/PrivatePage";
import { useUserRecipes } from "../api-queries/useUserRecipes";
import {
  NoRecipes,
  RecipeList,
  RecipeListSkeleton,
} from "../components/RecipeList";

const MyRecipeTitle = () => (
  <h1 className="font-medium text-4xl">My Recipes</h1>
);

const Recipes = () => {
  const { data: userRecipes, isLoading, isError, isIdle } = useUserRecipes();

  if (isLoading || isIdle) {
    return (
      <div>
        <MyRecipeTitle />
        <RecipeListSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (userRecipes && userRecipes.length == 0) {
    return <NoRecipes />;
  }

  return (
    <div>
      <MyRecipeTitle />
      <RecipeList recipes={userRecipes} />
    </div>
  );
};

const PrivateRecipes = () => (
  <PrivatePage
    fallback={
      <div>
        <MyRecipeTitle /> <RecipeListSkeleton />
      </div>
    }
  >
    <Recipes />
  </PrivatePage>
);

export default PrivateRecipes;
