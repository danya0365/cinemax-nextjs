import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface Payment {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  episode_title: string;
  series_title: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  created_at: string;
}

export interface PaymentsStats {
  totalRevenue: number;
  todayRevenue: number;
  completedCount: number;
  pendingCount: number;
}

export interface PaymentsViewModel {
  payments: Payment[];
  stats: PaymentsStats;
  total: number;
}

export class PaymentsPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(
    status?: string,
    dateRange?: string
  ): Promise<PaymentsViewModel> {
    const [payments, stats] = await Promise.all([
      this.getPayments(status, dateRange),
      this.getStats(),
    ]);

    return { payments, stats, total: payments.length };
  }

  async getPayments(status?: string, dateRange?: string): Promise<Payment[]> {
    let query = this.supabase
      .from("purchases")
      .select(
        `
        id,
        amount,
        payment_method,
        status,
        created_at,
        user:profiles(id, email, username),
        episode:episodes(title, series:series(title))
      `
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (dateRange) {
      const now = new Date();
      let startDate: Date;

      switch (dateRange) {
        case "today":
          startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "7days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30days":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0);
      }

      query = query.gte("created_at", startDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching payments:", error);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      user_id: item.user?.id || "",
      user_name: item.user?.username || "Unknown",
      user_email: item.user?.email || "",
      episode_title: item.episode?.title || "",
      series_title: item.episode?.series?.title || "",
      amount: item.amount || 0,
      method: item.payment_method || "",
      status: item.status || "pending",
      created_at: item.created_at,
    }));
  }

  async getStats(): Promise<PaymentsStats> {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const [allCompleted, todayCompleted, pending] = await Promise.all([
      this.supabase
        .from("purchases")
        .select("amount")
        .eq("status", "completed"),
      this.supabase
        .from("purchases")
        .select("amount")
        .eq("status", "completed")
        .gte("created_at", startOfToday.toISOString()),
      this.supabase
        .from("purchases")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
    ]);

    return {
      totalRevenue: (allCompleted.data || []).reduce(
        (sum, p) => sum + (p.amount || 0),
        0
      ),
      todayRevenue: (todayCompleted.data || []).reduce(
        (sum, p) => sum + (p.amount || 0),
        0
      ),
      completedCount: allCompleted.data?.length || 0,
      pendingCount: pending.count || 0,
    };
  }

  async refundPayment(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("purchases")
      .update({ status: "refunded" })
      .eq("id", id);
    return !error;
  }

  generateMetadata() {
    return {
      title: "การชำระเงิน | CINEMAX Admin",
      description: "ดูรายงานและจัดการการชำระเงิน",
    };
  }
}

export class PaymentsPresenterFactory {
  static async createServer(): Promise<PaymentsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new PaymentsPresenter(supabase);
  }

  static createClient(): PaymentsPresenter {
    const supabase = createClientSupabaseClient();
    return new PaymentsPresenter(supabase);
  }
}
