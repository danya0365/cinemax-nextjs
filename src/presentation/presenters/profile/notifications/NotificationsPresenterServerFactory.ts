import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { NotificationsPresenter } from "./NotificationsPresenter";

export class NotificationsPresenterServerFactory {
  static async create(): Promise<NotificationsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new NotificationsPresenter(supabase);
  }
}

export async function createServerNotificationsPresenter(): Promise<NotificationsPresenter> {
  return NotificationsPresenterServerFactory.create();
}
