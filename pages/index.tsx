import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { RecipeList, RecipeListSkeleton } from "../components/RecipeList";
import { SearchBar } from "../components/SearchBar";
import { findRecipes } from "../server/db/recipesRepository";
import { Recipe } from "../types/recipe";
import _ from "next/head"

export default function Home({ recipes }: { recipes: Array<Recipe> }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-screen justify-center rounded items-center h-64 bg-slate-100">
        <div className="flex flex-col">
          <h1 className="text-purple-700 px-4 text-center text-2xl md:text-5xl mb-12 font-semibold">
            All your online recipes in one place
          </h1>
          <SearchBar />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mt-8 px-4 lg:px-0">
          Psst here's some recently added recipes from around the globe
        </h2>
        <div className="md:pl-16">
          {router.isFallback ? (
            <RecipeListSkeleton />
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await findRecipes();

  return { props: { recipes }, revalidate: 60 * 10 };
}
