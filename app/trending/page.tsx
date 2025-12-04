import type { Series } from "@/src/domain/types";
import { MainLayout, SeriesGrid } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ซีรีย์ยอดนิยม | CINEMAX",
  description: "รวมซีรีย์ยอดนิยมที่กำลังมาแรงในขณะนี้",
};

// Mock trending data
const mockTrendingSeries: (Series & {
  rank: number;
  change: "up" | "down" | "same";
  todayViews: number;
})[] = [
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
    rank: 1,
    change: "same",
    todayViews: 125000,
  },
  {
    id: "6",
    title: "พรหมลิขิตรัก",
    title_en: "Destined Love",
    description: "",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 22,
    release_date: "2024-01-01",
    status: "ongoing",
    view_count: 2000000,
    rating: 4.7,
    is_featured: true,
    created_at: "",
    updated_at: "",
    rank: 2,
    change: "up",
    todayViews: 98000,
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
    rank: 3,
    change: "down",
    todayViews: 87000,
  },
  {
    id: "5",
    title: "รักนี้ไม่มีวันลืม",
    title_en: "Unforgettable Love",
    description: "",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 18,
    release_date: "2024-02-15",
    status: "completed",
    view_count: 1500000,
    rating: 4.8,
    is_featured: false,
    created_at: "",
    updated_at: "",
    rank: 4,
    change: "up",
    todayViews: 76000,
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
    rank: 5,
    change: "same",
    todayViews: 65000,
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
    rank: 6,
    change: "up",
    todayViews: 54000,
  },
];

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`;
  }
  return views.toString();
}

// Top 3 Card Component
function TopRankCard({
  series,
  rank,
}: {
  series: (typeof mockTrendingSeries)[0];
  rank: number;
}) {
  const rankColors = {
    1: "from-yellow-500 to-amber-600",
    2: "from-gray-400 to-gray-500",
    3: "from-amber-700 to-amber-800",
  };

  return (
    <Link href={`/series/${series.id}`} className="group relative">
      <div className="aspect-2/3 rounded-xl overflow-hidden bg-muted-light dark:bg-muted-dark relative">
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-muted"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </div>

        {/* Rank Badge */}
        <div
          className={`absolute top-3 left-3 w-10 h-10 rounded-full bg-linear-to-br ${
            rankColors[rank as keyof typeof rankColors]
          } flex items-center justify-center text-white font-bold text-xl shadow-lg`}
        >
          {rank}
        </div>

        {/* Status Badge */}
        {series.status === "ongoing" && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
            กำลังฉาย
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

        {/* Bottom Info */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">
            {series.title}
          </h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {series.rating}
            </span>
            <span>•</span>
            <span>{formatViews(series.todayViews)} วันนี้</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Rank List Item
function RankListItem({ series }: { series: (typeof mockTrendingSeries)[0] }) {
  return (
    <Link
      href={`/series/${series.id}`}
      className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-red-500 transition-colors group"
    >
      {/* Rank */}
      <div className="w-8 text-center">
        <span className="text-2xl font-bold text-foreground">
          {series.rank}
        </span>
        {series.change === "up" && (
          <div className="text-green-500 text-xs flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {series.change === "down" && (
          <div className="text-red-500 text-xs flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div className="w-16 h-20 rounded-lg bg-muted-light dark:bg-muted-dark shrink-0 flex items-center justify-center overflow-hidden">
        <svg
          className="w-8 h-8 text-muted"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate group-hover:text-red-600 transition-colors">
          {series.title}
        </h3>
        <p className="text-sm text-muted">{series.category?.name}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-muted">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {series.rating}
          </span>
          <span>{series.total_episodes} ตอน</span>
        </div>
      </div>

      {/* Views */}
      <div className="text-right">
        <p className="font-semibold text-foreground">
          {formatViews(series.todayViews)}
        </p>
        <p className="text-xs text-muted">วิวส์วันนี้</p>
      </div>
    </Link>
  );
}

export default function TrendingPage() {
  const top3 = mockTrendingSeries.slice(0, 3);
  const rest = mockTrendingSeries.slice(3);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              ซีรีย์ยอดนิยม
            </h1>
            <p className="text-muted">อัปเดตทุกวัน ตามยอดวิวส์และความนิยม</p>
          </div>

          {/* Top 3 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Top 3 วันนี้
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {top3.map((series, index) => (
                <TopRankCard key={series.id} series={series} rank={index + 1} />
              ))}
            </div>
          </section>

          {/* Rest of Rankings */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">
              อันดับอื่นๆ
            </h2>
            <div className="space-y-3">
              {rest.map((series) => (
                <RankListItem key={series.id} series={series} />
              ))}
            </div>
          </section>

          {/* All Popular Series */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                ซีรีย์ยอดนิยมทั้งหมด
              </h2>
              <Link
                href="/series?sort=popular"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <SeriesGrid series={mockTrendingSeries} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
