"use client";

import { useState } from "react";

type Language = "th" | "en" | "cn";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "th", label: "TH", flag: "🇹🇭" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "cn", label: "CN", flag: "🇨🇳" },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("th");
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  const handleLanguageChange = (langCode: Language) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    // TODO: Integrate with i18n system
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface hover:bg-muted-light dark:hover:bg-muted-dark transition-colors text-sm font-medium"
        aria-label="Select language"
      >
        <span>{currentLanguage?.flag}</span>
        <span className="text-foreground">{currentLanguage?.label}</span>
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
          <div className="absolute right-0 mt-2 w-32 rounded-lg bg-surface shadow-lg border border-border z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  currentLang === lang.code
                    ? "bg-muted-light dark:bg-muted-dark text-foreground font-medium"
                    : "text-foreground hover:bg-muted-light dark:hover:bg-muted-dark"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
