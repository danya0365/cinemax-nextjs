import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { SettingsPresenter } from "./SettingsPresenter";

export class SettingsPresenterServerFactory {
  static async create(): Promise<SettingsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new SettingsPresenter(supabase);
  }
}

export async function createServerSettingsPresenter(): Promise<SettingsPresenter> {
  return SettingsPresenterServerFactory.create();
}
