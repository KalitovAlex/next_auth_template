"use client";

import { Button } from "antd";
import { useLanguageStore } from "@/shared/store/language-store";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <Button 
      onClick={toggleLanguage}
      className="fixed top-4 right-4"
    >
      {language === "en" ? "RU" : "EN"}
    </Button>
  );
} 