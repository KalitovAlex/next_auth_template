"use client";

import { Button } from "antd";
import { useLanguageStore } from "@/shared/store/language-store";
import { Languages } from "@/shared/enums/locale";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === Languages.EN ? Languages.RU : Languages.EN);
  };

  return (
    <Button onClick={toggleLanguage} className="fixed top-4 right-4">
      {language === Languages.EN ? Languages.RU : Languages.EN}
    </Button>
  );
}
