import { useRouter } from "next/router";
import React from "react";
import { Recipe } from "../types/recipe";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <Link href={`recipes/${recipe.id}`}>
      <div className="p-4 mt-8 border">
        <div className="text-xl">{recipe.title}</div>
        <div className="text-base">{recipe.description}</div>
      </div>
    </Link>
  );
};
