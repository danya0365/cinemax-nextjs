import type { Category } from "@/src/domain/types";
import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "หมวดหมู่ทั้งหมด | CINEMAX",
  description: "เลือกชมซีรีย์จากหมวดหมู่ที่คุณชื่นชอบ",
};

// Mock categories data
const mockCategories: (Category & {
  seriesCount: number;
  thumbnail: string;
})[] = [
  {
    id: "1",
    name: "โรแมนติก",
    name_en: "Romance",
    name_cn: "浪漫",
    slug: "romance",
    icon: "💕",
    seriesCount: 45,
    thumbnail: "/images/category-romance.jpg",
  },
  {
    id: "2",
    name: "แอ็คชั่น",
    name_en: "Action",
    name_cn: "动作",
    slug: "action",
    icon: "💥",
    seriesCount: 32,
    thumbnail: "/images/category-action.jpg",
  },
  {
    id: "3",
    name: "ตลก",
    name_en: "Comedy",
    name_cn: "喜剧",
    slug: "comedy",
    icon: "😂",
    seriesCount: 28,
    thumbnail: "/images/category-comedy.jpg",
  },
  {
    id: "4",
    name: "ดราม่า",
    name_en: "Drama",
    name_cn: "戏剧",
    slug: "drama",
    icon: "🎭",
    seriesCount: 56,
    thumbnail: "/images/category-drama.jpg",
  },
  {
    id: "5",
    name: "แฟนตาซี",
    name_en: "Fantasy",
    name_cn: "奇幻",
    slug: "fantasy",
    icon: "✨",
    seriesCount: 23,
    thumbnail: "/images/category-fantasy.jpg",
  },
  {
    id: "6",
    name: "สยองขวัญ",
    name_en: "Horror",
    name_cn: "恐怖",
    slug: "horror",
    icon: "👻",
    seriesCount: 18,
    thumbnail: "/images/category-horror.jpg",
  },
  {
    id: "7",
    name: "ไมโครดราม่า",
    name_en: "Micro Drama",
    name_cn: "微短剧",
    slug: "micro-drama",
    icon: "📱",
    seriesCount: 67,
    thumbnail: "/images/category-micro.jpg",
  },
  {
    id: "8",
    name: "ซีรีย์แนวตั้ง",
    name_en: "Vertical Series",
    name_cn: "竖屏剧",
    slug: "vertical",
    icon: "📲",
    seriesCount: 41,
    thumbnail: "/images/category-vertical.jpg",
  },
];

// Category Card Component
function CategoryCard({ category }: { category: (typeof mockCategories)[0] }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-red-600/80 via-red-500/60 to-orange-500/80" />

      {/* Icon Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[120px]">
        {category.icon}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
          {category.icon}
        </span>
        <h3 className="text-xl font-bold text-center mb-1">{category.name}</h3>
        <p className="text-sm text-white/80">{category.name_en}</p>
        <p className="text-sm text-white/70 mt-2">
          {category.seriesCount} ซีรีย์
        </p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </Link>
  );
}

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              หมวดหมู่ทั้งหมด
            </h1>
            <p className="text-muted">เลือกชมซีรีย์จากหมวดหมู่ที่คุณชื่นชอบ</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Popular Categories Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              หมวดหมู่ยอดนิยม
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-red-500 transition-colors"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-3xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted">
                      {category.seriesCount} ซีรีย์
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-muted group-hover:text-red-600 group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
