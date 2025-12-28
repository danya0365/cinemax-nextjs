"use client";

import { Locale, localeFlags, localeNames, locales } from "@/src/i18n";
import { useLocale } from "@/src/presentation/hooks";
import { useState } from "react";

export function LanguageSwitcher() {
  const { locale, setLocale, isLoaded } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: Locale) => {
    setLocale(langCode);
    setIsOpen(false);
  };

  // Don't render until locale is loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface text-sm font-medium">
        <span>🌐</span>
        <span className="text-foreground">...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface hover:bg-muted-light dark:hover:bg-muted-dark transition-colors text-sm font-medium"
        aria-label="Select language"
      >
        <span>{localeFlags[locale]}</span>
        <span className="text-foreground">{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-surface shadow-lg border border-border z-50 overflow-hidden">
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  locale === lang
                    ? "bg-muted-light dark:bg-muted-dark text-foreground font-medium"
                    : "text-foreground hover:bg-muted-light dark:hover:bg-muted-dark"
                }`}
              >
                <span>{localeFlags[lang]}</span>
                <span>{localeNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

