import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export interface Notification {
  id: string;
  user_id: string;
  type: "new_episode" | "recommendation" | "promotion" | "system";
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsViewModel {
  notifications: Notification[];
  unreadCount: number;
}

/**
 * Presenter for Notifications page
 * Follows Clean Architecture with proper separation of concerns
 */
export class NotificationsPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the notifications page
   */
  async getViewModel(userId: string): Promise<NotificationsViewModel> {
    const notifications = await this.getUserNotifications(userId);
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return {
      notifications,
      unreadCount,
    };
  }

  /**
   * Get user's notifications
   */
  async getUserNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }

    return (data as Notification[]) || [];
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
      return false;
    }

    return true;
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) {
      console.error("Error marking all notifications as read:", error);
      return false;
    }

    return true;
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error deleting notification:", error);
      return false;
    }

    return true;
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "การแจ้งเตือน | CINEMAX",
      description: "ดูการแจ้งเตือนของคุณ",
    };
  }
}

/**
 * Factory for creating NotificationsPresenter instances
 */
export class NotificationsPresenterFactory {
  static async createServer(): Promise<NotificationsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new NotificationsPresenter(supabase);
  }

  static createClient(): NotificationsPresenter {
    const supabase = createClientSupabaseClient();
    return new NotificationsPresenter(supabase);
  }
}
