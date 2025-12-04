"use client";

import {
  useFavoritesPresenter,
  type FavoritesViewModel,
} from "@/src/presentation/presenters/profile/favorites";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";

interface FavoritesViewProps {
  initialViewModel?: FavoritesViewModel;
}

export function FavoritesView({ initialViewModel }: FavoritesViewProps) {
  const { user } = useAuthStore();
  const [state, actions] = useFavoritesPresenter(
    user?.id || null,
    initialViewModel
  );
  const favorites = state.viewModel?.favorites || [];

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
          <h1 className="text-2xl font-bold text-foreground">รายการโปรด</h1>
          <p className="text-muted text-sm">
            {state.viewModel?.total || 0} รายการ
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/series/${item.series_id}`}>
                <div className="aspect-2/3 rounded-lg overflow-hidden bg-muted-light dark:bg-muted-dark mb-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        item.status === "ongoing"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.status === "ongoing" ? "กำลังฉาย" : "จบแล้ว"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => actions.removeFavorite(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                title="ลบออกจากรายการโปรด"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <Link href={`/series/${item.series_id}`}>
                <h3 className="font-medium text-foreground text-sm truncate group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted">
                  {item.total_episodes} ตอน
                </span>
                <span className="text-xs text-muted">•</span>
                <span className="text-xs text-yellow-500 flex items-center gap-0.5">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {item.rating}
                </span>
              </div>
            </div>
          ))}

          <Link
            href="/series"
            className="aspect-2/3 rounded-lg border-2 border-dashed border-border hover:border-red-500 flex flex-col items-center justify-center gap-2 text-muted hover:text-red-600 transition-colors"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-sm font-medium">เพิ่มรายการ</span>
          </Link>
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">
            ยังไม่มีรายการโปรด
          </h3>
          <p className="text-muted mb-6">
            เพิ่มซีรีย์ที่ชอบเข้ารายการโปรดเพื่อดูภายหลัง
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
