import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: "user" | "premium" | "admin";
  status: "active" | "suspended";
  purchases_count: number;
  created_at: string;
}

export interface UsersStats {
  total: number;
  premium: number;
  active: number;
  suspended: number;
}

export interface UsersViewModel {
  users: AdminUser[];
  stats: UsersStats;
  total: number;
}

/**
 * Presenter for Admin Users page
 */
export class UsersPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(
    page: number = 1,
    limit: number = 20,
    search?: string,
    role?: string
  ): Promise<UsersViewModel> {
    const [users, stats] = await Promise.all([
      this.getUsers(page, limit, search, role),
      this.getStats(),
    ]);

    return { ...users, stats };
  }

  async getUsers(
    page: number,
    limit: number,
    search?: string,
    role?: string
  ): Promise<{ users: AdminUser[]; total: number }> {
    let query = this.supabase.from("profiles").select("*", { count: "exact" });

    if (search) {
      query = query.or(`email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error("Error fetching users:", error);
      return { users: [], total: 0 };
    }

    // Get purchase counts
    const usersWithCounts = await Promise.all(
      (data || []).map(async (u) => {
        const { count: purchasesCount } = await this.supabase
          .from("purchases")
          .select("*", { count: "exact", head: true })
          .eq("user_id", u.id)
          .eq("status", "completed");

        return {
          id: u.id,
          email: u.email || "",
          username: u.username || u.email?.split("@")[0] || "User",
          role: u.role || "user",
          status: u.status || "active",
          purchases_count: purchasesCount || 0,
          created_at: u.created_at,
        };
      })
    );

    return { users: usersWithCounts as AdminUser[], total: count || 0 };
  }

  async getStats(): Promise<UsersStats> {
    const [total, premium, active, suspended] = await Promise.all([
      this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true }),
      this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "premium"),
      this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),
      this.supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("status", "suspended"),
    ]);

    return {
      total: total.count || 0,
      premium: premium.count || 0,
      active: active.count || 0,
      suspended: suspended.count || 0,
    };
  }

  async updateUserStatus(
    userId: string,
    status: "active" | "suspended"
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from("profiles")
      .update({ status })
      .eq("id", userId);
    return !error;
  }

  generateMetadata() {
    return {
      title: "จัดการผู้ใช้ | CINEMAX Admin",
      description: "ดูและจัดการผู้ใช้ทั้งหมดในระบบ",
    };
  }
}
