"use client";

import { PropsWithChildren, useEffect } from "react";
import { useThemeStore } from "../model/theme-store";
import { Themes } from "@/shared/config/theme";
import { ThemeSwitcher } from "./theme-switcher";

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle(Themes.DARK, theme === Themes.DARK);
  }, [theme]);

  return (
    <>
      {children}
      <ThemeSwitcher />
    </>
  );
} 