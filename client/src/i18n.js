import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translation_en from "./locales/en/translation.json";
import translation_es from "./locales/es/translation.json";
import translation_fr from "./locales/fr/translation.json";
import translation_nl from "./locales/nl/translation.json";
import translation_it from "./locales/it/translation.json";
import translation_de from "./locales/de/translation.json";
import translation_ro from "./locales/ro/translation.json";

const resources = {
  en: {
    translation: translation_en,
  },
  es: {
    translation: translation_es,
  },
  fr: {
    translation: translation_fr,
  },
  nl: {
    translation: translation_nl,
  },
  it: {
    translation: translation_it,
  },
  de: {
    translation: translation_de,
  },
  ro: {
    translation: translation_ro,
  },
};

// the translations
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    supportedLngs: ["en", "es", "fr", "nl", "it", "de", "ro"],
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development" ? true : false,
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
