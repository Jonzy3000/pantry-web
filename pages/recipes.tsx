import React from "react";
import { PrivatePage } from "../components/common/PrivatePage";
import { useUserRecipes } from "../api-queries/useUserRecipes";
import { useQueryClient } from "react-query";
import { User } from "../types/user";
import { RecipeList } from "../components/RecipeList";

const Recipes = () => {
  const { data: userRecipes, isLoading, isError, isIdle } = useUserRecipes();

  if (isLoading || isIdle) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <RecipeList recipes={userRecipes} />
    </div>
  );
};

const PrivateRecipes = () => (
  <PrivatePage>
    <Recipes />
  </PrivatePage>
);

export default PrivateRecipes;
