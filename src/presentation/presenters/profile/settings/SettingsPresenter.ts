import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Types
export type Language = "th" | "en" | "zh";
export type Quality = "auto" | "1080p" | "720p" | "480p";

export interface UserSettings {
  id: string;
  user_id: string;
  language: Language;
  default_quality: Quality;
  auto_play: boolean;
  notifications_new_episodes: boolean;
  notifications_recommendations: boolean;
  notifications_promotions: boolean;
  created_at: string;
  updated_at: string;
}

export interface SettingsViewModel {
  settings: UserSettings;
}

const defaultSettings: Omit<
  UserSettings,
  "id" | "user_id" | "created_at" | "updated_at"
> = {
  language: "th",
  default_quality: "auto",
  auto_play: true,
  notifications_new_episodes: true,
  notifications_recommendations: true,
  notifications_promotions: false,
};

/**
 * Presenter for Settings page
 * Follows Clean Architecture with proper separation of concerns
 */
export class SettingsPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get view model for the settings page
   */
  async getViewModel(userId: string): Promise<SettingsViewModel> {
    const settings = await this.getUserSettings(userId);

    return {
      settings,
    };
  }

  /**
   * Get user's settings
   */
  async getUserSettings(userId: string): Promise<UserSettings> {
    const { data, error } = await this.supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      // Return default settings if not found
      return {
        id: "",
        user_id: userId,
        ...defaultSettings,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    return data as UserSettings;
  }

  /**
   * Update user settings
   */
  async updateSettings(
    userId: string,
    settings: Partial<
      Omit<UserSettings, "id" | "user_id" | "created_at" | "updated_at">
    >
  ): Promise<boolean> {
    // Check if settings exist
    const { data: existing } = await this.supabase
      .from("user_settings")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existing) {
      // Update
      const { error } = await this.supabase
        .from("user_settings")
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating settings:", error);
        return false;
      }
    } else {
      // Insert
      const { error } = await this.supabase.from("user_settings").insert({
        user_id: userId,
        ...defaultSettings,
        ...settings,
      });

      if (error) {
        console.error("Error creating settings:", error);
        return false;
      }
    }

    return true;
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "ตั้งค่า | CINEMAX",
      description: "จัดการการตั้งค่าบัญชีของคุณ",
    };
  }
}

/**
 * Factory for creating SettingsPresenter instances
 */
export class SettingsPresenterFactory {
  static async createServer(): Promise<SettingsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new SettingsPresenter(supabase);
  }

  static createClient(): SettingsPresenter {
    const supabase = createClientSupabaseClient();
    return new SettingsPresenter(supabase);
  }
}
