import type { Category, Series } from "@/src/domain/types";
import { MainLayout, SeriesGrid } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ซีรีย์ทั้งหมด | CINEMAX",
  description:
    "รวมซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น ทุกแนวทุกหมวดหมู่",
};

// Mock data for series
const mockSeries: Series[] = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    description: "เรื่องราวความรักที่ข้ามกาลเวลา",
    thumbnail: "/images/placeholder-1.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 16,
    release_date: "2024-01-15",
    status: "completed",
    view_count: 2500000,
    rating: 4.9,
    is_featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    title: "หัวใจที่รอคอย",
    description: "เรื่องราวของหญิงสาวที่รอคอยรักแท้",
    thumbnail: "/images/placeholder-2.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 20,
    release_date: "2024-02-01",
    status: "ongoing",
    view_count: 1800000,
    rating: 4.7,
    is_featured: false,
    created_at: "2024-02-01",
    updated_at: "2024-03-01",
  },
  {
    id: "3",
    title: "เส้นทางสู่ความฝัน",
    description: "การเดินทางสู่ความสำเร็จ",
    thumbnail: "/images/placeholder-3.jpg",
    category_id: "4",
    category: { id: "4", name: "ดราม่า", slug: "drama" },
    total_episodes: 12,
    release_date: "2024-03-01",
    status: "ongoing",
    view_count: 1200000,
    rating: 4.6,
    is_featured: true,
    created_at: "2024-03-01",
    updated_at: "2024-03-15",
  },
  {
    id: "4",
    title: "พรหมลิขิตรัก",
    description: "เรื่องราวรักที่ถูกกำหนดโดยชะตา",
    thumbnail: "/images/placeholder-4.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 18,
    release_date: "2024-03-15",
    status: "ongoing",
    view_count: 980000,
    rating: 4.8,
    is_featured: false,
    created_at: "2024-03-15",
    updated_at: "2024-04-01",
  },
  {
    id: "5",
    title: "สืบสวนสุดขอบฟ้า",
    description: "นักสืบหนุ่มไขคดีลึกลับ",
    thumbnail: "/images/placeholder-5.jpg",
    category_id: "2",
    category: { id: "2", name: "แอ็คชั่น", slug: "action" },
    total_episodes: 24,
    release_date: "2024-04-01",
    status: "upcoming",
    view_count: 500000,
    rating: 4.5,
    is_featured: true,
    created_at: "2024-04-01",
    updated_at: "2024-04-01",
  },
  {
    id: "6",
    title: "หัวเราะกันทั้งวัน",
    description: "ซิทคอมสุดฮาแห่งปี",
    thumbnail: "/images/placeholder-6.jpg",
    category_id: "3",
    category: { id: "3", name: "ตลก", slug: "comedy" },
    total_episodes: 30,
    release_date: "2024-02-15",
    status: "ongoing",
    view_count: 750000,
    rating: 4.4,
    is_featured: false,
    created_at: "2024-02-15",
    updated_at: "2024-04-01",
  },
];

// Mock data for categories
const mockCategories: Category[] = [
  { id: "all", name: "ทั้งหมด", slug: "all" },
  { id: "1", name: "โรแมนติก", slug: "romance" },
  { id: "2", name: "แอ็คชั่น", slug: "action" },
  { id: "3", name: "ตลก", slug: "comedy" },
  { id: "4", name: "ดราม่า", slug: "drama" },
  { id: "5", name: "แฟนตาซี", slug: "fantasy" },
  { id: "6", name: "สยองขวัญ", slug: "horror" },
];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SeriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const sort = params.sort as string | undefined;
  const search = params.search as string | undefined;

  // Filter series based on params
  let filteredSeries = [...mockSeries];

  if (category && category !== "all") {
    filteredSeries = filteredSeries.filter(
      (s) => s.category?.slug === category
    );
  }

  if (search) {
    filteredSeries = filteredSeries.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort series
  if (sort === "newest") {
    filteredSeries.sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  } else if (sort === "popular") {
    filteredSeries.sort((a, b) => b.view_count - a.view_count);
  } else if (sort === "rating") {
    filteredSeries.sort((a, b) => b.rating - a.rating);
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground">
              ซีรีย์ทั้งหมด
            </h1>
            <p className="text-muted mt-2">
              รวมซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น ทุกแนวทุกหมวดหมู่
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {mockCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/series?category=${cat.slug}${
                    sort ? `&sort=${sort}` : ""
                  }${search ? `&search=${search}` : ""}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat.slug || (!category && cat.slug === "all")
                      ? "bg-red-600 text-white"
                      : "bg-muted-light dark:bg-muted-dark text-foreground hover:bg-red-100 dark:hover:bg-red-900/30"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Sort */}
            <div className="sm:ml-auto flex items-center gap-2">
              <span className="text-sm text-muted">เรียงตาม:</span>
              <select
                defaultValue={sort || "newest"}
                onChange={(e) => {
                  if (typeof window !== "undefined") {
                    const url = new URL(window.location.href);
                    url.searchParams.set("sort", e.target.value);
                    window.location.href = url.toString();
                  }
                }}
                className="px-3 py-2 bg-input-bg border border-input-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="newest">ใหม่ล่าสุด</option>
                <option value="popular">ยอดนิยม</option>
                <option value="rating">เรตติ้งสูงสุด</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted">
              พบ {filteredSeries.length} เรื่อง
              {category && category !== "all" && (
                <span>
                  {" "}
                  ในหมวดหมู่{" "}
                  <span className="text-foreground font-medium">
                    {mockCategories.find((c) => c.slug === category)?.name}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Series Grid */}
          <SeriesGrid series={filteredSeries} />

          {/* Load More */}
          {filteredSeries.length >= 6 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                โหลดเพิ่มเติม
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
