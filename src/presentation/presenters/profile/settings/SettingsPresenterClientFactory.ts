"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { SettingsPresenter } from "./SettingsPresenter";

export class SettingsPresenterClientFactory {
  static create(): SettingsPresenter {
    const supabase = createClientSupabaseClient();
    return new SettingsPresenter(supabase);
  }
}

export function createClientSettingsPresenter(): SettingsPresenter {
  return SettingsPresenterClientFactory.create();
}
