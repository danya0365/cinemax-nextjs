import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface Purchase {
  id: string;
  user_id: string;
  episode_id: string;
  amount: number;
  payment_method: string;
  status: "completed" | "pending" | "failed";
  created_at: string;
  episode?: {
    id: string;
    title: string;
    episode_number: number;
    thumbnail: string | null;
    series?: {
      id: string;
      title: string;
    };
  };
}

export interface PurchaseStats {
  totalPurchases: number;
  completedPurchases: number;
  totalSpent: number;
  uniqueSeries: number;
}

export interface PurchasesViewModel {
  purchases: Purchase[];
  stats: PurchaseStats;
}

/**
 * Presenter for Purchases page
 * Follows Clean Architecture with proper separation of concerns
 */
export class PurchasesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the purchases page
   */
  async getViewModel(userId: string): Promise<PurchasesViewModel> {
    const purchases = await this.getUserPurchases(userId);
    const stats = this.calculateStats(purchases);

    return {
      purchases,
      stats,
    };
  }

  /**
   * Get user's purchase history
   */
  async getUserPurchases(userId: string): Promise<Purchase[]> {
    const { data, error } = await this.supabase
      .from("purchases")
      .select(
        `
        *,
        episode:episodes(
          id,
          title,
          episode_number,
          thumbnail,
          series:series(id, title)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching purchases:", error);
      return [];
    }

    return (data as Purchase[]) || [];
  }

  /**
   * Calculate purchase stats
   */
  calculateStats(purchases: Purchase[]): PurchaseStats {
    const completedPurchases = purchases.filter(
      (p) => p.status === "completed"
    );
    const seriesIds = new Set(
      completedPurchases.map((p) => p.episode?.series?.id).filter(Boolean)
    );

    return {
      totalPurchases: purchases.length,
      completedPurchases: completedPurchases.length,
      totalSpent: completedPurchases.reduce((sum, p) => sum + p.amount, 0),
      uniqueSeries: seriesIds.size,
    };
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "ประวัติการซื้อ | CINEMAX",
      description: "ดูประวัติการซื้อตอนของคุณ",
    };
  }
}

