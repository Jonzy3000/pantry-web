import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import { Button } from "./Button";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className="sticky max-w-6xl mx-auto bg-white top-0 flex flex-wrap items-center px-4 py-6 lg:px-10">
      <Link href="/">
        <a
          className={`flex title-font text-lg md:text-2xl font-bold items-center text-gray-900 mb-2 ${styles.nav}`}
        >
          🥦🥦 my-pantry
        </a>
      </Link>
      <span className="ml-auto flex flex-wrap items-center">
        <LoginSensitiveNav />
      </span>
    </div>
  );
};

const LoginSensitiveNav = () => {
  const [session, loading] = useSession();

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
