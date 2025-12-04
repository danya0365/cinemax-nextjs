"use client";

import Link from "next/link";

interface RecommendedSeries {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rating: number;
  episodeCount: number;
}

interface RecommendationsProps {
  seriesId: string;
  categorySlug?: string;
  title?: string;
  limit?: number;
}

// Mock recommendations - in real app, this would come from an API
const mockRecommendations: RecommendedSeries[] = [
  {
    id: "2",
    title: "มหากาพย์รัก",
    thumbnail: "/images/series-2.jpg",
    category: "ดราม่า",
    rating: 4.7,
    episodeCount: 24,
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    thumbnail: "/images/series-3.jpg",
    category: "ลึกลับ",
    rating: 4.5,
    episodeCount: 12,
  },
  {
    id: "4",
    title: "เกมรักเกมอำนาจ",
    thumbnail: "/images/series-4.jpg",
    category: "ดราม่า",
    rating: 4.6,
    episodeCount: 20,
  },
  {
    id: "5",
    title: "รักนี้ไม่มีวันลืม",
    thumbnail: "/images/series-5.jpg",
    category: "โรแมนติก",
    rating: 4.8,
    episodeCount: 18,
  },
  {
    id: "6",
    title: "พรหมลิขิตรัก",
    thumbnail: "/images/series-6.jpg",
    category: "โรแมนติก",
    rating: 4.7,
    episodeCount: 22,
  },
  {
    id: "7",
    title: "ตำนานรักแห่งดวงดาว",
    thumbnail: "/images/series-7.jpg",
    category: "แฟนตาซี",
    rating: 4.4,
    episodeCount: 16,
  },
];

export function Recommendations({
  seriesId,
  title = "ซีรีย์ที่คุณอาจสนใจ",
  limit = 6,
}: RecommendationsProps) {
  // Filter out current series and limit results
  const recommendations = mockRecommendations
    .filter((s) => s.id !== seriesId)
    .slice(0, limit);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((series) => (
          <Link key={series.id} href={`/series/${series.id}`} className="group">
            {/* Thumbnail */}
            <div className="aspect-2/3 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark mb-2 relative">
              <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white/50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                </svg>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {series.rating}
              </div>
            </div>
            {/* Info */}
            <h3 className="font-medium text-foreground text-sm truncate group-hover:text-red-600 transition-colors">
              {series.title}
            </h3>
            <p className="text-xs text-muted">
              {series.category} · {series.episodeCount} ตอน
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
