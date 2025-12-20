import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { HistoryPresenter } from "./HistoryPresenter";

export class HistoryPresenterServerFactory {
  static async create(): Promise<HistoryPresenter> {
    const supabase = await createServerSupabaseClient();
    return new HistoryPresenter(supabase);
  }
}

export async function createServerHistoryPresenter(): Promise<HistoryPresenter> {
  return HistoryPresenterServerFactory.create();
}
