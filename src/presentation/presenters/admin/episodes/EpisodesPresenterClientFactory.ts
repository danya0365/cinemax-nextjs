"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { EpisodesPresenter } from "./EpisodesPresenter";

export class EpisodesPresenterClientFactory {
  static create(): EpisodesPresenter {
    const supabase = createClientSupabaseClient();
    return new EpisodesPresenter(supabase);
  }
}

export function createClientEpisodesPresenter(): EpisodesPresenter {
  return EpisodesPresenterClientFactory.create();
}
