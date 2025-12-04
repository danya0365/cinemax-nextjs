export interface Series {
  id: string;
  title: string;
  title_en?: string;
  title_cn?: string;
  description: string;
  description_en?: string;
  description_cn?: string;
  thumbnail: string;
  poster?: string;
  category_id: string;
  category?: Category;
  total_episodes: number;
  release_date: string;
  status: "ongoing" | "completed" | "upcoming";
  view_count: number;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: string;
  series_id: string;
  episode_number: number;
  title: string;
  title_en?: string;
  title_cn?: string;
  description?: string;
  video_url: string;
  duration: number; // in seconds
  thumbnail?: string;
  is_free: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_en?: string;
  name_cn?: string;
  slug: string;
  description?: string;
  icon?: string;
  series_count?: number;
}

export interface SeriesWithEpisodes extends Series {
  episodes: Episode[];
}

// Filter & Sort Types
export type SortOption = "newest" | "oldest" | "popular" | "rating";

export interface SeriesFilter {
  category?: string;
  status?: Series["status"];
  search?: string;
  sort?: SortOption;
}
