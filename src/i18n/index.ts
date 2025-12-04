import en from "./locales/en.json";
import th from "./locales/th.json";
import zh from "./locales/zh.json";

export type Locale = "th" | "en" | "zh";

export const locales: Locale[] = ["th", "en", "zh"];
export const defaultLocale: Locale = "th";

export const localeNames: Record<Locale, string> = {
  th: "ภาษาไทย",
  en: "English",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  th: "🇹🇭",
  en: "🇺🇸",
  zh: "🇨🇳",
};

const translations = { th, en, zh };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? K | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof th>;

/**
 * Get translation by key
 */
export function t(locale: Locale, key: TranslationKey): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to default locale
      value = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }

  return typeof value === "string" ? value : key;
}

/**
 * Get all translations for a locale
 */
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

/**
 * Create a translation function for a specific locale
 */
export function createTranslator(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}
