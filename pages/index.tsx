import { SearchBar } from "../components/SearchBar";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="mb-24">
        <h1 className="text-6xl">Recipe</h1>
      </div>
      <div className="w-full">
        <SearchBar />
      </div>
    </div>
  );
}
