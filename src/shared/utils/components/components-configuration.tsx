"use client";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "../providers/theme-provider";
import { Themes } from "@/shared/enums/theme";

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: currentTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--primary)",
          colorBgBase: "var(--background)",
          colorBgContainer: "var(--background)",
          colorText: "var(--foreground)",
          colorBorder: "var(--border)",
          colorError: "var(--error)",
          colorSuccess: "var(--success)",
          colorWarning: "var(--warning)",
          colorTextBase: "var(--foreground)",
        },
        components: {
          Button: {
            colorPrimary: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            algorithm: true,
          },
          Input: {
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            algorithm: true,
          },
        },
        algorithm:
          currentTheme === Themes.DARK
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export const messageConfig = {
  duration: 2,
  maxCount: 3,
};
