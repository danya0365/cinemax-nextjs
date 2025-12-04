"use client";

import type { Series } from "@/src/domain/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Mock search results
const mockSearchResults: Series[] = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    title_en: "Love Across Time",
    description: "",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 16,
    release_date: "2024-01-15",
    status: "completed",
    view_count: 2500000,
    rating: 4.9,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "มหากาพย์รัก",
    title_en: "Epic Love",
    description: "",
    thumbnail: "",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 24,
    release_date: "2024-02-01",
    status: "ongoing",
    view_count: 1800000,
    rating: 4.7,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    title_en: "Hidden Secrets",
    description: "",
    thumbnail: "",
    category_id: "3",
    category: { id: "3", name: "ลึกลับ", slug: "mystery" },
    total_episodes: 12,
    release_date: "2024-01-20",
    status: "completed",
    view_count: 1200000,
    rating: 4.5,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "เกมรักเกมอำนาจ",
    title_en: "Game of Love",
    description: "",
    thumbnail: "",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 20,
    release_date: "2024-03-01",
    status: "ongoing",
    view_count: 900000,
    rating: 4.6,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
];

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockSearchResults.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.title_en?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 300);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      // Escape to close
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="ค้นหาซีรีย์..."
            className="w-full pl-10 pr-12 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-foreground placeholder:text-muted text-sm transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-muted bg-surface border border-border rounded">
            ⌘K
          </kbd>
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="w-6 h-6 mx-auto border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((series) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                >
                  <div className="w-12 h-16 rounded bg-muted-light dark:bg-muted-dark shrink-0 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {series.title}
                    </h4>
                    <p className="text-xs text-muted">
                      {series.category?.name} • {series.total_episodes} ตอน
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {series.rating.toFixed(1)}
                  </div>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block p-3 text-center text-sm text-red-600 hover:bg-muted-light dark:hover:bg-muted-dark border-t border-border"
              >
                ดูผลการค้นหาทั้งหมด →
              </Link>
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-muted">
              <p>ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
