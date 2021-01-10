import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";

const Recipes = () => {
  const [session, loading] = useSession();
  console.log(session, loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div>
      {session && (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
      )}
      <div className="text-3xl">Saved Recipes</div>
    </div>
  );
};

export default Recipes;
