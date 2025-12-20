import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { CategoriesPresenter } from "./CategoriesPresenter";

export class CategoriesPresenterServerFactory {
  static async create(): Promise<CategoriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new CategoriesPresenter(supabase);
  }
}

export async function createServerCategoriesPresenter(): Promise<CategoriesPresenter> {
  return CategoriesPresenterServerFactory.create();
}
