"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { DashboardPresenter } from "./DashboardPresenter";

export class DashboardPresenterClientFactory {
  static create(): DashboardPresenter {
    const supabase = createClientSupabaseClient();
    return new DashboardPresenter(supabase);
  }
}

export function createClientDashboardPresenter(): DashboardPresenter {
  return DashboardPresenterClientFactory.create();
}
