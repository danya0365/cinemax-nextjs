import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { FavoritesPresenter } from "./FavoritesPresenter";

export class FavoritesPresenterServerFactory {
  static async create(): Promise<FavoritesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new FavoritesPresenter(supabase);
  }
}

export async function createServerFavoritesPresenter(): Promise<FavoritesPresenter> {
  return FavoritesPresenterServerFactory.create();
}
