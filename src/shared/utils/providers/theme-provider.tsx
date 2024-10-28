"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { FloatButton } from "antd";
import { Moon, Sun } from "lucide-react";
import { ThemeContextType } from "@/shared/types/theme";
import { Themes, ThemeToolTip } from "@/shared/enums/theme";
import { AntdConfigProvider } from "../components/components-configuration";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(Themes.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || Themes.LIGHT;
    setTheme(savedTheme as Themes);
    document.documentElement.classList.toggle(
      Themes.DARK,
      savedTheme === Themes.DARK
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      Themes.DARK,
      newTheme === Themes.DARK
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      <AntdConfigProvider>{children}</AntdConfigProvider>
      <FloatButton
        icon={
          theme === Themes.LIGHT ? (
            <Moon className="text-white" size={16} />
          ) : (
            <Sun className="text-black" size={16} />
          )
        }
        onClick={toggleTheme}
        tooltip={theme === Themes.DARK ? ThemeToolTip.DARK : ThemeToolTip.LIGHT}
        style={{
          right: 24,
          bottom: 24,
          backgroundColor: theme === Themes.LIGHT ? "#000000" : "#ffffff",
        }}
        type={theme === Themes.LIGHT ? "primary" : "default"}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
