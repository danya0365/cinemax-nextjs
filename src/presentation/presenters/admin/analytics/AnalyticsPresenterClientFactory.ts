"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { AnalyticsPresenter } from "./AnalyticsPresenter";

export class AnalyticsPresenterClientFactory {
  static create(): AnalyticsPresenter {
    const supabase = createClientSupabaseClient();
    return new AnalyticsPresenter(supabase);
  }
}

export function createClientAnalyticsPresenter(): AnalyticsPresenter {
  return AnalyticsPresenterClientFactory.create();
}
