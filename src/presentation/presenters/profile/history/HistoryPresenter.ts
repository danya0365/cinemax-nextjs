import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
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

    return (data || []).map((item: any) => ({
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

export class HistoryPresenterFactory {
  static async createServer(): Promise<HistoryPresenter> {
    const supabase = await createServerSupabaseClient();
    return new HistoryPresenter(supabase);
  }

  static createClient(): HistoryPresenter {
    const supabase = createClientSupabaseClient();
    return new HistoryPresenter(supabase);
  }
}
