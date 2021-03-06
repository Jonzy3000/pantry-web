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
  const recipe = await findRecipeById(params.id);

  return { props: { recipe }, revalidate: 60 * 10 };
}

export default Recipe;
