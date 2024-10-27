"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth-store";

export function AuthProvider({ children }: PropsWithChildren) {
  const { refreshTokens, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      refreshTokens().catch(() => {});
    }
  }, [isAuthenticated, refreshTokens]);

  return <>{children}</>;
}
