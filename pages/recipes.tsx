import { useRouter } from "next/router";
import React, { Suspense, useEffect } from "react";
import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire";
import { AuthProvider } from "../components/common/AuthProvider";
import { FirestoreProvider } from "../components/common/FirestoreProvider";
import { RecipeList } from "../components/RecipeList";
import { Recipe } from "../types/recipe";

const Recipes = () => {
  const router = useRouter();

  const auth = useAuth();
  const { data: user } = useUser();

  const ref = useFirestore()
    .collection("users")
    .doc(user.uid)
    .collection("recipes");

  const { status, data } = useFirestoreCollectionData(ref);

  if (status === "loading") {
    <div>Fetching some data</div>;
  }

  return (
    <div>
      <div className="text-3xl">Saved Recipes</div>
      <RecipeList recipes={data?.map(convertToRecipe)} />
      <div>
        <button
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const convertToRecipe = (data: { [key: string]: unknown }): Recipe => {
  return {
    ingredients: (data["ingredients"] || []) as string[],
    instructions: (data["instructions"] || []) as string[],
    title: (data["title"] || "") as string,
    description: data["description"] as string,
  };
};

const WithAuth = () => (
  <FirestoreProvider>
    <AuthProvider>
      <Recipes />
    </AuthProvider>
  </FirestoreProvider>
);

export default WithAuth;
