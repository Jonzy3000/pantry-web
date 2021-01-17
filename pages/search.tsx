import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useSearch } from "../api-queries/useSearch";
import { useUser } from "../api-queries/useUser";
import { useUserMutation } from "../api-queries/useUserMutation";
import { RecipeSkeletonView, RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";

const Search = () => {
  const { query } = useRouter();
  // nasty cast
  const { status, data, error } = useSearch(query.q as string);

  return (
    <div className="flex flex-col place-items-center">
      {status === "loading" ? (
        <RecipeSkeletonView />
      ) : status === "error" ? (
        `Error: ${error}`
      ) : (
        <div>{data && <RecipeView recipe={data} />}</div>
      )}
    </div>
  );
};

export default Search;
