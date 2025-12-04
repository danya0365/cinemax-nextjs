import type { Category, Series } from "@/src/domain/types";
import { MainLayout, SeriesGrid } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

// Mock categories
const mockCategories: Record<string, Category & { icon: string }> = {
  romance: {
    id: "1",
    name: "โรแมนติก",
    name_en: "Romance",
    name_cn: "浪漫",
    slug: "romance",
    icon: "💕",
  },
  action: {
    id: "2",
    name: "แอ็คชั่น",
    name_en: "Action",
    name_cn: "动作",
    slug: "action",
    icon: "💥",
  },
  comedy: {
    id: "3",
    name: "ตลก",
    name_en: "Comedy",
    name_cn: "喜剧",
    slug: "comedy",
    icon: "😂",
  },
  drama: {
    id: "4",
    name: "ดราม่า",
    name_en: "Drama",
    name_cn: "戏剧",
    slug: "drama",
    icon: "🎭",
  },
  fantasy: {
    id: "5",
    name: "แฟนตาซี",
    name_en: "Fantasy",
    name_cn: "奇幻",
    slug: "fantasy",
    icon: "✨",
  },
  horror: {
    id: "6",
    name: "สยองขวัญ",
    name_en: "Horror",
    name_cn: "恐怖",
    slug: "horror",
    icon: "👻",
  },
  "micro-drama": {
    id: "7",
    name: "ไมโครดราม่า",
    name_en: "Micro Drama",
    name_cn: "微短剧",
    slug: "micro-drama",
    icon: "📱",
  },
  vertical: {
    id: "8",
    name: "ซีรีย์แนวตั้ง",
    name_en: "Vertical Series",
    name_cn: "竖屏剧",
    slug: "vertical",
    icon: "📲",
  },
};

// Generate mock series for category
function getMockSeriesForCategory(categoryId: string): Series[] {
  const category = Object.values(mockCategories).find(
    (c) => c.id === categoryId
  );
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    title: `ซีรีย์${category?.name || ""} ${i + 1}`,
    title_en: `${category?.name_en || ""} Series ${i + 1}`,
    description: `เรื่องราวสุดพิเศษในหมวดหมู่${category?.name || ""}`,
    thumbnail: `/images/series-${(i % 6) + 1}.jpg`,
    category_id: categoryId,
    category: category,
    total_episodes: 10 + Math.floor(Math.random() * 20),
    release_date: "2024-01-15",
    status: ["ongoing", "completed", "upcoming"][
      Math.floor(Math.random() * 3)
    ] as Series["status"],
    view_count: Math.floor(Math.random() * 5000000),
    rating: 3.5 + Math.random() * 1.5,
    is_featured: i < 2,
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = mockCategories[slug];

  if (!category) {
    return {
      title: "ไม่พบหมวดหมู่ | CINEMAX",
    };
  }

  return {
    title: `${category.name} - ซีรีย์ทั้งหมด | CINEMAX`,
    description: `รวมซีรีย์${category.name}ที่ดีที่สุด ดูออนไลน์ได้เลยที่ CINEMAX`,
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { sort = "newest" } = await searchParams;
  const category = mockCategories[slug];

  if (!category) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              ไม่พบหมวดหมู่
            </h1>
            <Link
              href="/categories"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              กลับไปหน้าหมวดหมู่
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const series = getMockSeriesForCategory(category.id);

  // Sort series
  const sortedSeries = [...series].sort((a, b) => {
    switch (sort) {
      case "popular":
        return b.view_count - a.view_count;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
    }
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative py-16 bg-linear-to-br from-red-600 via-red-500 to-orange-500">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[200px]">
            {category.icon}
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="text-6xl mb-4 block">{category.icon}</span>
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg text-white/80">{category.name_en}</p>
            <p className="mt-4 text-white/70">{series.length} ซีรีย์</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              หน้าแรก
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-foreground transition-colors"
            >
              หมวดหมู่
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              ซีรีย์ทั้งหมด
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">เรียงตาม:</span>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {[
                  { value: "newest", label: "ใหม่ล่าสุด" },
                  { value: "popular", label: "ยอดนิยม" },
                  { value: "rating", label: "คะแนน" },
                ].map((option) => (
                  <Link
                    key={option.value}
                    href={`/categories/${slug}?sort=${option.value}`}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      sort === option.value
                        ? "bg-red-600 text-white"
                        : "bg-surface text-foreground hover:bg-muted-light dark:hover:bg-muted-dark"
                    }`}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Series Grid */}
          <SeriesGrid series={sortedSeries} />

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-surface border border-border hover:border-red-500 rounded-lg font-medium text-foreground transition-colors">
              โหลดเพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
