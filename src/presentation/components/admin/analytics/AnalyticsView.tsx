"use client";

import {
  useAnalyticsPresenter,
  type AnalyticsViewModel,
} from "@/src/presentation/presenters/admin/analytics";

interface AnalyticsViewProps {
  initialViewModel?: AnalyticsViewModel;
}

export function AnalyticsView({ initialViewModel }: AnalyticsViewProps) {
  const [state, actions] = useAnalyticsPresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
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
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
          <button
            onClick={actions.loadData}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const { revenueData, topSeries, userStats, quickStats, totalRevenue } =
    viewModel || {
      revenueData: [],
      topSeries: [],
      userStats: { total: 0, active: 0, premium: 0, newThisMonth: 0 },
      quickStats: {
        totalSeries: 0,
        totalEpisodes: 0,
        averageRating: 0,
        retentionRate: 0,
      },
      totalRevenue: 0,
    };

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ภาพรวมสถิติและประสิทธิภาพ
          </p>
        </div>
        <div className="flex gap-2">
          {(["7d", "30d", "90d", "1y"] as const).map((p) => (
            <button
              key={p}
              onClick={() => actions.setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                state.period === p
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {p === "7d"
                ? "7 วัน"
                : p === "30d"
                ? "30 วัน"
                : p === "90d"
                ? "90 วัน"
                : "1 ปี"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                รายได้รวม
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ฿{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">↑ 12.5%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              จากเดือนก่อน
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ผู้ใช้ทั้งหมด
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {userStats.total.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">+{userStats.newThisMonth}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              เดือนนี้
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                สมาชิก Premium
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {userStats.premium.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">↑ 8.3%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              จากเดือนก่อน
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ยอดดูรวม
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {(viewModel?.totalViews || 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <span className="text-xl">👁️</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">↑ 18.2%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              จากเดือนก่อน
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            รายได้รายเดือน
          </h2>
          <div className="space-y-4">
            {revenueData.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600 dark:text-gray-400">
                  {item.month}
                </span>
                <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-end pr-3"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      ฿{(item.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            การเติบโตผู้ใช้
          </h2>
          <div className="space-y-4">
            {revenueData.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600 dark:text-gray-400">
                  {item.month}
                </span>
                <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-3"
                    style={{ width: `${(item.users / 1000) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      {item.users}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Series */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          ซีรีย์ยอดนิยม
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">ชื่อซีรีย์</th>
                <th className="pb-3 font-medium text-right">ยอดดู</th>
                <th className="pb-3 font-medium text-right">รายได้</th>
                <th className="pb-3 font-medium text-right">การเติบโต</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topSeries.map((series, index) => (
                <tr key={series.id} className="text-sm">
                  <td className="py-4 text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="py-4 font-medium text-gray-900 dark:text-white">
                    {series.title}
                  </td>
                  <td className="py-4 text-right text-gray-600 dark:text-gray-400">
                    {(series.views / 1000).toFixed(1)}K
                  </td>
                  <td className="py-4 text-right text-gray-900 dark:text-white font-medium">
                    ฿{series.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        series.growth > 0
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {series.growth > 0 ? "↑" : "↓"} {Math.abs(series.growth)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {quickStats.totalSeries}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ซีรีย์ทั้งหมด
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {quickStats.totalEpisodes.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ตอนทั้งหมด
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {quickStats.averageRating}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            คะแนนเฉลี่ย
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {quickStats.retentionRate}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Retention Rate
          </p>
        </div>
      </div>
    </div>
  );
}
