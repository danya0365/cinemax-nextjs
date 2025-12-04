"use client";

import { useWatchHistoryStore } from "@/src/presentation/stores";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ContinueWatchingProps {
  className?: string;
}

export function ContinueWatching({ className = "" }: ContinueWatchingProps) {
  const { getContinueWatching, removeFromHistory } = useWatchHistoryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const continueWatching = getContinueWatching();

  if (continueWatching.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          ดูต่อจากที่ค้างไว้
        </h2>
        <Link
          href="/profile/history"
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          ดูทั้งหมด →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {continueWatching.map((item) => (
          <div
            key={`${item.seriesId}-${item.episodeNumber}`}
            className="flex-shrink-0 w-72 group"
          >
            <Link
              href={`/series/${item.seriesId}/episode/${item.episodeNumber}`}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark mb-2">
                {/* Thumbnail Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-muted group-hover:text-red-600 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Link href={`/series/${item.seriesId}`}>
                  <h3 className="font-medium text-foreground truncate group-hover:text-red-600 transition-colors">
                    {item.seriesTitle}
                  </h3>
                </Link>
                <p className="text-sm text-muted">
                  ตอนที่ {item.episodeNumber} • {item.progress}% ดูแล้ว
                </p>
              </div>
              <button
                onClick={() =>
                  removeFromHistory(item.seriesId, item.episodeNumber)
                }
                className="p-1 text-muted hover:text-red-600 transition-colors"
                title="ลบออกจากรายการ"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
