import { translations } from "../i18n/translations";
import type { Language } from "../types/locale";

export const getTranslations = (language: Language) => {
  return translations[language];
};
