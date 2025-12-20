import type { SupabaseClient } from "@supabase/supabase-js";

export interface FavoriteItem {
  id: string;
  series_id: string;
  title: string;
  total_episodes: number;
  rating: number;
  status: "ongoing" | "completed";
  category: string;
  added_at: string;
}

export interface FavoritesViewModel {
  favorites: FavoriteItem[];
  total: number;
}

type FavoriteRow = {
  id: string;
  created_at: string;
  series?: {
    id?: string;
    title?: string;
    total_episodes?: number;
    rating?: number;
    status?: "ongoing" | "completed";
    category?: {
      name?: string;
    } | null;
  } | null;
};

export class FavoritesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(userId: string): Promise<FavoritesViewModel> {
    const favorites = await this.getFavorites(userId);
    return { favorites, total: favorites.length };
  }

  async getFavorites(userId: string): Promise<FavoriteItem[]> {
    const { data, error } = await this.supabase
      .from("favorites")
      .select(
        `
        id,
        created_at,
        series:series(
          id,
          title,
          total_episodes,
          rating,
          status,
          category:categories(name)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }

    const rows = (data || []) as FavoriteRow[];

    return rows.map((item) => ({
      id: item.id,
      series_id: item.series?.id || "",
      title: item.series?.title || "",
      total_episodes: item.series?.total_episodes || 0,
      rating: item.series?.rating || 0,
      status: item.series?.status || "completed",
      category: item.series?.category?.name || "",
      added_at: item.created_at,
    }));
  }

  async removeFavorite(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("favorites")
      .delete()
      .eq("id", id);
    return !error;
  }

  generateMetadata() {
    return {
      title: "รายการโปรด | CINEMAX",
      description: "ดูรายการซีรีย์โปรดของคุณ",
    };
  }
}
