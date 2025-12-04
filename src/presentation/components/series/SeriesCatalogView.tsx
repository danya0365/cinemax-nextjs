"use client";

import {
  useSeriesPresenter,
  type SeriesViewModel,
} from "@/src/presentation/presenters/series";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SeriesCatalogViewProps {
  initialViewModel?: SeriesViewModel;
}

export function SeriesCatalogView({
  initialViewModel,
}: SeriesCatalogViewProps) {
  const [state, actions] = useSeriesPresenter(initialViewModel);
  const [searchTerm, setSearchTerm] = useState("");
  const viewModel = state.viewModel;

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.setFilters({ ...state.filters, search: searchTerm });
  };

  // Handle category filter
  const handleCategoryChange = (categoryId: string) => {
    actions.setFilters({ ...state.filters, category: categoryId });
  };

  // Handle status filter
  const handleStatusChange = (status: string) => {
    actions.setFilters({ ...state.filters, status });
  };

  // Handle sort
  const handleSortChange = (sort: "latest" | "popular" | "rating") => {
    actions.setFilters({ ...state.filters, sort });
  };

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
              <p className="text-muted">กำลังโหลดซีรีย์...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 font-medium mb-2">เกิดข้อผิดพลาด</p>
              <p className="text-muted mb-4">{state.error}</p>
              <button
                onClick={actions.loadData}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!viewModel || viewModel.series.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🎬</div>
              <p className="text-foreground font-medium mb-2">ไม่พบซีรีย์</p>
              <p className="text-muted">
                ยังไม่มีซีรีย์ในระบบ หรือไม่พบซีรีย์ที่ค้นหา
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { series, categories, stats, totalCount, page, perPage } = viewModel;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ซีรีย์ทั้งหมด
          </h1>
          <p className="text-muted">
            รวม {stats.totalSeries} ซีรีย์ | กำลังฉาย {stats.ongoingSeries} |
            จบแล้ว {stats.completedSeries}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-surface rounded-xl p-4 mb-8 border border-border">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาซีรีย์..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>

            {/* Category Filter */}
            <select
              value={state.filters.category || "all"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={state.filters.status || "all"}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="ongoing">กำลังฉาย</option>
              <option value="completed">จบแล้ว</option>
              <option value="upcoming">เร็วๆ นี้</option>
            </select>

            {/* Sort */}
            <select
              value={state.filters.sort || "latest"}
              onChange={(e) =>
                handleSortChange(
                  e.target.value as "latest" | "popular" | "rating"
                )
              }
              className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="latest">ล่าสุด</option>
              <option value="popular">ยอดนิยม</option>
              <option value="rating">คะแนนสูง</option>
            </select>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {series.map((item) => (
            <Link key={item.id} href={`/series/${item.id}`} className="group">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-4xl">🎬</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      item.status === "ongoing"
                        ? "bg-green-600 text-white"
                        : item.status === "completed"
                        ? "bg-blue-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {item.status === "ongoing"
                      ? "กำลังฉาย"
                      : item.status === "completed"
                      ? "จบแล้ว"
                      : "เร็วๆ นี้"}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                    ดูเลย
                  </span>
                </div>
              </div>

              <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted mt-1">
                <span>⭐ {item.rating.toFixed(1)}</span>
                <span>•</span>
                <span>{item.total_episodes} ตอน</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => actions.setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              ก่อนหน้า
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => actions.setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pageNum === page
                      ? "bg-red-600 text-white"
                      : "bg-surface border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => actions.setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              ถัดไป
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {state.loading && viewModel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto" />
              <p className="text-foreground mt-2">กำลังโหลด...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
