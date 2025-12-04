"use client";

import {
  useDashboardPresenter,
  type DashboardViewModel,
} from "@/src/presentation/presenters/admin/dashboard";
import Link from "next/link";

interface DashboardViewProps {
  initialViewModel?: DashboardViewModel;
}

const quickActions = [
  { label: "เพิ่มซีรีย์", href: "/admin/series/new", icon: "➕" },
  { label: "อัปโหลดตอน", href: "/admin/episodes/upload", icon: "📤" },
  { label: "ดูรายงาน", href: "/admin/analytics", icon: "📈" },
  { label: "ตั้งค่า", href: "/admin/settings", icon: "⚙️" },
];

const activityIcons = {
  user: { icon: "👤", color: "bg-blue-100 dark:bg-blue-900/30" },
  series: { icon: "🎬", color: "bg-purple-100 dark:bg-purple-900/30" },
  episode: { icon: "📺", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  payment: { icon: "💰", color: "bg-green-100 dark:bg-green-900/30" },
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} นาทีก่อน`;
  if (diffHours < 24) return `${diffHours} ชั่วโมงก่อน`;
  return `${diffDays} วันก่อน`;
}

export function DashboardView({ initialViewModel }: DashboardViewProps) {
  const [state, actions] = useDashboardPresenter(initialViewModel);
  const viewModel = state.viewModel;

  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (state.error && !viewModel) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{state.error}</p>
        <button
          onClick={actions.loadData}
          className="text-red-600 hover:underline"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  const stats = viewModel?.stats;
  const activities = viewModel?.recentActivities || [];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          แดชบอร์ด
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ภาพรวมระบบและสถิติทั้งหมด
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/admin/series"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            ซีรีย์ทั้งหมด
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats?.totalSeries || 0}
          </p>
          <p className="text-sm mt-2 text-green-600">
            +{stats?.seriesChange || 0} จากเดือนที่แล้ว
          </p>
        </Link>

        <Link
          href="/admin/episodes"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            ตอนทั้งหมด
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats?.totalEpisodes?.toLocaleString() || 0}
          </p>
          <p className="text-sm mt-2 text-green-600">
            +{stats?.episodesChange || 0} จากเดือนที่แล้ว
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            ผู้ใช้ทั้งหมด
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats?.totalUsers?.toLocaleString() || 0}
          </p>
          <p className="text-sm mt-2 text-green-600">
            +{stats?.usersChange || 0} จากเดือนที่แล้ว
          </p>
        </Link>

        <Link
          href="/admin/payments"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            รายได้เดือนนี้
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ฿{stats?.monthlyRevenue?.toLocaleString() || 0}
          </p>
          <p className="text-sm mt-2 text-green-600">
            +{stats?.revenueChange || 0}% จากเดือนที่แล้ว
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            การดำเนินการด่วน
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            กิจกรรมล่าสุด
          </h2>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                ยังไม่มีกิจกรรม
              </p>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      activityIcons[activity.type].color
                    }`}
                  >
                    {activityIcons[activity.type].icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
