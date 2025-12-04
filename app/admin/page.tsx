import Link from "next/link";

// Mock stats
const stats = [
  {
    label: "ซีรีย์ทั้งหมด",
    value: "127",
    change: "+5",
    trend: "up",
    href: "/admin/series",
  },
  {
    label: "ตอนทั้งหมด",
    value: "1,842",
    change: "+23",
    trend: "up",
    href: "/admin/episodes",
  },
  {
    label: "ผู้ใช้ทั้งหมด",
    value: "45,231",
    change: "+342",
    trend: "up",
    href: "/admin/users",
  },
  {
    label: "รายได้เดือนนี้",
    value: "฿892,450",
    change: "+12%",
    trend: "up",
    href: "/admin/payments",
  },
];

const recentActivities = [
  { type: "user", message: "มีผู้ใช้สมัครใหม่ 15 คน", time: "5 นาทีก่อน" },
  {
    type: "series",
    message: "เพิ่มซีรีย์ใหม่ 'รักข้ามเวลา 2'",
    time: "1 ชั่วโมงก่อน",
  },
  {
    type: "payment",
    message: "มียอดซื้อ ฿12,500 จาก 43 รายการ",
    time: "2 ชั่วโมงก่อน",
  },
  { type: "episode", message: "อัปโหลด 5 ตอนใหม่", time: "3 ชั่วโมงก่อน" },
];

const quickActions = [
  { label: "เพิ่มซีรีย์", href: "/admin/series/new", icon: "➕" },
  { label: "อัปโหลดตอน", href: "/admin/episodes/upload", icon: "📤" },
  { label: "ดูรายงาน", href: "/admin/reports", icon: "📈" },
  { label: "ตั้งค่า", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminDashboard() {
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
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p
              className={`text-sm mt-2 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} จากเดือนที่แล้ว
            </p>
          </Link>
        ))}
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
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activity.type === "user"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : activity.type === "series"
                      ? "bg-purple-100 dark:bg-purple-900/30"
                      : activity.type === "payment"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-yellow-100 dark:bg-yellow-900/30"
                  }`}
                >
                  {activity.type === "user"
                    ? "👤"
                    : activity.type === "series"
                    ? "🎬"
                    : activity.type === "payment"
                    ? "💰"
                    : "📺"}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
