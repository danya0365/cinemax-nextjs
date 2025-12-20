import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { AdminCategoriesPresenter } from "./AdminCategoriesPresenter";

export class AdminCategoriesPresenterServerFactory {
  static async create(): Promise<AdminCategoriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new AdminCategoriesPresenter(supabase);
  }
}

export async function createServerAdminCategoriesPresenter(): Promise<AdminCategoriesPresenter> {
  return AdminCategoriesPresenterServerFactory.create();
}
