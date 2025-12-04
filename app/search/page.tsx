import type { Series } from "@/src/domain/types";
import { MainLayout, SeriesGrid } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

// Mock search data
const mockAllSeries: Series[] = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    title_en: "Love Across Time",
    description: "เรื่องราวความรักที่ข้ามกาลเวลา",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 16,
    release_date: "2024-01-15",
    status: "completed",
    view_count: 2500000,
    rating: 4.9,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "มหากาพย์รัก",
    title_en: "Epic Love",
    description: "มหากาพย์ความรักอันยิ่งใหญ่",
    thumbnail: "",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 24,
    release_date: "2024-02-01",
    status: "ongoing",
    view_count: 1800000,
    rating: 4.7,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    title_en: "Hidden Secrets",
    description: "ความลับที่ซ่อนเร้น",
    thumbnail: "",
    category_id: "3",
    category: { id: "3", name: "ลึกลับ", slug: "mystery" },
    total_episodes: 12,
    release_date: "2024-01-20",
    status: "completed",
    view_count: 1200000,
    rating: 4.5,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "เกมรักเกมอำนาจ",
    title_en: "Game of Love",
    description: "เกมแห่งอำนาจและความรัก",
    thumbnail: "",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 20,
    release_date: "2024-03-01",
    status: "ongoing",
    view_count: 900000,
    rating: 4.6,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    title: "รักนี้ไม่มีวันลืม",
    title_en: "Unforgettable Love",
    description: "ความรักที่ไม่มีวันลืมเลือน",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 18,
    release_date: "2024-02-15",
    status: "completed",
    view_count: 1500000,
    rating: 4.8,
    is_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "6",
    title: "พรหมลิขิตรัก",
    title_en: "Destined Love",
    description: "พรหมลิขิตที่กำหนดมา",
    thumbnail: "",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 22,
    release_date: "2024-01-01",
    status: "ongoing",
    view_count: 2000000,
    rating: 4.7,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
];

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `ผลการค้นหา "${q}" | CINEMAX` : "ค้นหา | CINEMAX",
    description: q
      ? `ค้นหาซีรีย์ "${q}" บน CINEMAX`
      : "ค้นหาซีรีย์ที่คุณชื่นชอบ",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "", category = "", sort = "relevance" } = await searchParams;

  // Filter results
  let results = mockAllSeries;

  if (q) {
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.title_en?.toLowerCase().includes(q.toLowerCase()) ||
        s.description?.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    results = results.filter((s) => s.category?.slug === category);
  }

  // Sort results
  results = [...results].sort((a, b) => {
    switch (sort) {
      case "newest":
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.view_count - a.view_count;
      default:
        return 0;
    }
  });

  const categories = [
    { slug: "", name: "ทั้งหมด" },
    { slug: "romance", name: "โรแมนติก" },
    { slug: "drama", name: "ดราม่า" },
    { slug: "mystery", name: "ลึกลับ" },
    { slug: "action", name: "แอ็คชั่น" },
    { slug: "comedy", name: "ตลก" },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {q ? <>ผลการค้นหา &quot;{q}&quot;</> : "ค้นหาซีรีย์"}
            </h1>
            {q && <p className="text-muted">พบ {results.length} รายการ</p>}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/search?q=${q}&category=${cat.slug}&sort=${sort}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat.slug
                      ? "bg-red-600 text-white"
                      : "bg-surface border border-border text-foreground hover:border-red-500"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted">เรียงตาม:</span>
              <select
                defaultValue={sort}
                onChange={(e) => {
                  window.location.href = `/search?q=${q}&category=${category}&sort=${e.target.value}`;
                }}
                className="px-3 py-2 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="relevance">ความเกี่ยวข้อง</option>
                <option value="newest">ใหม่ล่าสุด</option>
                <option value="popular">ยอดนิยม</option>
                <option value="rating">คะแนน</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <SeriesGrid series={results} />
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-foreground mb-2">
                ไม่พบผลลัพธ์
              </h3>
              <p className="text-muted mb-6">
                {q ? `ไม่พบซีรีย์ที่ตรงกับ "${q}"` : "ลองค้นหาด้วยคำค้นอื่น"}
              </p>
              <Link
                href="/series"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                ดูซีรีย์ทั้งหมด
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
