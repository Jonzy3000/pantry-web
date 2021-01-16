import { Recipe } from "../types/recipe";
import { RecipeCard, RecipeCardSkeleton } from "./RecipeCard";
import Missing from "../pages/resources/missing.svg";

interface Props {
  recipes?: Array<Recipe>;
}

export const RecipeList = ({ recipes }: Props) => {
  return (
    <div>
      <div className="grid justify-items-center gap-y-8 my-12 md:my-8">
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export const NoRecipes = () => {
  return (
    <div>
      <div className="mb-24 mt-8">
        <h1 className="text-4xl">No Recipes</h1>
        <p className="text-xl">
          Looks like you've saved no recipes. Search for recipes and save the
          ones you like
        </p>
      </div>
      <div className="flex justify-center w-full">
        <Missing viewBox="0 0 1000 833" height="600" />
      </div>
    </div>
  );
};

export const RecipeListSkeleton = () => {
  return (
    <div className="grid justify-items-center gap-y-4 my-12 md:gap-y-8 md:my-8">
      {[1, 2, 3, 5, 6].map((it) => (
        <RecipeCardSkeleton key={it} />
      ))}
    </div>
  );
};
