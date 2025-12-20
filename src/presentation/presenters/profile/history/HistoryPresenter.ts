import type { SupabaseClient } from "@supabase/supabase-js";

export interface WatchHistoryItem {
  id: string;
  series_id: string;
  episode_id: string;
  series_title: string;
  episode_number: number;
  total_episodes: number;
  progress: number;
  watched_at: string;
}

export interface HistoryViewModel {
  history: WatchHistoryItem[];
  total: number;
}

type WatchHistoryRow = {
  id: string;
  progress: number;
  updated_at: string;
  episode?: {
    id?: string;
    episode_number?: number;
    series?: {
      id?: string;
      title?: string;
      total_episodes?: number;
    } | null;
  } | null;
};

export class HistoryPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(userId: string): Promise<HistoryViewModel> {
    const history = await this.getWatchHistory(userId);
    return { history, total: history.length };
  }

  async getWatchHistory(userId: string): Promise<WatchHistoryItem[]> {
    const { data, error } = await this.supabase
      .from("watch_history")
      .select(
        `
        id,
        progress,
        updated_at,
        episode:episodes(
          id,
          episode_number,
          series:series(id, title, total_episodes)
        )
      `
      )
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching watch history:", error);
      return [];
    }

    const rows = (data || []) as WatchHistoryRow[];

    return rows.map((item) => ({
      id: item.id,
      series_id: item.episode?.series?.id || "",
      episode_id: item.episode?.id || "",
      series_title: item.episode?.series?.title || "",
      episode_number: item.episode?.episode_number || 1,
      total_episodes: item.episode?.series?.total_episodes || 1,
      progress: item.progress || 0,
      watched_at: item.updated_at,
    }));
  }

  async deleteHistoryItem(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("watch_history")
      .delete()
      .eq("id", id);
    return !error;
  }

  generateMetadata() {
    return {
      title: "ประวัติการรับชม | CINEMAX",
      description: "ดูประวัติการรับชมของคุณ",
    };
  }
}
