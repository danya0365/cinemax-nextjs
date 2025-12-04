import type { Series } from "@/src/domain/types";
import Link from "next/link";

interface SeriesCardProps {
  series: Series;
  rank?: number;
  showRank?: boolean;
}

export function SeriesCard({
  series,
  rank,
  showRank = false,
}: SeriesCardProps) {
  return (
    <Link href={`/series/${series.id}`} className="group relative block">
      <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        {/* Rank Badge */}
        {showRank && rank && (
          <div className="absolute top-2 left-2 z-10">
            <span className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-red-600 rounded-lg">
              {rank}
            </span>
          </div>
        )}

        {/* Free Badge */}
        {series.status === "ongoing" && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded">
              ตอนแรกฟรี
            </span>
          </div>
        )}

        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex gap-1">
            {series.status === "completed" && (
              <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded">
                จบแล้ว
              </span>
            )}
            {series.status === "upcoming" && (
              <span className="px-2 py-0.5 text-xs font-medium text-white bg-purple-600 rounded">
                เร็วๆ นี้
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors line-clamp-1">
          {series.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            {series.rating.toFixed(1)}
          </span>
          <span>•</span>
          <span>{series.total_episodes} ตอน</span>
        </div>
        {series.category && (
          <span className="inline-block mt-2 px-2 py-0.5 text-xs text-muted bg-muted-light dark:bg-muted-dark rounded">
            {series.category.name}
          </span>
        )}
      </div>
    </Link>
  );
}
