"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { PaymentsPresenter } from "./PaymentsPresenter";

export class PaymentsPresenterClientFactory {
  static create(): PaymentsPresenter {
    const supabase = createClientSupabaseClient();
    return new PaymentsPresenter(supabase);
  }
}

export function createClientPaymentsPresenter(): PaymentsPresenter {
  return PaymentsPresenterClientFactory.create();
}
