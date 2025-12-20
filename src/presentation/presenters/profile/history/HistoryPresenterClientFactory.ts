"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { HistoryPresenter } from "./HistoryPresenter";

export class HistoryPresenterClientFactory {
  static create(): HistoryPresenter {
    const supabase = createClientSupabaseClient();
    return new HistoryPresenter(supabase);
  }
}

export function createClientHistoryPresenter(): HistoryPresenter {
  return HistoryPresenterClientFactory.create();
}
