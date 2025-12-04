import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
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
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  name_en: string | null;
  name_cn: string | null;
  slug: string;
  icon: string | null;
}

export interface HomeViewModel {
  featuredSeries: Series[];
  trendingSeries: Series[];
  latestSeries: Series[];
  categories: Category[];
}

/**
 * Presenter for Home page
 * Follows Clean Architecture with proper separation of concerns
 */
export class HomePresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the home page
   */
  async getViewModel(): Promise<HomeViewModel> {
    const [featuredSeries, trendingSeries, latestSeries, categories] =
      await Promise.all([
        this.getFeaturedSeries(5),
        this.getTrendingSeries(10),
        this.getLatestSeries(12),
        this.getCategories(),
      ]);

    return {
      featuredSeries,
      trendingSeries,
      latestSeries,
      categories,
    };
  }

  /**
   * Get featured series
   */
  async getFeaturedSeries(limit: number = 5): Promise<Series[]> {
    const { data, error } = await this.supabase
      .from("series")
      .select("*, category:categories(id, name, slug)")
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
      .select("*, category:categories(id, name, slug)")
      .order("view_count", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching trending series:", error);
      return [];
    }

    return (data as Series[]) || [];
  }

  /**
   * Get latest series
   */
  async getLatestSeries(limit: number = 12): Promise<Series[]> {
    const { data, error } = await this.supabase
      .from("series")
      .select("*, category:categories(id, name, slug)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching latest series:", error);
      return [];
    }

    return (data as Series[]) || [];
  }

  /**
   * Get categories
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
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "CINEMAX - ดูซีรีย์ออนไลน์ ซีรีย์จีน ซีรีย์เกาหลี ซีรีย์ไทย",
      description:
        "รวมซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น คุณภาพ HD พากย์ไทย ซับไทย ดูฟรีตอนแรก",
    };
  }
}

/**
 * Factory for creating HomePresenter instances
 */
export class HomePresenterFactory {
  static async createServer(): Promise<HomePresenter> {
    const supabase = await createServerSupabaseClient();
    return new HomePresenter(supabase);
  }

  static createClient(): HomePresenter {
    const supabase = createClientSupabaseClient();
    return new HomePresenter(supabase);
  }
}
