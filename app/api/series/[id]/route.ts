import type { Episode, Series } from "@/src/domain/types";
import { NextResponse } from "next/server";

// Mock data
const mockSeries: Record<string, Series> = {
  "1": {
    id: "1",
    title: "รักข้ามเวลา",
    title_en: "Love Across Time",
    description:
      "เรื่องราวความรักที่ข้ามกาลเวลา ระหว่างหญิงสาวยุคปัจจุบันกับชายหนุ่มจากอดีต เมื่อเธอได้ย้อนเวลากลับไป 100 ปี และพบกับรักแท้",
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
};

// Generate mock episodes
function generateEpisodes(seriesId: string, total: number): Episode[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `${seriesId}-ep-${i + 1}`,
    series_id: seriesId,
    episode_number: i + 1,
    title: `ตอนที่ ${i + 1}`,
    description: `เนื้อเรื่องตอนที่ ${i + 1}`,
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: 2400 + Math.floor(Math.random() * 600),
    thumbnail: `/images/ep-${(i % 6) + 1}.jpg`,
    is_free: i === 0,
    price: i === 0 ? 0 : 29,
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const includeEpisodes = searchParams.get("include") === "episodes";

  // Find series (mock - check if exists)
  const series = mockSeries[id] || {
    id,
    title: `ซีรีย์ ${id}`,
    title_en: `Series ${id}`,
    description: "รายละเอียดซีรีย์",
    thumbnail: "/images/series-1.jpg",
    category_id: "1",
    category: { id: "1", name: "โรแมนติก", slug: "romance" },
    total_episodes: 16,
    release_date: "2024-01-15",
    status: "completed" as const,
    view_count: 1000000,
    rating: 4.5,
    is_featured: false,
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  };

  const response: { series: Series; episodes?: Episode[] } = { series };

  if (includeEpisodes) {
    response.episodes = generateEpisodes(id, series.total_episodes);
  }

  return NextResponse.json(response);
}
