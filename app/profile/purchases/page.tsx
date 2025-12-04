"use client";

import { MainLayout } from "@/src/presentation/components";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Purchase {
  id: string;
  episodeId: string;
  seriesTitle: string;
  episodeTitle: string;
  episodeNumber: number;
  thumbnail: string;
  amount: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  purchasedAt: string;
}

// Mock data
const mockPurchases: Purchase[] = [
  {
    id: "1",
    episodeId: "1-ep-2",
    seriesTitle: "รักข้ามเวลา",
    episodeTitle: "ตอนที่ 2: การพบกันครั้งแรก",
    episodeNumber: 2,
    thumbnail: "/images/ep-1.jpg",
    amount: 29,
    paymentMethod: "PromptPay",
    status: "completed",
    purchasedAt: "2024-12-03T10:30:00",
  },
  {
    id: "2",
    episodeId: "1-ep-3",
    seriesTitle: "รักข้ามเวลา",
    episodeTitle: "ตอนที่ 3: ความรักที่เริ่มต้น",
    episodeNumber: 3,
    thumbnail: "/images/ep-2.jpg",
    amount: 29,
    paymentMethod: "Credit Card",
    status: "completed",
    purchasedAt: "2024-12-02T15:45:00",
  },
  {
    id: "3",
    episodeId: "2-ep-5",
    seriesTitle: "มหากาพย์รัก",
    episodeTitle: "ตอนที่ 5: ศึกชิงอำนาจ",
    episodeNumber: 5,
    thumbnail: "/images/ep-3.jpg",
    amount: 29,
    paymentMethod: "TrueMoney",
    status: "completed",
    purchasedAt: "2024-12-01T09:15:00",
  },
];

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

export default function PurchasesPage() {
  const router = useRouter();
  const { user, isInitialized, isLoading } = useAuthStore();
  const [purchases] = useState<Purchase[]>(mockPurchases);
  const [filter, setFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isInitialized, isLoading, user, router]);

  if (!isInitialized || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) return null;

  const filteredPurchases =
    filter === "all" ? purchases : purchases.filter((p) => p.status === filter);

  const totalSpent = purchases
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
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
              <h1 className="text-2xl font-bold text-foreground">
                ประวัติการซื้อ
              </h1>
              <p className="text-muted">ดูรายการที่คุณซื้อทั้งหมด</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-surface border border-border rounded-xl">
              <div className="text-2xl font-bold text-foreground">
                {purchases.length}
              </div>
              <div className="text-sm text-muted">รายการทั้งหมด</div>
            </div>
            <div className="p-4 bg-surface border border-border rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {purchases.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-sm text-muted">สำเร็จ</div>
            </div>
            <div className="p-4 bg-surface border border-border rounded-xl">
              <div className="text-2xl font-bold text-foreground">
                ฿{totalSpent}
              </div>
              <div className="text-sm text-muted">ยอดรวม</div>
            </div>
            <div className="p-4 bg-surface border border-border rounded-xl">
              <div className="text-2xl font-bold text-red-600">
                {new Set(purchases.map((p) => p.seriesTitle)).size}
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
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === option.value
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
            {filteredPurchases.length === 0 ? (
              <div className="text-center py-12 bg-surface border border-border rounded-xl">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ไม่มีรายการ
                </h3>
                <p className="text-muted mb-4">
                  ยังไม่มีประวัติการซื้อในหมวดนี้
                </p>
                <Link
                  href="/series"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  ดูซีรีย์ทั้งหมด
                </Link>
              </div>
            ) : (
              filteredPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex gap-4 p-4 bg-surface border border-border rounded-xl hover:border-red-500/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-28 rounded-lg bg-muted-light dark:bg-muted-dark shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                      EP{purchase.episodeNumber}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground truncate">
                          {purchase.seriesTitle}
                        </h3>
                        <p className="text-sm text-muted truncate">
                          {purchase.episodeTitle}
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
                      <span>{purchase.paymentMethod}</span>
                      <span>
                        {new Date(purchase.purchasedAt).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    {purchase.status === "completed" && (
                      <Link
                        href={`/series/1/episode/${purchase.episodeNumber}`}
                        className="inline-flex items-center gap-1 mt-3 text-sm text-red-600 hover:underline"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        ดูตอนนี้
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
