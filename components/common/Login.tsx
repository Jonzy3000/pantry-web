import firebase from "firebase/app";
import { useAuth } from "reactfire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export const Login = () => {
  const auth = useAuth();

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  return (
    <section className="flex flex-col items-center h-screen md:flex-row">
      <div className="container mx-auto">
        <div className="flex justify-center px-2 py-6 ">
          <div className="flex w-full rounded-lg lg:shadow-xl ">
            <div className="relative hidden w-full h-auto bg-cover border-r rounded-l-lg bg-blue-1300 lg:block lg:w-6/12">
              <div className="relative z-10 m-12 text-left ">
                <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-blue-700 sm:text-3xl title-font">
                  Create an account.
                </h2>
                <div className="w-full mt-16 mb-8 text-base leading-relaxed text-gray-900 sm:md:w-3/3 lg:text-1xl ">
                  All you have to do is choose the section you need, remove the
                  one that you do not need for that project and paste the one
                  you need in that moment. All the section have been given the
                  same left/right padding. Because consistence is king.
                </div>
              </div>
            </div>
            <div className="w-full px-8 py-24 border-gray-100 rounded-lg bg-blue-1300 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div className="relative z-10 text-left ">
                <div className="flex justify-enter lg:py-6"></div>
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
