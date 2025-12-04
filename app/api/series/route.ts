import type { Series } from "@/src/domain/types";
import { NextResponse } from "next/server";

// Mock data - Replace with Supabase queries later
const mockSeries: Series[] = [
  {
    id: "1",
    title: "รักข้ามเวลา",
    title_en: "Love Across Time",
    description:
      "เรื่องราวความรักที่ข้ามกาลเวลา ระหว่างหญิงสาวยุคปัจจุบันกับชายหนุ่มจากอดีต",
    thumbnail: "/images/series-1.jpg",
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
    title: "มหากาพย์รัก",
    title_en: "Epic Love",
    description: "มหากาพย์ความรักอันยิ่งใหญ่ในยุคสามก๊ก",
    thumbnail: "/images/series-2.jpg",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 24,
    release_date: "2024-02-01",
    status: "ongoing",
    view_count: 1800000,
    rating: 4.7,
    is_featured: false,
    created_at: "2024-02-01",
    updated_at: "2024-02-15",
  },
  {
    id: "3",
    title: "ความลับที่ซ่อนไว้",
    title_en: "Hidden Secrets",
    description: "ความลับที่ซ่อนเร้นอยู่ในคฤหาสน์เก่าแก่",
    thumbnail: "/images/series-3.jpg",
    category_id: "3",
    category: { id: "3", name: "ลึกลับ", slug: "mystery" },
    total_episodes: 12,
    release_date: "2024-01-20",
    status: "completed",
    view_count: 1200000,
    rating: 4.5,
    is_featured: false,
    created_at: "2024-01-20",
    updated_at: "2024-02-01",
  },
  {
    id: "4",
    title: "เกมรักเกมอำนาจ",
    title_en: "Game of Love",
    description: "เกมแห่งอำนาจและความรักในโลกธุรกิจ",
    thumbnail: "/images/series-4.jpg",
    category_id: "2",
    category: { id: "2", name: "ดราม่า", slug: "drama" },
    total_episodes: 20,
    release_date: "2024-03-01",
    status: "ongoing",
    view_count: 900000,
    rating: 4.6,
    is_featured: true,
    created_at: "2024-03-01",
    updated_at: "2024-03-15",
  },
  {
    id: "5",
    title: "รักนี้ไม่มีวันลืม",
    title_en: "Unforgettable Love",
    description: "ความรักที่ไม่มีวันลืมเลือน แม้เวลาจะผ่านไป",
    thumbnail: "/images/series-5.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 18,
    release_date: "2024-02-15",
    status: "completed",
    view_count: 1500000,
    rating: 4.8,
    is_featured: false,
    created_at: "2024-02-15",
    updated_at: "2024-03-01",
  },
  {
    id: "6",
    title: "พรหมลิขิตรัก",
    title_en: "Destined Love",
    description: "พรหมลิขิตที่กำหนดให้สองดวงใจมาพบกัน",
    thumbnail: "/images/series-6.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 22,
    release_date: "2024-01-01",
    status: "ongoing",
    view_count: 2000000,
    rating: 4.7,
    is_featured: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-20",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("q");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  let results = [...mockSeries];

  // Filter by search query
  if (search) {
    const query = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.title_en?.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (category) {
    results = results.filter((s) => s.category?.slug === category);
  }

  // Filter featured
  if (featured === "true") {
    results = results.filter((s) => s.is_featured);
  }

  // Sort
  results.sort((a, b) => {
    switch (sort) {
      case "popular":
        return b.view_count - a.view_count;
      case "rating":
        return b.rating - a.rating;
      case "oldest":
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      case "newest":
      default:
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
    }
  });

  // Pagination
  const total = results.length;
  const paginatedResults = results.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginatedResults,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  });
}
