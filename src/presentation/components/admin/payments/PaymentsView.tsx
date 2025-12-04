"use client";

import {
  usePaymentsPresenter,
  type PaymentsViewModel,
} from "@/src/presentation/presenters/admin/payments";

interface PaymentsViewProps {
  initialViewModel?: PaymentsViewModel;
}

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

export function PaymentsView({ initialViewModel }: PaymentsViewProps) {
  const [state, actions] = usePaymentsPresenter(initialViewModel);
  const payments = state.viewModel?.payments || [];
  const stats = state.viewModel?.stats;

  if (state.loading && !state.viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

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
            ฿{(stats?.totalRevenue || 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">รายได้รวม</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600">
            ฿{(stats?.todayRevenue || 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            รายได้วันนี้
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.completedCount || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            รายการสำเร็จ
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-yellow-600">
            {stats?.pendingCount || 0}
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
                  actions.setStatusFilter(
                    option.value as typeof state.statusFilter
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.statusFilter === option.value
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            value={state.dateRange}
            onChange={(e) => actions.setDateRange(e.target.value)}
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
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 font-mono text-sm text-gray-900 dark:text-white">
                  {payment.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {payment.user_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.user_email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-gray-900 dark:text-white">
                      {payment.episode_title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {payment.series_title}
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
                      statusStyles[payment.status]?.color || ""
                    }`}
                  >
                    {statusStyles[payment.status]?.label || payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {new Date(payment.created_at).toLocaleDateString("th-TH", {
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
                        onClick={() => {
                          if (confirm("ต้องการคืนเงินรายการนี้?")) {
                            actions.refundPayment(payment.id);
                          }
                        }}
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

        {payments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              ไม่พบรายการชำระเงิน
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
