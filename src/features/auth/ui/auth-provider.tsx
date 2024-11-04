"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { REFRESHTOKENLIVETIME } from "@/shared/constants/auth";
import { useSessionStore } from "@/entities/session";
import { AUTH } from "@/shared/config/routes";

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isAuthenticated, refreshTokens } = useSessionStore();

  useEffect(() => {
    const refreshInterval = setInterval(
      refreshTokens,
      REFRESHTOKENLIVETIME * 1000
    );

    return () => clearInterval(refreshInterval);
  }, [refreshTokens]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(AUTH);
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
