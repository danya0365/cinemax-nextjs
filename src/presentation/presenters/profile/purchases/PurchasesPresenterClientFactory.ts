"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { PurchasesPresenter } from "./PurchasesPresenter";

export class PurchasesPresenterClientFactory {
  static create(): PurchasesPresenter {
    const supabase = createClientSupabaseClient();
    return new PurchasesPresenter(supabase);
  }
}

export function createClientPurchasesPresenter(): PurchasesPresenter {
  return PurchasesPresenterClientFactory.create();
}
