"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { NotificationsPresenter } from "./NotificationsPresenter";

export class NotificationsPresenterClientFactory {
  static create(): NotificationsPresenter {
    const supabase = createClientSupabaseClient();
    return new NotificationsPresenter(supabase);
  }
}

export function createClientNotificationsPresenter(): NotificationsPresenter {
  return NotificationsPresenterClientFactory.create();
}
