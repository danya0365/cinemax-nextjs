"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { CategoriesPresenter } from "./CategoriesPresenter";

export class CategoriesPresenterClientFactory {
  static create(): CategoriesPresenter {
    const supabase = createClientSupabaseClient();
    return new CategoriesPresenter(supabase);
  }
}

export function createClientCategoriesPresenter(): CategoriesPresenter {
  return CategoriesPresenterClientFactory.create();
}
