import { Recipe } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes?: Array<Recipe>;
}

export const RecipeList = ({ recipes }: Props) => {
  return (
    <div className="grid justify-items-center gap-y-4 md:gap-y-12 mt-12">
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </div>
  );
};
