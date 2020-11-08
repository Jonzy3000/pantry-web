import { RecipeView } from "../components/RecipeView";
import { SearchBar } from "../components/SearchBar";
import recipe from "../response.json";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-6xl">Recipe</h1>
      </div>
      <SearchBar />
    </>
  );
}
