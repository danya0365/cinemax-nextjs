import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { AdminSeriesPresenter } from "./AdminSeriesPresenter";

export class AdminSeriesPresenterServerFactory {
  static async create(): Promise<AdminSeriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new AdminSeriesPresenter(supabase);
  }
}

export async function createServerAdminSeriesPresenter(): Promise<AdminSeriesPresenter> {
  return AdminSeriesPresenterServerFactory.create();
}
