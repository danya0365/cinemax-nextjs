"use client";

import Link from "next/link";
import { useState } from "react";

interface SeriesItem {
  id: string;
  title: string;
  category: string;
  episodes: number;
  status: "published" | "draft" | "scheduled";
  views: number;
  createdAt: string;
}

const mockSeries: SeriesItem[] = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    category: "โรแมนติก",
    episodes: 16,
    status: "published",
    views: 125000,
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "มหากาพย์รัก",
    category: "ดราม่า",
    episodes: 24,
    status: "published",
    views: 98000,
    createdAt: "2024-11-28",
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    category: "ลึกลับ",
    episodes: 12,
    status: "draft",
    views: 0,
    createdAt: "2024-12-03",
  },
  {
    id: "4",
    title: "เกมรักเกมอำนาจ",
    category: "ดราม่า",
    episodes: 20,
    status: "published",
    views: 76000,
    createdAt: "2024-11-20",
  },
  {
    id: "5",
    title: "รักนี้ไม่มีวันลืม",
    category: "โรแมนติก",
    episodes: 0,
    status: "scheduled",
    views: 0,
    createdAt: "2024-12-10",
  },
];

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

export default function AdminSeriesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "scheduled"
  >("all");

  const filteredSeries = mockSeries.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

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
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาซีรีย์..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Status Filter */}
          <div className="flex gap-2">
            {[
              { value: "all", label: "ทั้งหมด" },
              { value: "published", label: "เผยแพร่" },
              { value: "draft", label: "แบบร่าง" },
              { value: "scheduled", label: "กำหนดเวลา" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
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
            {filteredSeries.map((series) => (
              <tr
                key={series.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs">
                      🎬
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {series.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {series.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {series.category}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {series.episodes} ตอน
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[series.status].color
                    }`}
                  >
                    {statusStyles[series.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {series.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/series/${series.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="แก้ไข"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/admin/series/${series.id}/episodes`}
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="จัดการตอน"
                    >
                      📺
                    </Link>
                    <button
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

        {filteredSeries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">ไม่พบซีรีย์</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          แสดง {filteredSeries.length} จาก {mockSeries.length} รายการ
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled
          >
            ก่อนหน้า
          </button>
          <button
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}
