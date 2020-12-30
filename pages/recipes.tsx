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
      {JSON.stringify(data)}
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

const WithAuth = () => (
  <FirestoreProvider>
    <AuthProvider>
      <Recipes />
    </AuthProvider>
  </FirestoreProvider>
);

export default WithAuth;
