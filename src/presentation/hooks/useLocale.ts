"use client";

import { Locale, defaultLocale, getTranslations, locales, t } from "@/src/i18n";
import { useCallback, useEffect, useState } from "react";

const LOCALE_STORAGE_KEY = "cinemax-locale";

/**
 * Hook for managing locale/language
 */
export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
    }
    setIsLoaded(true);
  }, []);

  // Set locale and persist to localStorage
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  }, []);

  // Translation function bound to current locale
  const translate = useCallback(
    (key: Parameters<typeof t>[1]) => t(locale, key),
    [locale]
  );

  // Get all translations for current locale
  const translations = getTranslations(locale);

  return {
    locale,
    setLocale,
    t: translate,
    translations,
    isLoaded,
  };
}

/**
 * Hook for getting translations for a specific section
 */
export function useTranslations<
  T extends keyof ReturnType<typeof getTranslations>
>(section: T) {
  const { locale, translations } = useLocale();
  return {
    locale,
    t: translations[section],
  };
}
