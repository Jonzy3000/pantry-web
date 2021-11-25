import { useRouter } from "next/router";
import { RecipeSkeletonView, RecipeView } from "../../components/RecipeView";
import { findRecipeById, findRecipes } from "../../server/db/recipesRepository";

const Recipe = ({ recipe }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <RecipeSkeletonView />;
  }

  if (!recipe) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <RecipeView recipe={recipe} />
    </div>
  );
};

export async function getStaticPaths() {
  const firstNRecipes = await findRecipes(0, 100);
  return {
    paths: firstNRecipes.map((recipe) => ({ params: { id: recipe.id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const recipe = await findRecipeById(params.id);

  return { props: { recipe } };
}

export default Recipe;
