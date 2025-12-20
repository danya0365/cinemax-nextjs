import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { SeriesPresenter } from "./SeriesPresenter";

export class SeriesPresenterServerFactory {
  static async create(): Promise<SeriesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new SeriesPresenter(supabase);
  }
}

export async function createServerSeriesPresenter(): Promise<SeriesPresenter> {
  return SeriesPresenterServerFactory.create();
}
