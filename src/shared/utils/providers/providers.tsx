"use client";

import { App, ConfigProvider } from "antd";
import { ThemeProvider } from "./theme-provider";
import { messageConfig } from "../components/components-configuration";
import { theme } from "@/shared/styles/theme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ConfigProvider theme={theme}>
        <App message={messageConfig}>{children}</App>
      </ConfigProvider>
    </ThemeProvider>
  );
};
