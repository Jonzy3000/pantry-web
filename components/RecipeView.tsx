import { Recipe } from "../types/recipe";
import ReactHtmlParser from "react-html-parser";

interface Props {
  recipe: Recipe;
}

export const RecipeView = ({ recipe }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4">{recipe.title}</h1>
      <div>{recipe.description && ReactHtmlParser(recipe.description)}</div>
      <h2 className="text-2xl mt-8 mb-2">Ingredients</h2>
      <div>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl mt-8 mb-2">Instructions</h2>
      <div>
        <ul className="list-decimal list-inside">
          {recipe.instructions.map((it) => (
            <li className="mb-6">{ReactHtmlParser(it)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
