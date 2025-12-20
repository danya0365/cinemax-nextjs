import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { UsersPresenter } from "./UsersPresenter";

export class UsersPresenterServerFactory {
  static async create(): Promise<UsersPresenter> {
    const supabase = await createServerSupabaseClient();
    return new UsersPresenter(supabase);
  }
}

export async function createServerUsersPresenter(): Promise<UsersPresenter> {
  return UsersPresenterServerFactory.create();
}
