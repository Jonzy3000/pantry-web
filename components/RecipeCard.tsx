import React from "react";
import { Recipe } from "../types/recipe";
import Link from "next/link";
import { RecipeImage } from "./RecipeImage";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  console.log(recipe.images);
  return (
    <Link href={`recipes/${recipe.id}`}>
      <div className="max-w-md mx-auto bg-white rounded border border-gray-200 md:max-w-4xl md:w-full overflow-hidden cursor-pointer">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <RecipeImage alt="yummy recipe" recipe={recipe} />
          </div>
          <div className="p-6 flex flex-wrap content-center">
            <div>
              <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                {recipe.title}
              </h1>
              <p className="mt-2 text-gray-500 line-clamp-3">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const RecipeCardSkeleton = () => (
  <div className="max-w-md w-full  mx-auto bg-white rounded border border-gray-200 md:max-w-4xl overflow-hidden cursor-pointer">
    <div className="md:flex animate-pulse w-full">
      <div className="md:flex-shrink-0">
        <div className="h-48 w-full md:w-48 bg-gray-200" />
      </div>
      <div className="p-6 flex flex-wrap w-full content-center space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);
