import { useRouter } from "next/navigation";
import { HOME } from "@/shared/router/routes";
import { AuthFormData } from "@/shared/types/auth";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/shared/api/auth";
import { QUERY_KEYS } from "@/shared/enums/query-keys";
import { useAuthStore } from "@/shared/store/auth-store";
import { JWTEnum } from "@/shared/enums/auth";

export const useAuth = () => {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH],
    mutationFn: async (credentials: AuthFormData) => {
      const data = await authApi.login(credentials);
      if (typeof window !== "undefined") {
        localStorage.setItem(JWTEnum.REFRESH_TOKEN, data.refreshToken);
      }
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
