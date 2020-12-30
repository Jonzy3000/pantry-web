import React, { Suspense } from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { useUser, preloadFirestore } from "reactfire";
import NoSSR from "./NoSSR";

import "firebase/auth";
import { Login } from "./Login";

export const AuthProvider = ({
  children,
}: PropsWithChildren<{}>): JSX.Element => {
  return (
    <NoSSR>
      <Suspense fallback={<div>Loading Spinner</div>}>
        <AuthCheckWithLoading login={<Login />} children={children} />
      </Suspense>
    </NoSSR>
  );
};

const AuthCheckWithLoading = ({ children, login }) => {
  const { data: user, hasEmitted } = useUser();
  const [_, setForceRender] = useState(false);

  useEffect(() => {
    setTimeout(() => setForceRender(true), 100);
  }, []);

  if (status === "loading" || hasEmitted === false) {
    return <div>Loading Spinner...</div>;
  } else if (user) {
    return children as JSX.Element;
  } else {
    return login;
  }
};
