import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { PaymentsPresenter } from "./PaymentsPresenter";

export class PaymentsPresenterServerFactory {
  static async create(): Promise<PaymentsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new PaymentsPresenter(supabase);
  }
}

export async function createServerPaymentsPresenter(): Promise<PaymentsPresenter> {
  return PaymentsPresenterServerFactory.create();
}
