"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { App } from "antd";

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
