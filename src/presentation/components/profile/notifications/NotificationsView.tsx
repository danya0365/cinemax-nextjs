"use client";

import {
  useNotificationsPresenter,
  type NotificationsViewModel,
} from "@/src/presentation/presenters/profile/notifications";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";

interface NotificationsViewProps {
  initialViewModel?: NotificationsViewModel;
}

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

export function NotificationsView({
  initialViewModel,
}: NotificationsViewProps) {
  const { user } = useAuthStore();
  const [state, actions] = useNotificationsPresenter(
    user?.id || null,
    initialViewModel
  );
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-muted">กำลังโหลดการแจ้งเตือน...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-2">เกิดข้อผิดพลาด</p>
          <p className="text-muted mb-4">{state.error}</p>
          <button
            onClick={() => user?.id && actions.loadData(user.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const notifications = viewModel?.notifications || [];
  const unreadCount = viewModel?.unreadCount || 0;

  return (
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
            <h1 className="text-2xl font-bold text-foreground">การแจ้งเตือน</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted">
                {unreadCount} รายการที่ยังไม่ได้อ่าน
              </p>
            )}
          </div>
        </div>
        {unreadCount > 0 && user && (
          <button
            onClick={() => actions.markAllAsRead(user.id)}
            className="text-sm text-red-600 hover:underline"
          >
            อ่านทั้งหมด
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => actions.setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            state.filter === "all"
              ? "bg-red-600 text-white"
              : "bg-surface border border-border text-foreground hover:border-red-500"
          }`}
        >
          ทั้งหมด
        </button>
        <button
          onClick={() => actions.setFilter("unread")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            state.filter === "unread"
              ? "bg-red-600 text-white"
              : "bg-surface border border-border text-foreground hover:border-red-500"
          }`}
        >
          ยังไม่อ่าน {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-xl">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ไม่มีการแจ้งเตือน
            </h3>
            <p className="text-muted">
              {state.filter === "unread"
                ? "ไม่มีการแจ้งเตือนที่ยังไม่ได้อ่าน"
                : "ยังไม่มีการแจ้งเตือน"}
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                notification.is_read
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
                      notification.is_read
                        ? "text-foreground"
                        : "text-foreground font-semibold"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <button
                    onClick={() => actions.deleteNotification(notification.id)}
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
                    {new Date(notification.created_at).toLocaleDateString(
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
                      onClick={() => actions.markAsRead(notification.id)}
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
  );
}
