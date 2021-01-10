import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../types/user";

export const useUser = () => {
  const [session, loading] = useSession();

  const hasActiveSession = !!session && !loading;
  const isLoggedOut = !session && !loading;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session && !loading) {
      queryClient.cancelQueries("me");
      queryClient.invalidateQueries("me");
    }
  }, [loading, session]);

  const result = useQuery<User>(
    ["me"],
    () =>
      fetch("/api/me").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      }),
    { retry: 1, enabled: hasActiveSession }
  );

  return { ...result, isLoggedOut };
};
