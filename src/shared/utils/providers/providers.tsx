"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { App } from "antd";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { ThemeProvider } from "@/features/theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <App>{children}</App>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
