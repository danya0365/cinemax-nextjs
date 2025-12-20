"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { AdminSeriesPresenter } from "./AdminSeriesPresenter";

export class AdminSeriesPresenterClientFactory {
  static create(): AdminSeriesPresenter {
    const supabase = createClientSupabaseClient();
    return new AdminSeriesPresenter(supabase);
  }
}

export function createClientAdminSeriesPresenter(): AdminSeriesPresenter {
  return AdminSeriesPresenterClientFactory.create();
}
