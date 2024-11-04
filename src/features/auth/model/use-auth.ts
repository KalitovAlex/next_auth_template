import { useRouter } from "next/navigation";
import { AuthFormData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { QUERY_KEYS } from "@/shared/enums/query-keys";
import { SessionState, useSessionStore } from "@/entities/session";
import { JWTEnum } from "@/shared/config/auth";
import { HOME } from "@/shared/router/routes";

export const useAuth = () => {
  const router = useRouter();
  const setIsAuthenticated = useSessionStore(
    (state: SessionState) => state.setIsAuthenticated
  );

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async (credentials: AuthFormData) => {
      const data = await authApi.login(credentials);
      localStorage.setItem(JWTEnum.REFRESH_TOKEN, data.refreshToken);
      await fetch("/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({ token: data.refreshToken }),
      });
      return data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      router.push(HOME);
    },
  });

  return {
    login,
    isPending,
    error,
  };
};
