import type { Episode, Series } from "@/src/domain/types";
import { MainLayout, VideoPlayer } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

// Mock data
const mockSeries: Series = {
  id: "1",
  title: "รักข้ามเวลา",
  title_en: "Love Across Time",
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
};

const mockEpisodes: Episode[] = Array.from({ length: 16 }, (_, i) => ({
  id: `ep-${i + 1}`,
  series_id: "1",
  episode_number: i + 1,
  title: `ตอนที่ ${i + 1}`,
  description: `เนื้อเรื่องตอนที่ ${i + 1} - ความรักที่ต้องฝ่าฟันอุปสรรค`,
  video_url: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video
  duration: 2400 + Math.floor(Math.random() * 600),
  thumbnail: `/images/ep-${i + 1}.jpg`,
  is_free: i === 0,
  price: i === 0 ? 0 : 29,
  created_at: "2024-01-01",
  updated_at: "2024-01-15",
}));

interface PageProps {
  params: Promise<{ id: string; ep: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { ep } = await params;
  return {
    title: `${mockSeries.title} ตอนที่ ${ep} | CINEMAX`,
    description: `ดู ${mockSeries.title} ตอนที่ ${ep} ออนไลน์`,
  };
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return `${mins} นาที`;
}

export default async function EpisodePlayerPage({ params }: PageProps) {
  const { id, ep } = await params;
  const episodeNumber = parseInt(ep, 10);

  const currentEpisode = mockEpisodes.find(
    (e) => e.episode_number === episodeNumber
  );
  const prevEpisode = mockEpisodes.find(
    (e) => e.episode_number === episodeNumber - 1
  );
  const nextEpisode = mockEpisodes.find(
    (e) => e.episode_number === episodeNumber + 1
  );

  if (!currentEpisode) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              ไม่พบตอนที่ต้องการ
            </h1>
            <Link
              href={`/series/${id}`}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              กลับไปหน้าซีรีย์
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Check if episode requires payment
  const requiresPayment = !currentEpisode.is_free;

  return (
    <MainLayout>
      <div className="min-h-screen bg-black">
        {/* Video Player Section */}
        <div className="w-full max-w-7xl mx-auto">
          {requiresPayment ? (
            // Locked Episode View
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
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
                <h2 className="text-2xl font-bold text-white mb-2">
                  ตอนนี้ต้องชำระเงิน
                </h2>
                <p className="text-gray-400 mb-6">
                  ปลดล็อคตอนที่ {episodeNumber} เพื่อรับชมต่อ
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                    ซื้อตอนนี้ ฿{currentEpisode.price}
                  </button>
                  <Link
                    href="/auth/login"
                    className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-center"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                  หรือ{" "}
                  <Link
                    href="/subscription"
                    className="text-red-500 hover:text-red-400"
                  >
                    สมัครแพ็คเกจรายเดือน
                  </Link>{" "}
                  เพื่อดูไม่จำกัด
                </p>
              </div>
            </div>
          ) : (
            // Video Player
            <VideoPlayer
              videoUrl={currentEpisode.video_url}
              title={`${mockSeries.title} - ตอนที่ ${episodeNumber}`}
              poster={currentEpisode.thumbnail}
            />
          )}
        </div>

        {/* Episode Info */}
        <div className="bg-background">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href={`/series/${id}`}
                className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
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
                กลับไปหน้าซีรีย์
              </Link>

              <div className="flex gap-2">
                {prevEpisode && (
                  <Link
                    href={`/series/${id}/episode/${prevEpisode.episode_number}`}
                    className="px-4 py-2 bg-surface border border-border hover:bg-muted-light dark:hover:bg-muted-dark rounded-lg text-sm font-medium transition-colors"
                  >
                    ← ตอนก่อนหน้า
                  </Link>
                )}
                {nextEpisode && (
                  <Link
                    href={`/series/${id}/episode/${nextEpisode.episode_number}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      nextEpisode.is_free
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-surface border border-border hover:bg-muted-light dark:hover:bg-muted-dark"
                    }`}
                  >
                    ตอนถัดไป →
                    {!nextEpisode.is_free && (
                      <span className="ml-1 text-xs opacity-75">
                        (฿{nextEpisode.price})
                      </span>
                    )}
                  </Link>
                )}
              </div>
            </div>

            {/* Episode Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href={`/series/${id}`}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  {mockSeries.title}
                </Link>
                <span className="text-muted">•</span>
                <span className="text-muted">{mockSeries.category?.name}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                ตอนที่ {episodeNumber}
                {currentEpisode.title !== `ตอนที่ ${episodeNumber}` && (
                  <span className="font-normal text-muted ml-2">
                    - {currentEpisode.title}
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>{formatDuration(currentEpisode.duration)}</span>
                {currentEpisode.is_free && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
                    ฟรี
                  </span>
                )}
              </div>
              {currentEpisode.description && (
                <p className="text-muted mt-4">{currentEpisode.description}</p>
              )}
            </div>

            {/* Episodes List */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                ตอนทั้งหมด ({mockEpisodes.length} ตอน)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {mockEpisodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/series/${id}/episode/${episode.episode_number}`}
                    className={`relative p-3 rounded-lg text-center transition-colors ${
                      episode.episode_number === episodeNumber
                        ? "bg-red-600 text-white"
                        : "bg-surface border border-border hover:border-red-500"
                    }`}
                  >
                    <span className="font-medium">
                      {episode.episode_number}
                    </span>
                    {!episode.is_free &&
                      episode.episode_number !== episodeNumber && (
                        <svg
                          className="absolute top-1 right-1 w-3 h-3 text-muted"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
