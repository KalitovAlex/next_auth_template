"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "@/features/theme/ui/theme-provider";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { AntdConfigProvider } from "@/shared/lib/components-configuration";
import { App } from "antd";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <AntdConfigProvider>
            <App>{children}</App>
          </AntdConfigProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}