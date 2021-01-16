import { Recipe } from "../types/recipe";
import Cook from "../pages/resources/cook1.svg";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  recipe: Recipe;
}

export const RecipeImage = ({ recipe, ...rest }: Props) => {
  const className = "h-48 w-full object-cover md:w-48";
  const src = recipe.images[0];
  if (!src) {
    return (
      <div {...rest} className={`bg-gray-50 ${className}`}>
        <Cook viewBox="0 0 700 750" width="100%" height="100%" />
      </div>
    );
  }

  return <img src={recipe.images[0]} {...rest} className={className} />;
};
