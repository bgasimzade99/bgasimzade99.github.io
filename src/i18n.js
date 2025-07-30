import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationAZ from "./locales/az/translation.json";

const resources = {
  en: {
    translation: translationEN
  },
  az: {
    translation: translationAZ
  }
};

i18n
  .use(LanguageDetector) // Otomatik dil algılama
  .use(initReactI18next) // react-i18next entegrasyonu
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react zaten escape ediyor
    }
  });

export default i18n;
