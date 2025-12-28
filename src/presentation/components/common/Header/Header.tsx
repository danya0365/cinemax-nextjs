"use client";

import { useLocale } from "@/src/presentation/hooks";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { SearchBar } from "../SearchBar";
import { ThemeToggle } from "../ThemeToggle";
import { UserMenu } from "./UserMenu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isLoaded } = useLocale();

  // Navigation items with translation keys
  const navItems = [
    { labelKey: "nav.home" as const, href: "/" },
    { labelKey: "nav.series" as const, href: "/series" },
    { labelKey: "nav.categories" as const, href: "/categories" },
    { labelKey: "nav.trending" as const, href: "/trending" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-foreground">
                CINEMAX
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {isLoaded ? t(item.labelKey) : "..."}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-6">
            <SearchBar />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu / Auth Buttons */}
            <div className="hidden sm:block">
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg transition-colors"
                >
                  {isLoaded ? t(item.labelKey) : "..."}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              <hr className="my-2 border-border" />
              <div className="flex flex-col gap-2 px-4">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground text-center border border-border rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                >
                  {isLoaded ? t("nav.login") : "..."}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 text-center rounded-lg transition-colors"
                >
                  {isLoaded ? t("nav.register") : "..."}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

