import { useRouter } from "next/router";
import { useFirestore, useUser } from "reactfire";
import { useSearch } from "../api-queries/useSearch";
import { RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";
import "firebase/auth";
import { LoginButton } from "../components/login/LoginButton";
import { FirestoreProvider } from "../components/common/FirestoreProvider";
import { Recipe } from "../types/recipe";

const SaveOrLoginButton = ({ recipe }: { recipe: Recipe }) => {
  const { data: user } = useUser();
  return (
    <>
      {user ? (
        <FirestoreProvider>
          <SaveButton recipe={recipe} />
        </FirestoreProvider>
      ) : (
        <LoginButton />
      )}
    </>
  );
};

const SaveButton = ({ recipe }: { recipe: Recipe }) => {
  const { data: user } = useUser();

  const recipeRef = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("recipes");

  return (
    <button value="Save" onClick={() => recipeRef.add(recipe)}>
      Save
    </button>
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
              <SaveOrLoginButton recipe={data} />
              <RecipeView recipe={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
