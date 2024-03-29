import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className="sticky bg-white top-0">
      <nav className="flex max-w-6xl mx-auto flex-wrap items-center px-4 py-6 lg:px-10">
        <Link href="/"
            className={`flex title-font text-lg md:text-2xl font-bold items-center text-gray-900 mb-2 ${styles.nav}`}
          >
            🥦🥦 my-pantry
        </Link>
        <span className="ml-auto flex flex-wrap items-center">
          <LoginSensitiveNav />
        </span>
      </nav>
    </div>
  );
};

const LoginSensitiveNav = () => {
  const {data: session, status} = useSession();

  const loading = status == "loading";

  if (loading) {
    return <div className="w-12 h-12"></div>;
  }

  if (!session) {
    return (
      <div onClick={() => signIn()}>
        <Button variant="primary">Log in</Button>
      </div>
    );
  }

  return (
    <>
      <Link href="/recipes">
        <a className="mr-8 text-gray-600 cursor-pointer hover:text-gray-900">
          Recipes
        </a>
      </Link>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        // className="mr-8 text-gray-600 cursor-pointer hover:text-gray-900"
        variant="info"
      >
        Logout
      </Button>
    </>
  );
};
