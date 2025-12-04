import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface Category {
  id: string;
  name: string;
  name_en: string | null;
  name_cn: string | null;
  slug: string;
  description: string | null;
  icon: string | null;
  series_count?: number;
}

export interface CategoriesViewModel {
  categories: Category[];
  totalCount: number;
}

/**
 * Presenter for Categories
 * Follows Clean Architecture with proper separation of concerns
 */
export class CategoriesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the categories page
   */
  async getViewModel(): Promise<CategoriesViewModel> {
    const categories = await this.getCategories();

    return {
      categories,
      totalCount: categories.length,
    };
  }

  /**
   * Get all categories with series count
   */
  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select(
        `
        *,
        series:series(count)
      `
      )
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    // Transform data to include series_count
    return (data || []).map((cat: any) => ({
      ...cat,
      series_count: cat.series?.[0]?.count || 0,
    }));
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      return null;
    }

    return data as Category;
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "หมวดหมู่ซีรีย์ | CINEMAX",
      description:
        "เลือกดูซีรีย์ตามหมวดหมู่ที่คุณชื่นชอบ โรแมนติก แอ็คชั่น ดราม่า ตลก และอื่นๆ",
    };
  }
}

/**
 * Factory for creating CategoriesPresenter instances
 */
export class CategoriesPresenterFactory {
  static async createServer(): Promise<CategoriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new CategoriesPresenter(supabase);
  }

  static createClient(): CategoriesPresenter {
    const supabase = createClientSupabaseClient();
    return new CategoriesPresenter(supabase);
  }
}
