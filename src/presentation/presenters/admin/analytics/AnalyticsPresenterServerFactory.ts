import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { AnalyticsPresenter } from "./AnalyticsPresenter";

export class AnalyticsPresenterServerFactory {
  static async create(): Promise<AnalyticsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new AnalyticsPresenter(supabase);
  }
}

export async function createServerAnalyticsPresenter(): Promise<AnalyticsPresenter> {
  return AnalyticsPresenterServerFactory.create();
}
