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
    title: "รักข้ามเวลา",
    episode: 5,
    progress: 75,
    thumbnail: "/images/series-1.jpg",
  },
  {
    id: "2",
    title: "มหากาพย์รัก",
    episode: 3,
    progress: 30,
    thumbnail: "/images/series-2.jpg",
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    episode: 1,
    progress: 100,
    thumbnail: "/images/series-3.jpg",
  },
];

// Mock favorites
const mockFavorites = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    episodes: 16,
    thumbnail: "/images/series-1.jpg",
  },
  {
    id: "2",
    title: "มหากาพย์รัก",
    episodes: 24,
    thumbnail: "/images/series-2.jpg",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, initialize } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initialize();
  }, [initialize]);

  // Loading state
  if (!mounted || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  // Redirect if not logged in (middleware should handle this, but just in case)
  if (!user) {
    router.push("/auth/login?redirectTo=/profile");
    return null;
  }

  const displayName =
    user.user_metadata?.username || user.email?.split("@")[0] || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-4xl font-bold">
              {avatarLetter}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {displayName}
              </h1>
              <p className="text-muted mb-4">{user.email}</p>
              <Link
                href="/profile/edit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:border-red-500 rounded-lg text-sm font-medium transition-colors"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                แก้ไขโปรไฟล์
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {mockWatchHistory.length}
                </p>
                <p className="text-sm text-muted">กำลังดู</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {mockFavorites.length}
                </p>
                <p className="text-sm text-muted">รายการโปรด</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                href: "/profile/purchases",
                icon: "🛒",
                label: "ประวัติการซื้อ",
                desc: "ดูตอนที่ซื้อแล้ว",
              },
              {
                href: "/profile/notifications",
                icon: "🔔",
                label: "การแจ้งเตือน",
                desc: "ข่าวสารและอัปเดต",
              },
              {
                href: "/profile/settings",
                icon: "⚙️",
                label: "ตั้งค่า",
                desc: "ปรับแต่งการใช้งาน",
              },
              {
                href: "/subscription",
                icon: "💎",
                label: "แพ็คเกจ",
                desc: "อัปเกรดบัญชี",
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="p-4 bg-surface border border-border rounded-xl hover:border-red-500 transition-colors"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-medium text-foreground">{action.label}</h3>
                <p className="text-xs text-muted">{action.desc}</p>
              </Link>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border mb-8 overflow-x-auto">
            {[
              { label: "ภาพรวม", href: "/profile", active: true },
              {
                label: "ประวัติการรับชม",
                href: "/profile/history",
                active: false,
              },
              { label: "รายการโปรด", href: "/profile/my-list", active: false },
              { label: "การซื้อ", href: "/profile/purchases", active: false },
            ].map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  tab.active
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Continue Watching */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">
                ดูต่อจากที่ค้างไว้
              </h2>
              <Link
                href="/profile/history"
                className="text-sm text-red-600 hover:text-red-700"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockWatchHistory.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/series/${item.id}/episode/${item.episode}`}
                  className="group flex gap-4 p-3 rounded-xl bg-surface border border-border hover:border-red-500 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-muted"
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
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted">ตอนที่ {item.episode}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* My Favorites */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">รายการโปรด</h2>
              <Link
                href="/profile/my-list"
                className="text-sm text-red-600 hover:text-red-700"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockFavorites.map((item) => (
                <Link
                  key={item.id}
                  href={`/series/${item.id}`}
                  className="group"
                >
                  <div className="aspect-2/3 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark mb-2">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-muted"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground text-sm truncate group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted">{item.episodes} ตอน</p>
                </Link>
              ))}
              {/* Add More Card */}
              <Link
                href="/series"
                className="aspect-2/3 rounded-lg border-2 border-dashed border-border hover:border-red-500 flex flex-col items-center justify-center gap-2 text-muted hover:text-red-600 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm font-medium">เพิ่มเติม</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
