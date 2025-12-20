import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { DashboardPresenter } from "./DashboardPresenter";

export class DashboardPresenterServerFactory {
  static async create(): Promise<DashboardPresenter> {
    const supabase = await createServerSupabaseClient();
    return new DashboardPresenter(supabase);
  }
}

export async function createServerDashboardPresenter(): Promise<DashboardPresenter> {
  return DashboardPresenterServerFactory.create();
}
