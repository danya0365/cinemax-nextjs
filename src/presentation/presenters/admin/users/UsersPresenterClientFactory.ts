"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { UsersPresenter } from "./UsersPresenter";

export class UsersPresenterClientFactory {
  static create(): UsersPresenter {
    const supabase = createClientSupabaseClient();
    return new UsersPresenter(supabase);
  }
}

export function createClientUsersPresenter(): UsersPresenter {
  return UsersPresenterClientFactory.create();
}
