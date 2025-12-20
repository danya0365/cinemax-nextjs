import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface RevenueData {
  month: string;
  revenue: number;
  users: number;
}

export interface TopSeries {
  id: string;
  title: string;
  views: number;
  revenue: number;
  growth: number;
}

export interface UserStats {
  total: number;
  active: number;
  premium: number;
  newThisMonth: number;
}

export interface QuickStats {
  totalSeries: number;
  totalEpisodes: number;
  averageRating: number;
  retentionRate: number;
}

export interface AnalyticsViewModel {
  revenueData: RevenueData[];
  topSeries: TopSeries[];
  userStats: UserStats;
  quickStats: QuickStats;
  totalRevenue: number;
  totalViews: number;
}

/**
 * Presenter for Analytics page
 * Follows Clean Architecture with proper separation of concerns
 */
export class AnalyticsPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the analytics page
   */
  async getViewModel(): Promise<AnalyticsViewModel> {
    const [userStats, quickStats, topSeries, revenueData] = await Promise.all([
      this.getUserStats(),
      this.getQuickStats(),
      this.getTopSeries(),
      this.getRevenueData(),
    ]);

    // Calculate totals
    const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
    const totalViews = topSeries.reduce((sum, s) => sum + s.views, 0);

    return {
      revenueData,
      topSeries,
      userStats,
      quickStats,
      totalRevenue,
      totalViews,
    };
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<UserStats> {
    try {
      // Get total users
      const { count: total } = await this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get premium users (users with active subscriptions)
      const { count: premium } = await this.supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Get users created this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: newThisMonth } = await this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString());

      return {
        total: total || 0,
        active: Math.floor((total || 0) * 0.6), // Estimate active users
        premium: premium || 0,
        newThisMonth: newThisMonth || 0,
      };
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return { total: 0, active: 0, premium: 0, newThisMonth: 0 };
    }
  }

  /**
   * Get quick statistics
   */
  async getQuickStats(): Promise<QuickStats> {
    try {
      const [seriesCount, episodesCount, ratingsData] = await Promise.all([
        this.supabase
          .from("series")
          .select("*", { count: "exact", head: true }),
        this.supabase
          .from("episodes")
          .select("*", { count: "exact", head: true }),
        this.supabase.from("series").select("rating"),
      ]);

      const ratings = ratingsData.data || [];
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, s) => sum + (s.rating || 0), 0) /
            ratings.length
          : 0;

      return {
        totalSeries: seriesCount.count || 0,
        totalEpisodes: episodesCount.count || 0,
        averageRating: Number(avgRating.toFixed(1)),
        retentionRate: 85, // This would come from analytics service
      };
    } catch (error) {
      console.error("Error fetching quick stats:", error);
      return {
        totalSeries: 0,
        totalEpisodes: 0,
        averageRating: 0,
        retentionRate: 0,
      };
    }
  }

  /**
   * Get top performing series
   */
  async getTopSeries(): Promise<TopSeries[]> {
    try {
      const { data, error } = await this.supabase
        .from("series")
        .select("id, title, view_count")
        .order("view_count", { ascending: false })
        .limit(5);

      if (error) throw error;

      // Calculate estimated revenue and growth for each series
      return (data || []).map((series) => ({
        id: series.id,
        title: series.title,
        views: series.view_count || 0,
        revenue: Math.floor((series.view_count || 0) * 0.35), // Estimate ฿0.35 per view
        growth: Math.floor(Math.random() * 20) - 5, // Random growth for demo
      }));
    } catch (error) {
      console.error("Error fetching top series:", error);
      return [];
    }
  }

  /**
   * Get revenue data by month
   */
  async getRevenueData(): Promise<RevenueData[]> {
    try {
      // Get purchases grouped by month
      const { data: purchases } = await this.supabase
        .from("purchases")
        .select("amount, created_at")
        .eq("status", "completed")
        .order("created_at", { ascending: true });

      // Group by month
      const monthlyData: Record<
        string,
        { revenue: number; users: Set<string> }
      > = {};
      const thaiMonths = [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ];

      (purchases || []).forEach((p) => {
        const date = new Date(p.created_at);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { revenue: 0, users: new Set() };
        }

        monthlyData[monthKey].revenue += p.amount;
      });

      // Convert to array format
      const result: RevenueData[] = [];
      const now = new Date();

      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        const data = monthlyData[monthKey] || { revenue: 0, users: new Set() };

        result.push({
          month: thaiMonths[date.getMonth()],
          revenue: data.revenue,
          users: data.users.size || Math.floor(Math.random() * 500) + 300, // Fallback for demo
        });
      }

      return result;
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      return [];
    }
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "Analytics | CINEMAX Admin",
      description: "ภาพรวมสถิติและประสิทธิภาพ",
    };
  }
}
