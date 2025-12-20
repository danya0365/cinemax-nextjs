import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface Series {
  id: string;
  title: string;
  title_en: string | null;
  title_cn: string | null;
  description: string;
  thumbnail: string | null;
  poster: string | null;
  category_id: string | null;
  total_episodes: number;
  release_date: string | null;
  status: "ongoing" | "completed" | "upcoming";
  view_count: number;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  name_en: string | null;
  name_cn: string | null;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface SeriesStats {
  totalSeries: number;
  ongoingSeries: number;
  completedSeries: number;
  featuredSeries: number;
}

export interface SeriesFilters {
  category?: string;
  status?: string;
  search?: string;
  sort?: "latest" | "popular" | "rating";
}

export interface SeriesViewModel {
  series: Series[];
  categories: Category[];
  stats: SeriesStats;
  totalCount: number;
  page: number;
  perPage: number;
  filters: SeriesFilters;
}

/**
 * Presenter for Series catalog
 * Follows Clean Architecture with proper separation of concerns
 */
export class SeriesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the series catalog page
   */
  async getViewModel(
    page: number = 1,
    perPage: number = 12,
    filters: SeriesFilters = {}
  ): Promise<SeriesViewModel> {
    const [seriesResult, categories, stats] = await Promise.all([
      this.getPaginatedSeries(page, perPage, filters),
      this.getCategories(),
      this.getStats(),
    ]);

    return {
      series: seriesResult.data,
      categories,
      stats,
      totalCount: seriesResult.total,
      page,
      perPage,
      filters,
    };
  }

  /**
   * Get paginated series with filters
   */
  async getPaginatedSeries(
    page: number,
    perPage: number,
    filters: SeriesFilters
  ): Promise<{ data: Series[]; total: number }> {
    let query = this.supabase
      .from("series")
      .select("*, category:categories(*)", { count: "exact" });

    // Apply filters
    if (filters.category && filters.category !== "all") {
      query = query.eq("category_id", filters.category);
    }

    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,title_en.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    // Apply sorting
    switch (filters.sort) {
      case "popular":
        query = query.order("view_count", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      case "latest":
      default:
        query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching series:", error);
      throw error;
    }

    return {
      data: (data as Series[]) || [],
      total: count || 0,
    };
  }

  /**
   * Get single series by ID
   */
  async getSeriesById(id: string): Promise<Series | null> {
    const { data, error } = await this.supabase
      .from("series")
      .select("*, category:categories(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching series:", error);
      return null;
    }

    return data as Series;
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return (data as Category[]) || [];
  }

  /**
   * Get series stats
   */
  async getStats(): Promise<SeriesStats> {
    const { data, error } = await this.supabase
      .from("series")
      .select("id, status, is_featured");

    if (error) {
      console.error("Error fetching stats:", error);
      return {
        totalSeries: 0,
        ongoingSeries: 0,
        completedSeries: 0,
        featuredSeries: 0,
      };
    }

    const series = data || [];
    return {
      totalSeries: series.length,
      ongoingSeries: series.filter((s) => s.status === "ongoing").length,
      completedSeries: series.filter((s) => s.status === "completed").length,
      featuredSeries: series.filter((s) => s.is_featured).length,
    };
  }

  /**
   * Get featured series
   */
  async getFeaturedSeries(limit: number = 5): Promise<Series[]> {
    const { data, error } = await this.supabase
      .from("series")
      .select("*, category:categories(*)")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured series:", error);
      return [];
    }

    return (data as Series[]) || [];
  }

  /**
   * Get trending series (by view count)
   */
  async getTrendingSeries(limit: number = 10): Promise<Series[]> {
    const { data, error } = await this.supabase
      .from("series")
      .select("*, category:categories(*)")
      .order("view_count", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching trending series:", error);
      return [];
    }

    return (data as Series[]) || [];
  }

  /**
   * Get series by category
   */
  async getSeriesByCategory(
    categorySlug: string,
    limit?: number
  ): Promise<Series[]> {
    let query = this.supabase
      .from("series")
      .select("*, category:categories!inner(*)")
      .eq("category.slug", categorySlug)
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching series by category:", error);
      return [];
    }

    return (data as Series[]) || [];
  }

  /**
   * Increment view count
   */
  async incrementViewCount(seriesId: string): Promise<void> {
    const { error } = await this.supabase.rpc("increment_series_view_count", {
      series_id: seriesId,
    });

    if (error) {
      console.error("Error incrementing view count:", error);
    }
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "ซีรีย์ทั้งหมด | CINEMAX",
      description:
        "รวมซีรีย์จีน ซีรีย์เกาหลี ซีรีย์ไทย คุณภาพ HD พากย์ไทย ซับไทย ดูฟรีตอนแรก",
    };
  }
}
