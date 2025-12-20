import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface Episode {
  id: string;
  series_id: string;
  episode_number: number;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: number;
  thumbnail: string | null;
  is_free: boolean;
  price: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  series?: {
    id: string;
    title: string;
  };
}

export interface EpisodeStats {
  totalEpisodes: number;
  freeEpisodes: number;
  paidEpisodes: number;
  totalViews: number;
}

export interface CreateEpisodeData {
  series_id: string;
  episode_number: number;
  title: string;
  description?: string;
  video_url?: string;
  duration?: number;
  thumbnail?: string;
  is_free: boolean;
  price: number;
}

export interface UpdateEpisodeData {
  id: string;
  title?: string;
  description?: string;
  video_url?: string;
  duration?: number;
  thumbnail?: string;
  is_free?: boolean;
  price?: number;
}

export interface EpisodeFilters {
  series_id?: string;
  search?: string;
  is_free?: boolean;
}

export interface EpisodesViewModel {
  episodes: Episode[];
  stats: EpisodeStats;
  series: { id: string; title: string }[];
  totalCount: number;
  page: number;
  perPage: number;
  filters: EpisodeFilters;
}

/**
 * Presenter for Admin Episodes management
 * Follows Clean Architecture with proper separation of concerns
 */
export class EpisodesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the episodes admin page
   */
  async getViewModel(
    page: number = 1,
    perPage: number = 20,
    filters: EpisodeFilters = {}
  ): Promise<EpisodesViewModel> {
    const [episodesResult, stats, series] = await Promise.all([
      this.getPaginatedEpisodes(page, perPage, filters),
      this.getStats(),
      this.getAllSeries(),
    ]);

    return {
      episodes: episodesResult.data,
      stats,
      series,
      totalCount: episodesResult.total,
      page,
      perPage,
      filters,
    };
  }

  /**
   * Get paginated episodes with filters
   */
  async getPaginatedEpisodes(
    page: number,
    perPage: number,
    filters: EpisodeFilters
  ): Promise<{ data: Episode[]; total: number }> {
    let query = this.supabase
      .from("episodes")
      .select("*, series:series(id, title)", { count: "exact" });

    // Apply filters
    if (filters.series_id) {
      query = query.eq("series_id", filters.series_id);
    }

    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    if (filters.is_free !== undefined) {
      query = query.eq("is_free", filters.is_free);
    }

    // Order and pagination
    query = query.order("created_at", { ascending: false });
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }

    return {
      data: (data as Episode[]) || [],
      total: count || 0,
    };
  }

  /**
   * Get episode by ID
   */
  async getEpisodeById(id: string): Promise<Episode | null> {
    const { data, error } = await this.supabase
      .from("episodes")
      .select("*, series:series(id, title)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching episode:", error);
      return null;
    }

    return data as Episode;
  }

  /**
   * Create a new episode
   */
  async createEpisode(data: CreateEpisodeData): Promise<Episode> {
    const { data: episode, error } = await this.supabase
      .from("episodes")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error creating episode:", error);
      throw error;
    }

    return episode as Episode;
  }

  /**
   * Update an existing episode
   */
  async updateEpisode(id: string, data: UpdateEpisodeData): Promise<Episode> {
    const { data: episode, error } = await this.supabase
      .from("episodes")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating episode:", error);
      throw error;
    }

    return episode as Episode;
  }

  /**
   * Delete an episode
   */
  async deleteEpisode(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("episodes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting episode:", error);
      throw error;
    }

    return true;
  }

  /**
   * Get episode stats
   */
  async getStats(): Promise<EpisodeStats> {
    const { data, error } = await this.supabase
      .from("episodes")
      .select("id, is_free, view_count");

    if (error) {
      console.error("Error fetching stats:", error);
      return {
        totalEpisodes: 0,
        freeEpisodes: 0,
        paidEpisodes: 0,
        totalViews: 0,
      };
    }

    const episodes = data || [];
    return {
      totalEpisodes: episodes.length,
      freeEpisodes: episodes.filter((e) => e.is_free).length,
      paidEpisodes: episodes.filter((e) => !e.is_free).length,
      totalViews: episodes.reduce((sum, e) => sum + (e.view_count || 0), 0),
    };
  }

  /**
   * Get all series for dropdown
   */
  async getAllSeries(): Promise<{ id: string; title: string }[]> {
    const { data, error } = await this.supabase
      .from("series")
      .select("id, title")
      .order("title", { ascending: true });

    if (error) {
      console.error("Error fetching series:", error);
      return [];
    }

    return (data as { id: string; title: string }[]) || [];
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "จัดการตอน | CINEMAX Admin",
      description: "ระบบจัดการตอนของซีรีย์",
    };
  }
}
