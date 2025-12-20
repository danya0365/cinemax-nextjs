"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { AdminCategoriesPresenter } from "./AdminCategoriesPresenter";

export class AdminCategoriesPresenterClientFactory {
  static create(): AdminCategoriesPresenter {
    const supabase = createClientSupabaseClient();
    return new AdminCategoriesPresenter(supabase);
  }
}

export function createClientAdminCategoriesPresenter(): AdminCategoriesPresenter {
  return AdminCategoriesPresenterClientFactory.create();
}
