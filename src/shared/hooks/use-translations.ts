"use client";

import { useLanguageStore } from "../store/language-store";
import { translations } from "../i18n/translations";

export const useTranslations = () => {
  const { language } = useLanguageStore();
  return translations[language];
};
