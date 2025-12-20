import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { EpisodesPresenter } from "./EpisodesPresenter";

export class EpisodesPresenterServerFactory {
  static async create(): Promise<EpisodesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new EpisodesPresenter(supabase);
  }
}

export async function createServerEpisodesPresenter(): Promise<EpisodesPresenter> {
  return EpisodesPresenterServerFactory.create();
}
