"use client";

import {
  usePurchasesPresenter,
  type PurchasesViewModel,
} from "@/src/presentation/presenters/profile/purchases";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";

interface PurchasesViewProps {
  initialViewModel?: PurchasesViewModel;
}

const statusLabels = {
  completed: {
    label: "สำเร็จ",
    color: "text-green-600 bg-green-100 dark:bg-green-900/30",
  },
  pending: {
    label: "รอดำเนินการ",
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
  },
  failed: {
    label: "ไม่สำเร็จ",
    color: "text-red-600 bg-red-100 dark:bg-red-900/30",
  },
};

export function PurchasesView({ initialViewModel }: PurchasesViewProps) {
  const { user } = useAuthStore();
  const [state, actions] = usePurchasesPresenter(
    user?.id || null,
    initialViewModel
  );
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-muted">กำลังโหลดประวัติการซื้อ...</p>
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
          <p className="text-muted mb-4">{state.error}</p>
          <button
            onClick={() => user?.id && actions.loadData(user.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const purchases = viewModel?.purchases || [];
  const stats = viewModel?.stats || {
    totalPurchases: 0,
    completedPurchases: 0,
    totalSpent: 0,
    uniqueSeries: 0,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/profile"
          className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
        >
          <svg
            className="w-5 h-5 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">ประวัติการซื้อ</h1>
          <p className="text-muted">ดูรายการที่คุณซื้อทั้งหมด</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-surface border border-border rounded-xl">
          <div className="text-2xl font-bold text-foreground">
            {stats.totalPurchases}
          </div>
          <div className="text-sm text-muted">รายการทั้งหมด</div>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <div className="text-2xl font-bold text-green-600">
            {stats.completedPurchases}
          </div>
          <div className="text-sm text-muted">สำเร็จ</div>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <div className="text-2xl font-bold text-foreground">
            ฿{stats.totalSpent}
          </div>
          <div className="text-sm text-muted">ยอดรวม</div>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <div className="text-2xl font-bold text-red-600">
            {stats.uniqueSeries}
          </div>
          <div className="text-sm text-muted">ซีรีย์</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: "all", label: "ทั้งหมด" },
          { value: "completed", label: "สำเร็จ" },
          { value: "pending", label: "รอดำเนินการ" },
          { value: "failed", label: "ไม่สำเร็จ" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() =>
              actions.setFilter(option.value as typeof state.filter)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              state.filter === option.value
                ? "bg-red-600 text-white"
                : "bg-surface border border-border text-foreground hover:border-red-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Purchase List */}
      <div className="space-y-4">
        {purchases.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-xl">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ไม่มีรายการ
            </h3>
            <p className="text-muted mb-4">ยังไม่มีประวัติการซื้อ</p>
            <Link
              href="/series"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              ดูซีรีย์ทั้งหมด
            </Link>
          </div>
        ) : (
          purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex gap-4 p-4 bg-surface border border-border rounded-xl hover:border-red-500/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-20 h-28 rounded-lg bg-muted-light dark:bg-muted-dark shrink-0 overflow-hidden">
                {purchase.episode?.thumbnail ? (
                  <img
                    src={purchase.episode.thumbnail}
                    alt={purchase.episode.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                    EP{purchase.episode?.episode_number}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground truncate">
                      {purchase.episode?.series?.title || "ซีรีย์"}
                    </h3>
                    <p className="text-sm text-muted truncate">
                      ตอนที่ {purchase.episode?.episode_number}:{" "}
                      {purchase.episode?.title}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                      statusLabels[purchase.status].color
                    }`}
                  >
                    {statusLabels[purchase.status].label}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span>฿{purchase.amount}</span>
                  <span>{purchase.payment_method}</span>
                  <span>
                    {new Date(purchase.created_at).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {purchase.status === "completed" && purchase.episode && (
                  <Link
                    href={`/series/${purchase.episode.series?.id}/episode/${purchase.episode.episode_number}`}
                    className="inline-flex items-center gap-1 mt-3 text-sm text-red-600 hover:underline"
                  >
                    ▶️ ดูตอนนี้
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
