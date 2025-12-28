// Mock Episodes Data
export interface MockEpisode {
  id: string;
  series_id: string;
  episode_number: number;
  title: string;
  title_en: string | null;
  description: string;
  video_url: string | null;
  duration: number; // in seconds
  thumbnail: string | null;
  is_free: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}

// Generate episodes for each series
function generateEpisodes(
  seriesId: string,
  totalEpisodes: number,
  isFreeFirst: boolean = true
): MockEpisode[] {
  const episodes: MockEpisode[] = [];

  for (let i = 1; i <= totalEpisodes; i++) {
    episodes.push({
      id: `${seriesId}-ep-${String(i).padStart(3, "0")}`,
      series_id: seriesId,
      episode_number: i,
      title: `ตอนที่ ${i}`,
      title_en: `Episode ${i}`,
      description: `เนื้อหาตอนที่ ${i} - ติดตามเรื่องราวที่น่าตื่นเต้น`,
      video_url: `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`,
      duration: 600 + Math.floor(Math.random() * 600), // 10-20 minutes
      thumbnail: `https://picsum.photos/seed/${seriesId}-ep${i}/400/225`,
      is_free: isFreeFirst && i === 1,
      price: isFreeFirst && i === 1 ? 0 : 15 + Math.floor(Math.random() * 10),
      created_at: new Date(
        Date.now() - (totalEpisodes - i) * 24 * 60 * 60 * 1000
      ).toISOString(),
      updated_at: new Date(
        Date.now() - (totalEpisodes - i) * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  return episodes;
}

// Generate episodes for all series
export const mockEpisodes: MockEpisode[] = [
  ...generateEpisodes("series-001", 24),
  ...generateEpisodes("series-002", 30),
  ...generateEpisodes("series-003", 40),
  ...generateEpisodes("series-004", 20),
  ...generateEpisodes("series-005", 16),
  ...generateEpisodes("series-006", 50),
  ...generateEpisodes("series-007", 60),
  ...generateEpisodes("series-008", 12),
  ...generateEpisodes("series-009", 26),
  ...generateEpisodes("series-010", 35),
  ...generateEpisodes("series-011", 28),
  ...generateEpisodes("series-012", 18),
];

// Helper function to get episodes by series
export function getEpisodesBySeriesId(seriesId: string): MockEpisode[] {
  return mockEpisodes.filter((ep) => ep.series_id === seriesId);
}
