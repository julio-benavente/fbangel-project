import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translation_en from "./locales/en/translation.json";
import translation_es from "./locales/es/translation.json";

const resources = {
  en: {
    translation: translation_en,
  },
  es: {
    translation: translation_es,
  },
};

// the translations
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
    debug: false,
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "span"],
    },
    // Options for language detector
    detection: {
      order: ["htmlTag"],
      // caches: ["cookie"],
    },
    // react: { useSuspense: false },
  });
