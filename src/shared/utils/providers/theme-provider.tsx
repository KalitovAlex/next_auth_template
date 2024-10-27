"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { FloatButton } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { ThemeContextType } from "@/shared/types/theme";
import { Themes, ThemeToolTip } from "@/shared/enums/theme";

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
      {children}
      <FloatButton
        icon={
          theme === Themes.LIGHT ? (
            <MoonOutlined className="bg-white/65" />
          ) : (
            <SunOutlined className="bg-black/65" />
          )
        }
        onClick={toggleTheme}
        tooltip={theme === Themes.DARK ? ThemeToolTip.DARK : ThemeToolTip.LIGHT}
        type="primary"
        style={{ right: 24, bottom: 24 }}
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
