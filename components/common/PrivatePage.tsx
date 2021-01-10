import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useUser } from "../../api-queries/useUser";

interface Props {
  children: React.ReactNode;
}

export const PrivatePage = ({ children }: Props) => {
  const router = useRouter();
  const { data: user, isLoading, isIdle, isLoggedOut } = useUser();

  if (isLoading || isIdle) {
    return <div>Loading...</div>;
  }

  if (isLoggedOut) {
    router.push(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        window.location.toString()
      )}`
    );
    return <></>;
  }

  if (!user) {
    router.push(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        window.location.toString()
      )}`
    );
    return <></>;
  }

  return <>{children}</>;
};
