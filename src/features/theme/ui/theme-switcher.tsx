"use client";

import { FloatButton } from "antd";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../model/use-theme";
import { Themes, ThemeToolTip } from "@/shared/config/theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

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
}; 