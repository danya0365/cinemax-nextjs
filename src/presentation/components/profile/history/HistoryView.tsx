"use client";

import {
  useHistoryPresenter,
  type HistoryViewModel,
} from "@/src/presentation/presenters/profile/history";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";

interface HistoryViewProps {
  initialViewModel?: HistoryViewModel;
}

export function HistoryView({ initialViewModel }: HistoryViewProps) {
  const { user } = useAuthStore();
  const [state, actions] = useHistoryPresenter(
    user?.id || null,
    initialViewModel
  );
  const history = state.viewModel?.history || [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (state.loading && !state.viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/profile"
          className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
        >
          <svg
            className="w-5 h-5"
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
            ประวัติการรับชม
          </h1>
          <p className="text-muted text-sm">
            {state.viewModel?.total || 0} รายการ
          </p>
        </div>
      </div>

      {/* History List */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 rounded-xl bg-surface border border-border"
            >
              <Link
                href={`/series/${item.series_id}/episode/${item.episode_number}`}
                className="relative w-40 h-24 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark shrink-0 group"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-muted group-hover:text-red-600 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div
                    className="h-full bg-red-600"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/series/${item.series_id}`}
                  className="font-semibold text-foreground hover:text-red-600 transition-colors"
                >
                  {item.series_title}
                </Link>
                <p className="text-sm text-muted mt-1">
                  ตอนที่ {item.episode_number} / {item.total_episodes}
                </p>
                <p className="text-xs text-muted mt-2">
                  ดูเมื่อ {formatDate(item.watched_at)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/series/${item.series_id}/episode/${item.episode_number}`}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  ดูต่อ
                </Link>
                <button
                  onClick={() => actions.deleteItem(item.id)}
                  className="p-2 text-muted hover:text-red-600 hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg transition-colors"
                  title="ลบออกจากประวัติ"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 mx-auto text-muted mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">
            ยังไม่มีประวัติการรับชม
          </h3>
          <p className="text-muted mb-6">
            เริ่มดูซีรีย์เพื่อบันทึกประวัติการรับชม
          </p>
          <Link
            href="/series"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            สำรวจซีรีย์
          </Link>
        </div>
      )}
    </div>
  );
}
