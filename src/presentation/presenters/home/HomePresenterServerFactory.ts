import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { HomePresenter } from "./HomePresenter";

export class HomePresenterServerFactory {
  static async create(): Promise<HomePresenter> {
    const supabase = await createServerSupabaseClient();
    return new HomePresenter(supabase);
  }
}

export async function createServerHomePresenter(): Promise<HomePresenter> {
  return HomePresenterServerFactory.create();
}
