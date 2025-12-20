"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { FavoritesPresenter } from "./FavoritesPresenter";

export class FavoritesPresenterClientFactory {
  static create(): FavoritesPresenter {
    const supabase = createClientSupabaseClient();
    return new FavoritesPresenter(supabase);
  }
}

export function createClientFavoritesPresenter(): FavoritesPresenter {
  return FavoritesPresenterClientFactory.create();
}
