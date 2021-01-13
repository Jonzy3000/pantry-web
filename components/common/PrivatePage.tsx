import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useUser } from "../../api-queries/useUser";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PrivatePage = ({ children, fallback }: Props) => {
  const router = useRouter();
  const { data: user, isLoading, isIdle, isLoggedOut } = useUser();

  if (isLoggedOut) {
    router.push(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(
        window.location.toString()
      )}`
    );
    return <></>;
  }

  if (isLoading || isIdle) {
    return <>{fallback || <div>Loading...</div>}</>;
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
