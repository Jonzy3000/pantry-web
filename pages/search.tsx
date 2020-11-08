import { useRouter } from "next/router";
import { useSearch } from "../api-queries/useSearch";
import { RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";

const Search = () => {
  const { query } = useRouter();

  // nasty cast
  const { status, data, error } = useSearch(query.q as string);

  return (
    <div>
      <SearchBar initialValue={query.q as string} />
      {status === "loading" ? (
        "loading"
      ) : status === "error" ? (
        `Error: ${error}`
      ) : (
        <div>
          <RecipeView recipe={data} />
        </div>
      )}
    </div>
  );
};

export default Search;
