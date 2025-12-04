"use client";

import {
  useCategoriesPresenter,
  type CategoriesViewModel,
} from "@/src/presentation/presenters/categories";
import Link from "next/link";

interface CategoriesViewProps {
  initialViewModel?: CategoriesViewModel;
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  romance: "💕",
  action: "💥",
  comedy: "😂",
  drama: "🎭",
  fantasy: "✨",
  horror: "👻",
  mystery: "🔍",
  thriller: "😱",
  historical: "🏛️",
  default: "🎬",
};

export function CategoriesView({ initialViewModel }: CategoriesViewProps) {
  const [state, actions] = useCategoriesPresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
            <p className="text-muted">กำลังโหลดหมวดหมู่...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return (
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
    );
  }

  // Empty state
  if (!viewModel || viewModel.categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <p className="text-foreground font-medium mb-2">ไม่พบหมวดหมู่</p>
            <p className="text-muted">ยังไม่มีหมวดหมู่ในระบบ</p>
          </div>
        </div>
      </div>
    );
  }

  const { categories } = viewModel;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          หมวดหมู่ซีรีย์
        </h1>
        <p className="text-muted">
          เลือกดูซีรีย์ตามหมวดหมู่ที่คุณชื่นชอบ ({categories.length} หมวดหมู่)
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group"
          >
            <div className="bg-surface border border-border rounded-xl p-6 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl mb-3">
                {category.icon ||
                  categoryIcons[category.slug] ||
                  categoryIcons.default}
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-red-500 transition-colors">
                {category.name}
              </h3>
              {category.series_count !== undefined && (
                <p className="text-sm text-muted mt-1">
                  {category.series_count} ซีรีย์
                </p>
              )}
              {category.description && (
                <p className="text-sm text-muted mt-2 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
