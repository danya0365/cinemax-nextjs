import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface DashboardStats {
  totalSeries: number;
  totalEpisodes: number;
  totalUsers: number;
  monthlyRevenue: number;
  seriesChange: number;
  episodesChange: number;
  usersChange: number;
  revenueChange: number;
}

export interface RecentActivity {
  id: string;
  type: "user" | "series" | "episode" | "payment";
  message: string;
  created_at: string;
}

export interface DashboardViewModel {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
}

/**
 * Presenter for Admin Dashboard
 */
export class DashboardPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(): Promise<DashboardViewModel> {
    const [stats, recentActivities] = await Promise.all([
      this.getStats(),
      this.getRecentActivities(),
    ]);

    return { stats, recentActivities };
  }

  async getStats(): Promise<DashboardStats> {
    try {
      const [seriesCount, episodesCount, usersCount, revenueData] =
        await Promise.all([
          this.supabase
            .from("series")
            .select("*", { count: "exact", head: true }),
          this.supabase
            .from("episodes")
            .select("*", { count: "exact", head: true }),
          this.supabase
            .from("profiles")
            .select("*", { count: "exact", head: true }),
          this.getMonthlyRevenue(),
        ]);

      return {
        totalSeries: seriesCount.count || 0,
        totalEpisodes: episodesCount.count || 0,
        totalUsers: usersCount.count || 0,
        monthlyRevenue: revenueData.current,
        seriesChange: 5, // Estimate
        episodesChange: 23, // Estimate
        usersChange: 342, // Estimate
        revenueChange: revenueData.change,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return {
        totalSeries: 0,
        totalEpisodes: 0,
        totalUsers: 0,
        monthlyRevenue: 0,
        seriesChange: 0,
        episodesChange: 0,
        usersChange: 0,
        revenueChange: 0,
      };
    }
  }

  async getMonthlyRevenue(): Promise<{ current: number; change: number }> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [currentMonth, lastMonth] = await Promise.all([
      this.supabase
        .from("purchases")
        .select("amount")
        .eq("status", "completed")
        .gte("created_at", startOfMonth.toISOString()),
      this.supabase
        .from("purchases")
        .select("amount")
        .eq("status", "completed")
        .gte("created_at", startOfLastMonth.toISOString())
        .lte("created_at", endOfLastMonth.toISOString()),
    ]);

    const currentRevenue = (currentMonth.data || []).reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );
    const lastRevenue = (lastMonth.data || []).reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );
    const change =
      lastRevenue > 0
        ? Math.round(((currentRevenue - lastRevenue) / lastRevenue) * 100)
        : 0;

    return { current: currentRevenue, change };
  }

  async getRecentActivities(): Promise<RecentActivity[]> {
    // Get recent activities from various sources
    const activities: RecentActivity[] = [];

    // Get recent users
    const { data: recentUsers } = await this.supabase
      .from("profiles")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    if (recentUsers && recentUsers.length > 0) {
      activities.push({
        id: `user-${recentUsers[0].id}`,
        type: "user",
        message: `มีผู้ใช้สมัครใหม่ ${recentUsers.length} คน`,
        created_at: recentUsers[0].created_at,
      });
    }

    // Get recent series
    const { data: recentSeries } = await this.supabase
      .from("series")
      .select("id, title, created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    if (recentSeries && recentSeries.length > 0) {
      activities.push({
        id: `series-${recentSeries[0].id}`,
        type: "series",
        message: `เพิ่มซีรีย์ใหม่ '${recentSeries[0].title}'`,
        created_at: recentSeries[0].created_at,
      });
    }

    // Get recent episodes
    const { data: recentEpisodes } = await this.supabase
      .from("episodes")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentEpisodes && recentEpisodes.length > 0) {
      activities.push({
        id: `episode-${recentEpisodes[0].id}`,
        type: "episode",
        message: `อัปโหลด ${recentEpisodes.length} ตอนใหม่`,
        created_at: recentEpisodes[0].created_at,
      });
    }

    // Sort by date
    return activities.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  generateMetadata() {
    return {
      title: "แดชบอร์ด | CINEMAX Admin",
      description: "ภาพรวมระบบและสถิติทั้งหมด",
    };
  }
}

export class DashboardPresenterFactory {
  static async createServer(): Promise<DashboardPresenter> {
    const supabase = await createServerSupabaseClient();
    return new DashboardPresenter(supabase);
  }

  static createClient(): DashboardPresenter {
    const supabase = createClientSupabaseClient();
    return new DashboardPresenter(supabase);
  }
}
