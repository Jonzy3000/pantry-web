import { Recipe } from "../types/recipe";
import Cook from "../pages/resources/cook1.svg";
import { useEffect, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  recipe: Recipe;
}

export const RecipeImage = ({ recipe, ...rest }: Props) => {
  const src = recipe.images[0];
  const [image, status] = useImage(src);

  const className = "h-48 w-full object-cover md:w-48";
  if (!src || status == "failed") {
    return (
      <div {...rest} className={`bg-gray-50 ${className}`}>
        <Cook viewBox="0 0 700 750" width="100%" height="100%" />
      </div>
    );
  }

  if (status == "loading") {
    return (
      <div className="animate-pulse">
        <div className={className}></div>
      </div>
    );
  }

  return <img src={image.src} className={className} {...rest} />;
};

var defaultState = { image: undefined, status: "loading" };

const useImage = (url) => {
  const [{ image, status }, setState] = useState(defaultState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const imgElement = new Image();

    const onLoad = () => {
      setState({ image: imgElement, status: "loaded" });
    };

    const onError = () => {
      setState({ image: undefined, status: "failed" });
    };

    imgElement.addEventListener("load", onLoad);
    imgElement.addEventListener("error", onError);
    imgElement.src = url;

    return () => {
      imgElement.removeEventListener("load", onLoad);
      imgElement.removeEventListener("error", onError);
      setState(defaultState);
    };
  }, [url]);

  return [image, status];
};
