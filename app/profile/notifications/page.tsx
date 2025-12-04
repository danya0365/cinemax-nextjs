"use client";

import { MainLayout } from "@/src/presentation/components";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  type: "new_episode" | "recommendation" | "promotion" | "system";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new_episode",
    title: "ตอนใหม่มาแล้ว!",
    message: "รักข้ามเวลา ตอนที่ 10 พร้อมให้รับชมแล้ว",
    link: "/series/1/episode/10",
    isRead: false,
    createdAt: "2024-12-04T08:00:00",
  },
  {
    id: "2",
    type: "promotion",
    title: "โปรโมชั่นพิเศษ!",
    message: "สมัครแพ็คเกจรายปีวันนี้ ลด 20%",
    link: "/subscription",
    isRead: false,
    createdAt: "2024-12-03T14:00:00",
  },
  {
    id: "3",
    type: "recommendation",
    title: "แนะนำสำหรับคุณ",
    message: "คุณอาจสนใจ 'มหากาพย์รัก' ซีรีย์ใหม่มาแรง",
    link: "/series/2",
    isRead: true,
    createdAt: "2024-12-02T10:30:00",
  },
  {
    id: "4",
    type: "system",
    title: "อัปเดตระบบ",
    message:
      "เราได้เพิ่มฟีเจอร์ใหม่! ตอนนี้คุณสามารถดาวน์โหลดตอนที่ซื้อแล้วได้",
    isRead: true,
    createdAt: "2024-12-01T09:00:00",
  },
];

const typeIcons = {
  new_episode: {
    icon: "🎬",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  },
  recommendation: {
    icon: "✨",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
  },
  promotion: {
    icon: "🎁",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600",
  },
  system: {
    icon: "⚙️",
    color: "bg-gray-100 dark:bg-gray-900/30 text-gray-600",
  },
};

export default function NotificationsPage() {
  const router = useRouter();
  const { user, isInitialized, isLoading } = useAuthStore();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isInitialized, isLoading, user, router]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (!isInitialized || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) return null;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
              >
                <svg
                  className="w-5 h-5 text-muted"
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
                  การแจ้งเตือน
                </h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted">
                    {unreadCount} รายการที่ยังไม่ได้อ่าน
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-red-600 hover:underline"
              >
                อ่านทั้งหมด
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-red-600 text-white"
                  : "bg-surface border border-border text-foreground hover:border-red-500"
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "unread"
                  ? "bg-red-600 text-white"
                  : "bg-surface border border-border text-foreground hover:border-red-500"
              }`}
            >
              ยังไม่อ่าน {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 bg-surface border border-border rounded-xl">
                <div className="text-4xl mb-4">🔔</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ไม่มีการแจ้งเตือน
                </h3>
                <p className="text-muted">
                  {filter === "unread"
                    ? "ไม่มีการแจ้งเตือนที่ยังไม่ได้อ่าน"
                    : "ยังไม่มีการแจ้งเตือน"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                    notification.isRead
                      ? "bg-surface border-border"
                      : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      typeIcons[notification.type].color
                    }`}
                  >
                    <span className="text-lg">
                      {typeIcons[notification.type].icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-medium ${
                          notification.isRead
                            ? "text-foreground"
                            : "text-foreground font-semibold"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-muted hover:text-red-600 transition-colors shrink-0"
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
                    <p className="text-sm text-muted mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted">
                        {new Date(notification.createdAt).toLocaleDateString(
                          "th-TH",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      {notification.link && (
                        <Link
                          href={notification.link}
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          ดูเพิ่มเติม →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
