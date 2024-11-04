"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { REFRESHTOKENLIVETIME } from "@/shared/constants/auth";
import { useAuthStore } from "@/shared/store/auth-store";

export function AuthProvider({ children }: PropsWithChildren) {
  const { refreshTokens, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const refreshTokensWithError = async () => {
        try {
          await refreshTokens();
        } catch (error) {
          console.log(error);
          await logout();
          router.push("/auth");
        }
      };

      refreshTokensWithError();

      const intervalId = setInterval(
        refreshTokensWithError,
        REFRESHTOKENLIVETIME
      );

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated, refreshTokens, logout, router]);

  return <>{children}</>;
}
