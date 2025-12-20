import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { PurchasesPresenter } from "./PurchasesPresenter";

export class PurchasesPresenterServerFactory {
  static async create(): Promise<PurchasesPresenter> {
    const supabase = await createServerSupabaseClient();
    return new PurchasesPresenter(supabase);
  }
}

export async function createServerPurchasesPresenter(): Promise<PurchasesPresenter> {
  return PurchasesPresenterServerFactory.create();
}
