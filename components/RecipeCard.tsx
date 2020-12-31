import { Recipe } from "../types/recipe";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="p-4 mt-8 border">
      <div className="text-xl">{recipe.title}</div>
      <div className="text-base">{recipe.description}</div>
    </div>
  );
};
