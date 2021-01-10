import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../types/user";

export const useUser = () => {
  const [session, loading] = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session && !loading) {
      queryClient.cancelQueries("me");
      queryClient.invalidateQueries("me");
    }
  }, [loading, session]);

  return useQuery<User | "unauthorised">(
    ["me"],
    () =>
      fetch("/api/me").then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          return "unauthorised";
        } else {
          throw new Error();
        }
      }),
    { retry: 1 }
  );
};
