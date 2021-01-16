import { Recipe } from "../types/recipe";
import { RecipeCard, RecipeCardSkeleton } from "./RecipeCard";

interface Props {
  recipes?: Array<Recipe>;
}

export const RecipeList = ({ recipes }: Props) => {
  return (
    <div className="grid justify-items-center gap-y-8 my-12 md:my-8">
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
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
