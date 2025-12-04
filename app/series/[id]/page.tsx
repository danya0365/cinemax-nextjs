import type { Episode, SeriesWithEpisodes } from "@/src/domain/types";
import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

// Mock data for series detail
const mockSeriesDetail: SeriesWithEpisodes = {
  id: "1",
  title: "รักข้ามเวลา",
  title_en: "Love Across Time",
  description:
    "เรื่องราวความรักที่ข้ามกาลเวลา เมื่อหญิงสาวยุคปัจจุบันได้ย้อนเวลากลับไปยังอดีต และได้พบกับชายหนุ่มที่ทำให้เธอหัวใจเต้นแรง แต่ความรักของพวกเขาจะฝ่าฟันกำแพงแห่งกาลเวลาได้หรือไม่?",
  thumbnail: "/images/placeholder-1.jpg",
  poster: "/images/placeholder-poster-1.jpg",
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
  episodes: Array.from({ length: 16 }, (_, i) => ({
    id: `ep-${i + 1}`,
    series_id: "1",
    episode_number: i + 1,
    title: `ตอนที่ ${i + 1}`,
    description: `เนื้อเรื่องตอนที่ ${i + 1}`,
    video_url: `/videos/ep-${i + 1}.mp4`,
    duration: 2400 + Math.floor(Math.random() * 600), // 40-50 minutes
    thumbnail: `/images/ep-${i + 1}.jpg`,
    is_free: i === 0, // Only first episode is free
    price: i === 0 ? 0 : 29,
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
  })),
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  // In real app, fetch series data here using id
  console.log("Generating metadata for series:", id);
  return {
    title: `${mockSeriesDetail.title} | CINEMAX`,
    description: mockSeriesDetail.description,
    openGraph: {
      title: mockSeriesDetail.title,
      description: mockSeriesDetail.description,
      type: "video.tv_show",
    },
  };
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} นาที`;
}

function formatViews(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

function EpisodeCard({
  episode,
  seriesId,
}: {
  episode: Episode;
  seriesId: string;
}) {
  return (
    <Link
      href={`/series/${seriesId}/episode/${episode.episode_number}`}
      className="group flex gap-4 p-4 bg-surface hover:bg-muted-light dark:hover:bg-muted-dark rounded-xl border border-border transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative w-32 sm:w-40 flex-shrink-0">
        <div className="aspect-video rounded-lg overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
          {formatDuration(episode.duration)}
        </div>

        {/* Lock/Free Badge */}
        {episode.is_free ? (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-green-600 text-white text-xs rounded">
            ฟรี
          </div>
        ) : (
          <div className="absolute top-1 left-1 p-1 bg-black/70 rounded">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors">
          ตอนที่ {episode.episode_number}
        </h3>
        {episode.title !== `ตอนที่ ${episode.episode_number}` && (
          <p className="text-sm text-muted mt-0.5">{episode.title}</p>
        )}
        {episode.description && (
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {episode.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2">
          {!episode.is_free && (
            <span className="text-sm font-medium text-red-600">
              ฿{episode.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  // In real app, fetch series data using resolvedParams.id
  console.log("Loading series:", resolvedParams.id);
  const series = mockSeriesDetail;

  return (
    <MainLayout>
      {/* Hero Banner */}
      <div className="relative bg-linear-to-b from-gray-900 to-background">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="w-full max-w-xs mx-auto lg:mx-0 flex-shrink-0">
              <div className="aspect-2/3 rounded-2xl overflow-hidden bg-linear-to-br from-gray-700 to-gray-800 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center lg:text-left">
              {/* Category Badge */}
              <Link
                href={`/series?category=${series.category?.slug}`}
                className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-4 hover:bg-red-700 transition-colors"
              >
                {series.category?.name}
              </Link>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {series.title}
              </h1>
              {series.title_en && (
                <p className="text-lg text-muted mb-4">{series.title_en}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold text-foreground">
                    {series.rating.toFixed(1)}
                  </span>
                </span>
                <span className="text-muted">|</span>
                <span className="text-muted">{series.total_episodes} ตอน</span>
                <span className="text-muted">|</span>
                <span className="text-muted">
                  {formatViews(series.view_count)} views
                </span>
                <span className="text-muted">|</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    series.status === "completed"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : series.status === "ongoing"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}
                >
                  {series.status === "completed"
                    ? "จบแล้ว"
                    : series.status === "ongoing"
                    ? "กำลังฉาย"
                    : "เร็วๆ นี้"}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                {series.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href={`/series/${series.id}/episode/1`}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  ดูตอนแรกฟรี
                </Link>
                <button className="px-8 py-3 bg-surface border border-border hover:bg-muted-light dark:hover:bg-muted-dark text-foreground font-semibold rounded-lg transition-colors flex items-center gap-2">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  เพิ่มในรายการ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            ตอนทั้งหมด ({series.episodes.length} ตอน)
          </h2>
          <p className="text-muted mt-1">ตอนแรกดูฟรี! ตอนถัดไปราคา ฿29/ตอน</p>
        </div>

        <div className="grid gap-4">
          {series.episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              seriesId={series.id}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
