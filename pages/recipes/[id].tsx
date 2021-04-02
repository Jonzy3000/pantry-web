import { useRouter } from "next/router";
import { RecipeSkeletonView, RecipeView } from "../../components/RecipeView";
import { findRecipeById } from "../../server/db/recipesRepository";

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
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(`static props of recipe: ${params.id}`);
  const recipe = await findRecipeById(params.id);
  console.log("found recipe in static props");
  return { props: { recipe } };
}

export default Recipe;
