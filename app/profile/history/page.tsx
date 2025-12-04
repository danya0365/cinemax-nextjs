"use client";

import { MainLayout } from "@/src/presentation/components";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock watch history
const mockWatchHistory = [
  {
    id: "1",
    seriesId: "1",
    title: "รักข้ามเวลา",
    episode: 5,
    totalEpisodes: 16,
    progress: 75,
    watchedAt: "2024-01-20",
    thumbnail: "/images/series-1.jpg",
  },
  {
    id: "2",
    seriesId: "2",
    title: "มหากาพย์รัก",
    episode: 3,
    totalEpisodes: 24,
    progress: 30,
    watchedAt: "2024-01-19",
    thumbnail: "/images/series-2.jpg",
  },
  {
    id: "3",
    seriesId: "3",
    title: "ความลับที่ซ่อนไว้",
    episode: 1,
    totalEpisodes: 12,
    progress: 100,
    watchedAt: "2024-01-18",
    thumbnail: "/images/series-3.jpg",
  },
  {
    id: "4",
    seriesId: "4",
    title: "เกมรักเกมอำนาจ",
    episode: 8,
    totalEpisodes: 20,
    progress: 50,
    watchedAt: "2024-01-17",
    thumbnail: "/images/series-4.jpg",
  },
  {
    id: "5",
    seriesId: "5",
    title: "รักนี้ไม่มีวันลืม",
    episode: 12,
    totalEpisodes: 16,
    progress: 90,
    watchedAt: "2024-01-16",
    thumbnail: "/images/series-5.jpg",
  },
  {
    id: "6",
    seriesId: "6",
    title: "พรหมลิขิตรัก",
    episode: 6,
    totalEpisodes: 18,
    progress: 45,
    watchedAt: "2024-01-15",
    thumbnail: "/images/series-6.jpg",
  },
];

export default function WatchHistoryPage() {
  const router = useRouter();
  const { user, isLoading, initialize } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initialize();
  }, [initialize]);

  if (!mounted || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    router.push("/auth/login?redirectTo=/profile/history");
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/profile"
              className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                ประวัติการรับชม
              </h1>
              <p className="text-muted text-sm">
                {mockWatchHistory.length} รายการ
              </p>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {mockWatchHistory.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl bg-surface border border-border"
              >
                {/* Thumbnail */}
                <Link
                  href={`/series/${item.seriesId}/episode/${item.episode}`}
                  className="relative w-40 h-24 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark shrink-0 group"
                >
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
                      className="h-full bg-red-600"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/series/${item.seriesId}`}
                    className="font-semibold text-foreground hover:text-red-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted mt-1">
                    ตอนที่ {item.episode} / {item.totalEpisodes}
                  </p>
                  <p className="text-xs text-muted mt-2">
                    ดูเมื่อ {formatDate(item.watchedAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/series/${item.seriesId}/episode/${item.episode}`}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    ดูต่อ
                  </Link>
                  <button
                    className="p-2 text-muted hover:text-red-600 hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg transition-colors"
                    title="ลบออกจากประวัติ"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {mockWatchHistory.length === 0 && (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-muted mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-foreground mb-2">
                ยังไม่มีประวัติการรับชม
              </h3>
              <p className="text-muted mb-6">
                เริ่มดูซีรีย์เพื่อบันทึกประวัติการรับชม
              </p>
              <Link
                href="/series"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                สำรวจซีรีย์
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
