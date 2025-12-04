"use client";

import {
  useUsersPresenter,
  type UsersViewModel,
} from "@/src/presentation/presenters/admin/users";

interface UsersViewProps {
  initialViewModel?: UsersViewModel;
}

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

export function UsersView({ initialViewModel }: UsersViewProps) {
  const [state, actions] = useUsersPresenter(initialViewModel);
  const viewModel = state.viewModel;

  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  const users = viewModel?.users || [];
  const stats = viewModel?.stats;

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
            {stats?.total || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ผู้ใช้ทั้งหมด
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-yellow-600">
            {stats?.premium || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Premium</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600">
            {stats?.active || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">ใช้งานอยู่</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-bold text-red-600">
            {stats?.suspended || 0}
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
              value={state.search}
              onChange={(e) => actions.setSearch(e.target.value)}
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
                onClick={() =>
                  actions.setRoleFilter(option.value as typeof state.roleFilter)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  state.roleFilter === option.value
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-medium">
                      {user.username.charAt(0).toUpperCase()}
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
                      roleStyles[user.role]?.color || ""
                    }`}
                  >
                    {roleStyles[user.role]?.label || user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusStyles[user.status]?.color || ""
                    }`}
                  >
                    {statusStyles[user.status]?.label || user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.purchases_count} รายการ
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {new Date(user.created_at).toLocaleDateString("th-TH")}
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
                        onClick={() =>
                          actions.toggleUserStatus(user.id, user.status)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="ระงับ"
                      >
                        🚫
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          actions.toggleUserStatus(user.id, user.status)
                        }
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

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">ไม่พบผู้ใช้</p>
          </div>
        )}
      </div>
    </div>
  );
}
