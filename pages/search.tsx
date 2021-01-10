import { useRouter } from "next/router";
import { useSearch } from "../api-queries/useSearch";
import { RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";

const Search = () => {
  const { query } = useRouter();
  // nasty cast
  const { status, data, error } = useSearch(query.q as string);

  return (
    <div className="flex flex-col place-items-center">
      <div className="p-4 w-96">
        <SearchBar initialValue={query.q as string} />
      </div>
      {status === "loading" ? (
        "loading"
      ) : status === "error" ? (
        `Error: ${error}`
      ) : (
        <div>
          {data && (
            <div>
              <RecipeView recipe={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;