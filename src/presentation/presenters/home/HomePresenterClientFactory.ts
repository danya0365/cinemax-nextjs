"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { HomePresenter } from "./HomePresenter";

export class HomePresenterClientFactory {
  static create(): HomePresenter {
    const supabase = createClientSupabaseClient();
    return new HomePresenter(supabase);
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
