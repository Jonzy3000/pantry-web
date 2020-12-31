import { useRouter } from "next/router";
import React from "react";

export const LoginButton = () => {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/login")}>Login</button>
    </>
  );
};
