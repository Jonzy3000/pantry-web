import { Recipe } from "../types/recipe";
import ReactHtmlParser from "react-html-parser";

interface Props {
  recipe: Recipe;
}

export const RecipeView = ({ recipe }: Props) => {
  return (
    <div>
      <div>{recipe.title}</div>
      <div>{recipe.description && ReactHtmlParser(recipe.description)}</div>
      <div>
        {recipe.ingredients.map((it) => (
          <div key={it}>{it}</div>
        ))}
      </div>
      <div>{recipe.instructions.map((it) => ReactHtmlParser(it))}</div>
    </div>
  );
};
