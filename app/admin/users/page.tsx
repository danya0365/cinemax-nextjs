"use client";

import { useState } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  role: "user" | "premium" | "admin";
  status: "active" | "suspended";
  purchases: number;
  joinedAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    email: "user1@example.com",
    username: "สมชาย",
    role: "premium",
    status: "active",
    purchases: 15,
    joinedAt: "2024-10-15",
  },
  {
    id: "2",
    email: "user2@example.com",
    username: "สมหญิง",
    role: "user",
    status: "active",
    purchases: 3,
    joinedAt: "2024-11-20",
  },
  {
    id: "3",
    email: "admin@cinemax.com",
    username: "Admin",
    role: "admin",
    status: "active",
    purchases: 0,
    joinedAt: "2024-01-01",
  },
  {
    id: "4",
    email: "user3@example.com",
    username: "วิชัย",
    role: "user",
    status: "suspended",
    purchases: 0,
    joinedAt: "2024-12-01",
  },
  {
    id: "5",
    email: "user4@example.com",
    username: "มานี",
    role: "premium",
    status: "active",
    purchases: 28,
    joinedAt: "2024-09-10",
  },
];

const roleStyles = {
  user: {
    label: "ผู้ใช้",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
  premium: {
    label: "Premium",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  admin: {
    label: "แอดมิน",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

const statusStyles = {
  active: {
    label: "ใช้งาน",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  suspended: {
    label: "ระงับ",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "user" | "premium" | "admin"
  >("all");

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          จัดการผู้ใช้
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ดูและจัดการผู้ใช้ทั้งหมดในระบบ
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockUsers.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ผู้ใช้ทั้งหมด
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-yellow-600">
            {mockUsers.filter((u) => u.role === "premium").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Premium</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600">
            {mockUsers.filter((u) => u.status === "active").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ใช้งานอยู่</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-red-600">
            {mockUsers.filter((u) => u.status === "suspended").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ถูกระงับ</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาผู้ใช้..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: "all", label: "ทั้งหมด" },
              { value: "user", label: "ผู้ใช้" },
              { value: "premium", label: "Premium" },
              { value: "admin", label: "แอดมิน" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setRoleFilter(option.value as typeof roleFilter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === option.value
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ผู้ใช้
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                บทบาท
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                การซื้อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                สมัครเมื่อ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-medium">
                      {user.username.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      roleStyles[user.role].color
                    }`}
                  >
                    {roleStyles[user.role].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[user.status].color
                    }`}
                  >
                    {statusStyles[user.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.purchases} รายการ
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.joinedAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                      title="ดูรายละเอียด"
                    >
                      👁️
                    </button>
                    <button
                      className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                      title="แก้ไข"
                    >
                      ✏️
                    </button>
                    {user.status === "active" ? (
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="ระงับ"
                      >
                        🚫
                      </button>
                    ) : (
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                        title="เปิดใช้งาน"
                      >
                        ✅
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
