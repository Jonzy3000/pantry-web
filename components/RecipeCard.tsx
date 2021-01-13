import React from "react";
import { Recipe } from "../types/recipe";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <Link href={`recipes/${recipe.id}`}>
      <div className="max-w-md mx-auto bg-white rounded border border-gray-200 md:max-w-4xl md:w-full overflow-hidden cursor-pointer">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={recipe.images[0]}
              alt="yummy recipe"
            />
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
