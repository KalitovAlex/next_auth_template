"use client";

import { FloatButton } from "antd";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../model/theme-store";
import { Themes, ThemeToolTip } from "@/shared/config/theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <FloatButton
      icon={
        theme === Themes.LIGHT ? (
          <Moon className="text-white" size={16} />
        ) : (
          <Sun className="text-black" size={16} />
        )
      }
      onClick={setTheme}
      tooltip={theme === Themes.DARK ? ThemeToolTip.DARK : ThemeToolTip.LIGHT}
      style={{
        right: 24,
        bottom: 24,
      }}
    />
  );
} 