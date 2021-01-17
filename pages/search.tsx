import { useRouter } from "next/router";
import { useSearch } from "../api-queries/useSearch";
import { RecipeSkeletonView, RecipeView } from "../components/RecipeView";
import Error from "./resources/error.svg";

const ErrorView = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-lg md:text-2xl mt-20 md:mt-8 font-medium">
      Ooops, couldn't fetch the recipe you were looking for
    </h1>
    <div className="w-full mt-8">
      <Error viewBox="0 0 1200 700" width="100%" height="100%" />
    </div>
  </div>
);

const Search = () => {
  const { query } = useRouter();
  // nasty cast
  const { status, data } = useSearch(query.q as string);

  return (
    <div className="flex flex-col place-items-center">
      {status === "loading" ? (
        <RecipeSkeletonView />
      ) : status === "error" ? (
        <ErrorView />
      ) : (
        <div>{data && <RecipeView recipe={data} />}</div>
      )}
    </div>
  );
};

export default Search;
