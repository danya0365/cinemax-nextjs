"use client";

import {
  useEpisodesPresenter,
  type EpisodesViewModel,
} from "@/src/presentation/presenters/admin/episodes";
import Link from "next/link";
import { useState } from "react";

interface EpisodesViewProps {
  initialViewModel?: EpisodesViewModel;
}

export function EpisodesView({ initialViewModel }: EpisodesViewProps) {
  const [state, actions] = useEpisodesPresenter(initialViewModel);
  const [searchTerm, setSearchTerm] = useState("");
  const viewModel = state.viewModel;

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.setFilters({ ...state.filters, search: searchTerm });
  };

  // Handle series filter
  const handleSeriesChange = (seriesId: string) => {
    actions.setFilters({
      ...state.filters,
      series_id: seriesId === "all" ? undefined : seriesId,
    });
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            กำลังโหลดข้อมูลตอน...
          </p>
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

  if (!viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📺</div>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
            ยังไม่มีข้อมูลตอน
          </p>
        </div>
      </div>
    );
  }

  const { episodes, stats, series, totalCount, page, perPage } = viewModel;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            จัดการตอน
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ทั้งหมด {stats.totalEpisodes} ตอน | ฟรี {stats.freeEpisodes} |
            เสียเงิน {stats.paidEpisodes}
          </p>
        </div>
        <Link
          href="/admin/episodes/upload"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          อัปโหลดตอนใหม่
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">ตอนทั้งหมด</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalEpisodes}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">ตอนฟรี</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.freeEpisodes}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ตอนเสียเงิน
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.paidEpisodes}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">ยอดดูรวม</p>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาตอน..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* Series Filter */}
          <select
            value={state.filters.series_id || "all"}
            onChange={(e) => handleSeriesChange(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
          >
            <option value="all">ทุกซีรีย์</option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Episodes Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                ตอน
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                ซีรีย์
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                ความยาว
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                ราคา
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                ยอดดู
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                การกระทำ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {episodes.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  ไม่พบข้อมูลตอน
                </td>
              </tr>
            ) : (
              episodes.map((episode) => (
                <tr
                  key={episode.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-9 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs">
                        {episode.thumbnail ? (
                          <img
                            src={episode.thumbnail}
                            alt={episode.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          "📺"
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ตอนที่ {episode.episode_number}: {episode.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {episode.series?.title || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDuration(episode.duration)}
                  </td>
                  <td className="px-4 py-3">
                    {episode.is_free ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                        ฟรี
                      </span>
                    ) : (
                      <span className="text-gray-900 dark:text-white font-medium">
                        ฿{episode.price}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {episode.view_count.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => actions.openEditModal(episode.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="แก้ไข"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => actions.openDeleteModal(episode.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600"
                        title="ลบ"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => actions.setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
            หน้า {page} จาก {totalPages}
          </span>
          <button
            onClick={() => actions.setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {state.isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ยืนยันการลบ
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              คุณต้องการลบตอนนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={actions.closeDeleteModal}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                onClick={() =>
                  state.selectedEpisodeId &&
                  actions.deleteEpisode(state.selectedEpisodeId)
                }
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {state.loading && viewModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto" />
            <p className="text-gray-900 dark:text-white mt-2">
              กำลังดำเนินการ...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
