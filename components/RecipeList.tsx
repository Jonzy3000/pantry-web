import { Recipe } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes?: Array<Recipe>;
}

export const RecipeList = ({ recipes }: Props) => {
  return (
    <div>
      {recipes && recipes.map((recipe) => <RecipeCard recipe={recipe} />)}
    </div>
  );
};
