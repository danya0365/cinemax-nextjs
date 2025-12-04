"use client";

import {
  useAdminSeriesPresenter,
  type AdminSeriesViewModel,
} from "@/src/presentation/presenters/admin/series";
import Link from "next/link";

interface AdminSeriesViewProps {
  initialViewModel?: AdminSeriesViewModel;
}

const statusStyles = {
  published: {
    label: "เผยแพร่",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  draft: {
    label: "แบบร่าง",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
  scheduled: {
    label: "กำหนดเวลา",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

export function AdminSeriesView({ initialViewModel }: AdminSeriesViewProps) {
  const [state, actions] = useAdminSeriesPresenter(initialViewModel);
  const viewModel = state.viewModel;

  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  const series = viewModel?.series || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            จัดการซีรีย์
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการซีรีย์ทั้งหมดในระบบ
          </p>
        </div>
        <Link
          href="/admin/series/new"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          เพิ่มซีรีย์ใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาซีรีย์..."
              value={state.search}
              onChange={(e) => actions.setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: "all", label: "ทั้งหมด" },
              { value: "published", label: "เผยแพร่" },
              { value: "draft", label: "แบบร่าง" },
              { value: "scheduled", label: "กำหนดเวลา" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  actions.setFilter(option.value as typeof state.filter)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.filter === option.value
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ซีรีย์
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                หมวดหมู่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ตอน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ยอดดู
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {series.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs">
                      🎬
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {s.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {s.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {s.category?.name || "-"}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {s.episodes_count || 0} ตอน
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[s.status]?.color || ""
                    }`}
                  >
                    {statusStyles[s.status]?.label || s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {(s.view_count || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/series/${s.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="แก้ไข"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/admin/series/${s.id}/episodes`}
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="จัดการตอน"
                    >
                      📺
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("ต้องการลบซีรีย์นี้?")) {
                          actions.deleteSeries(s.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="ลบ"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {series.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">ไม่พบซีรีย์</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          แสดง {series.length} จาก {viewModel?.total || 0} รายการ
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => actions.setPage(state.page - 1)}
            disabled={state.page === 1}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <button
            onClick={() => actions.setPage(state.page + 1)}
            disabled={series.length < 20}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}
