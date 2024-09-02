import i18n from "i18next";
import numeral from "numeral";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en";
import "dayjs/locale/fr";

import { initReactI18next } from "react-i18next";

dayjs.extend(localizedFormat);

export function setNumeralLocale(code: string) {
  try {
    const intl = new Intl.NumberFormat(code);
    const res = intl
      .format(12345.678) // es: 1234,567 12.345,678
      .match(/^\d{2}(.)?\d{3}(.)?\d{3}$/);
    const [, thousands = ",", decimal = "."] = res || [];
    numeral.register("locale", code, {
      delimiters: {
        thousands,
        decimal,
      },
      abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t",
      },
      /** eslint-disable unicorn/no-nested-ternary */
      ordinal(number) {
        const b = number % 10;
        let ord = "th";
        if (1 === ~~((number % 100) / 10)) {
          ord = "th";
        } else {
          switch (b) {
            case 1:
              ord = "st";
              break;
            case 2:
              ord = "nd";

              break;
            case 3:
              ord = "rd";

              break;
            default:
              break;
          }
        }
        return ord;
      },
      currency: {
        symbol: "£",
      },
    });
    numeral.locale(code);
  } catch (error) {
    /** if locale has been registered, it will throw error */
    numeral.locale(code);
  }
}

const I18n = i18n.createInstance();
I18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          key1: "Welcome to I18n EN",
        },
      },
      fr: {
        translation: {
          key1: "wwwww to FR",
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },

    parseMissingKeyHandler(key) {
      console.warn("missing key for [", key, "]");
      return key;
    },
  });
I18n.addResourceBundle("en", "translation", {
  ...I18n.getResourceBundle("en", "translation"),
  new_key: "something",
});
export default I18n;
