"use client";

import Link from "next/link";
import { useState } from "react";

interface Episode {
  id: string;
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  title: string;
  duration: string;
  isFree: boolean;
  price: number;
  views: number;
  status: "published" | "processing" | "draft";
  uploadedAt: string;
}

const mockEpisodes: Episode[] = [
  {
    id: "1",
    seriesId: "1",
    seriesTitle: "รักข้ามเวลา",
    episodeNumber: 1,
    title: "จุดเริ่มต้น",
    duration: "12:30",
    isFree: true,
    price: 0,
    views: 45000,
    status: "published",
    uploadedAt: "2024-12-01",
  },
  {
    id: "2",
    seriesId: "1",
    seriesTitle: "รักข้ามเวลา",
    episodeNumber: 2,
    title: "การพบกันครั้งแรก",
    duration: "11:45",
    isFree: false,
    price: 29,
    views: 32000,
    status: "published",
    uploadedAt: "2024-12-01",
  },
  {
    id: "3",
    seriesId: "1",
    seriesTitle: "รักข้ามเวลา",
    episodeNumber: 3,
    title: "ความรักที่เริ่มต้น",
    duration: "13:20",
    isFree: false,
    price: 29,
    views: 28000,
    status: "published",
    uploadedAt: "2024-12-02",
  },
  {
    id: "4",
    seriesId: "2",
    seriesTitle: "มหากาพย์รัก",
    episodeNumber: 1,
    title: "ปฐมบท",
    duration: "15:00",
    isFree: true,
    price: 0,
    views: 38000,
    status: "published",
    uploadedAt: "2024-11-28",
  },
  {
    id: "5",
    seriesId: "2",
    seriesTitle: "มหากาพย์รัก",
    episodeNumber: 2,
    title: "ศึกชิงอำนาจ",
    duration: "14:30",
    isFree: false,
    price: 35,
    views: 0,
    status: "processing",
    uploadedAt: "2024-12-03",
  },
  {
    id: "6",
    seriesId: "3",
    seriesTitle: "ความลับที่ซ่อนไว้",
    episodeNumber: 1,
    title: "ความลับแรก",
    duration: "10:15",
    isFree: true,
    price: 0,
    views: 0,
    status: "draft",
    uploadedAt: "2024-12-03",
  },
];

const statusStyles = {
  published: {
    label: "เผยแพร่",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  processing: {
    label: "กำลังประมวลผล",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  draft: {
    label: "แบบร่าง",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
};

export default function AdminEpisodesPage() {
  const [search, setSearch] = useState("");
  const [seriesFilter, setSeriesFilter] = useState<string>("all");

  const seriesList = [...new Set(mockEpisodes.map((e) => e.seriesTitle))];

  const filteredEpisodes = mockEpisodes.filter((ep) => {
    const matchesSearch =
      ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.seriesTitle.toLowerCase().includes(search.toLowerCase());
    const matchesSeries =
      seriesFilter === "all" || ep.seriesTitle === seriesFilter;
    return matchesSearch && matchesSeries;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            จัดการตอน
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการตอนทั้งหมดในระบบ
          </p>
        </div>
        <Link
          href="/admin/episodes/upload"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>📤</span>
          อัปโหลดตอนใหม่
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockEpisodes.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ตอนทั้งหมด</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600">
            {mockEpisodes.filter((e) => e.status === "published").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            เผยแพร่แล้ว
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600">
            {mockEpisodes.filter((e) => e.isFree).length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ตอนฟรี</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-purple-600">
            {mockEpisodes.reduce((sum, e) => sum + e.views, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ยอดดูรวม</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาตอน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={seriesFilter}
            onChange={(e) => setSeriesFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">ทุกซีรีย์</option>
            {seriesList.map((series) => (
              <option key={series} value={series}>
                {series}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ตอน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ซีรีย์
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ระยะเวลา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ราคา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ยอดดู
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEpisodes.map((episode) => (
              <tr
                key={episode.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 rounded bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      EP{episode.episodeNumber}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {episode.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ตอนที่ {episode.episodeNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {episode.seriesTitle}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {episode.duration}
                </td>
                <td className="px-6 py-4">
                  {episode.isFree ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">
                      ฟรี
                    </span>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300">
                      ฿{episode.price}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[episode.status].color
                    }`}
                  >
                    {statusStyles[episode.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {episode.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                      title="แก้ไข"
                    >
                      ✏️
                    </button>
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg"
                      title="ดูตัวอย่าง"
                    >
                      👁️
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
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

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">ไม่พบตอน</p>
          </div>
        )}
      </div>
    </div>
  );
}
