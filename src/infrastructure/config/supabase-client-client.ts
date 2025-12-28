import { createBrowserClient } from "@supabase/ssr";
import { createMockSupabaseClient } from "../mock/MockSupabaseClient";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockClient: any = null;

export function createClientSupabaseClient() {
  // Return mock client if USE_MOCK is enabled
  if (USE_MOCK) {
    if (!mockClient) {
      mockClient = createMockSupabaseClient();
    }
    return mockClient;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseClient;
}

