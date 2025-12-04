"use client";

import { useState } from "react";

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  episodeTitle: string;
  seriesTitle: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  createdAt: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    userId: "1",
    userName: "สมชาย",
    userEmail: "user1@example.com",
    episodeTitle: "ตอนที่ 2",
    seriesTitle: "รักข้ามเวลา",
    amount: 29,
    method: "PromptPay",
    status: "completed",
    createdAt: "2024-12-04T08:30:00",
  },
  {
    id: "PAY002",
    userId: "2",
    userName: "สมหญิง",
    userEmail: "user2@example.com",
    episodeTitle: "ตอนที่ 3",
    seriesTitle: "รักข้ามเวลา",
    amount: 29,
    method: "Credit Card",
    status: "completed",
    createdAt: "2024-12-04T07:15:00",
  },
  {
    id: "PAY003",
    userId: "5",
    userName: "มานี",
    userEmail: "user4@example.com",
    episodeTitle: "ตอนที่ 5",
    seriesTitle: "มหากาพย์รัก",
    amount: 35,
    method: "TrueMoney",
    status: "pending",
    createdAt: "2024-12-04T06:45:00",
  },
  {
    id: "PAY004",
    userId: "1",
    userName: "สมชาย",
    userEmail: "user1@example.com",
    episodeTitle: "ตอนที่ 4",
    seriesTitle: "รักข้ามเวลา",
    amount: 29,
    method: "PromptPay",
    status: "completed",
    createdAt: "2024-12-03T22:10:00",
  },
  {
    id: "PAY005",
    userId: "3",
    userName: "วิชัย",
    userEmail: "user3@example.com",
    episodeTitle: "ตอนที่ 2",
    seriesTitle: "มหากาพย์รัก",
    amount: 35,
    method: "Credit Card",
    status: "failed",
    createdAt: "2024-12-03T18:30:00",
  },
  {
    id: "PAY006",
    userId: "5",
    userName: "มานี",
    userEmail: "user4@example.com",
    episodeTitle: "ตอนที่ 3",
    seriesTitle: "รักข้ามเวลา",
    amount: 29,
    method: "PromptPay",
    status: "refunded",
    createdAt: "2024-12-02T14:20:00",
  },
];

const statusStyles = {
  completed: {
    label: "สำเร็จ",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  pending: {
    label: "รอดำเนินการ",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  failed: {
    label: "ไม่สำเร็จ",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  refunded: {
    label: "คืนเงิน",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
};

export default function AdminPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending" | "failed" | "refunded"
  >("all");
  const [dateRange, setDateRange] = useState("7days");

  const filteredPayments = mockPayments.filter((p) => {
    return statusFilter === "all" || p.status === statusFilter;
  });

  const totalRevenue = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const todayRevenue = mockPayments
    .filter(
      (p) => p.status === "completed" && p.createdAt.startsWith("2024-12-04")
    )
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          การชำระเงิน
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ดูรายงานและจัดการการชำระเงิน
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600">
            ฿{totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">รายได้รวม</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600">
            ฿{todayRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            รายได้วันนี้
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockPayments.filter((p) => p.status === "completed").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            รายการสำเร็จ
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-yellow-600">
            {mockPayments.filter((p) => p.status === "pending").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            รอดำเนินการ
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "all", label: "ทั้งหมด" },
              { value: "completed", label: "สำเร็จ" },
              { value: "pending", label: "รอดำเนินการ" },
              { value: "failed", label: "ไม่สำเร็จ" },
              { value: "refunded", label: "คืนเงิน" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setStatusFilter(option.value as typeof statusFilter)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === option.value
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
          >
            <option value="today">วันนี้</option>
            <option value="7days">7 วันล่าสุด</option>
            <option value="30days">30 วันล่าสุด</option>
            <option value="all">ทั้งหมด</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                รหัส
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ผู้ใช้
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                รายการ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                จำนวนเงิน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                ช่องทาง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                วันที่
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 font-mono text-sm text-gray-900 dark:text-white">
                  {payment.id}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {payment.userName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.userEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-gray-900 dark:text-white">
                      {payment.episodeTitle}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.seriesTitle}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  ฿{payment.amount}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {payment.method}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[payment.status].color
                    }`}
                  >
                    {statusStyles[payment.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {new Date(payment.createdAt).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                      title="ดูรายละเอียด"
                    >
                      👁️
                    </button>
                    {payment.status === "completed" && (
                      <button
                        className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg"
                        title="คืนเงิน"
                      >
                        💸
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
