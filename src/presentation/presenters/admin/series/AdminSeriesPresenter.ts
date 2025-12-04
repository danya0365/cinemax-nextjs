import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface AdminSeriesItem {
  id: string;
  title: string;
  category_id: string;
  category?: { name: string };
  status: "published" | "draft" | "scheduled";
  view_count: number;
  created_at: string;
  episodes_count?: number;
}

export interface AdminSeriesViewModel {
  series: AdminSeriesItem[];
  total: number;
}

/**
 * Presenter for Admin Series page
 */
export class AdminSeriesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(
    page: number = 1,
    limit: number = 20,
    search?: string,
    status?: string
  ): Promise<AdminSeriesViewModel> {
    let query = this.supabase
      .from("series")
      .select(`*, category:categories(name)`, { count: "exact" });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error("Error fetching admin series:", error);
      return { series: [], total: 0 };
    }

    // Get episode counts
    const seriesWithCounts = await Promise.all(
      (data || []).map(async (s) => {
        const { count: episodesCount } = await this.supabase
          .from("episodes")
          .select("*", { count: "exact", head: true })
          .eq("series_id", s.id);

        return { ...s, episodes_count: episodesCount || 0 };
      })
    );

    return {
      series: seriesWithCounts as AdminSeriesItem[],
      total: count || 0,
    };
  }

  async deleteSeries(id: string): Promise<boolean> {
    const { error } = await this.supabase.from("series").delete().eq("id", id);
    return !error;
  }

  generateMetadata() {
    return {
      title: "จัดการซีรีย์ | CINEMAX Admin",
      description: "จัดการซีรีย์ทั้งหมดในระบบ",
    };
  }
}

export class AdminSeriesPresenterFactory {
  static async createServer(): Promise<AdminSeriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new AdminSeriesPresenter(supabase);
  }

  static createClient(): AdminSeriesPresenter {
    const supabase = createClientSupabaseClient();
    return new AdminSeriesPresenter(supabase);
  }
}
