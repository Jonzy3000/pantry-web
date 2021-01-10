import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useSearch } from "../api-queries/useSearch";
import { useUser } from "../api-queries/useUser";
import { useUserMutation } from "../api-queries/useUserMutation";
import { RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";

const SaveButton = ({ recipeId }: { recipeId: string }) => {
  const { data, isLoading, isIdle, isError, isLoggedOut } = useUser();

  const mutation = useUserMutation();

  if (isLoggedOut) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  if (isLoading || isIdle) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (data.recipes.includes(recipeId)) {
    return <div>Saved</div>;
  }
  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate(recipeId);
        }}
      >
        Save Recipe
      </button>
    </div>
  );
};

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
              <SaveButton recipeId={data.id} />
              <RecipeView recipe={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
