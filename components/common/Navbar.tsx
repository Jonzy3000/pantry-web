import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="sticky bg-white top-0 flex flex-wrap py-5 flex-col md:flex-row items-center">
      <Link href="/">
        <a className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0">
          <span className="text-2xl">🥦🥦 my-pantry</span>
        </a>
      </Link>
      <span className="md:ml-auto flex flex-wrap items-center">
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
        <button className="text-gray-600 cursor-pointer hover:text-gray-900">
          Log in
        </button>
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
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mr-8 text-gray-600 cursor-pointer hover:text-gray-900"
      >
        Logout
      </button>
      <div className="md:w-12 md:h-12 h-8 w-8 relative">
        <div className="group w-full h-full rounded-full overflow-hidden bg-gray-200">
          <img
            src={session.user.image}
            alt="lovely avatar"
            className="object-cover object-center w-full h-full visible"
          />
        </div>
      </div>
    </>
  );
};