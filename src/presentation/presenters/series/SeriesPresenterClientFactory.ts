"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { SeriesPresenter } from "./SeriesPresenter";

export class SeriesPresenterClientFactory {
  static create(): SeriesPresenter {
    const supabase = createClientSupabaseClient();
    return new SeriesPresenter(supabase);
  }
}

export function createClientSeriesPresenter(): SeriesPresenter {
  return SeriesPresenterClientFactory.create();
}
