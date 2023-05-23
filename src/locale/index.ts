import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import transVi from "./vi.json";
import transEn from "./en.json";

const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lng",
};
export const changedLanguage = (languageKey: string) => {
  i18n.changeLanguage(languageKey); // -> returns a Promise
};

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translations: transVi,
      },
      en: {
        translations: transEn,
      },
    },
    lng: "vi", // Get the first device language
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    defaultNS: "translations",
    ns: ["translations"],
    compatibilityJSON: "v3", // By default React Native projects does not support Intl
  });

// i18n
//   .use(HttpApi)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     detection: { options },
//     debug: true,
//     lng: 'vi',
//     fallbackLng: 'vi', // use en if detected lng is not available

//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },

//     resources: {
//       vi: {
//         translations: transVi,
//       },
//       en: {
//         translations: transEn,
//       },
//     },
//     // have a common namespace used around the full app
//     ns: ['translations'],
//     defaultNS: 'translations',
//     react: {
//       wait: true,
//       useSuspense: false,
//     },
//   });

export function translate(name: string, params = {}) {
  return i18n.t(name, params);
}

export default i18n;
