import firebase from "firebase/app";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "reactfire";

interface Props {
  onSuccessfulSignIn?: () => void;
}

export const LoginForm = ({ onSuccessfulSignIn }: Props) => {
  const auth = useAuth();

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        if (onSuccessfulSignIn) {
          onSuccessfulSignIn();
        }

        return false;
      },
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  return <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />;
};
