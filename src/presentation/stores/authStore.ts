"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initialize: () => Promise<void>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    username?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

// Configure localforage
localforage.config({
  name: "cinemax",
  storeName: "auth",
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      initialize: async () => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true });

          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error("Auth initialization error:", error);
            set({ error: error.message });
          }

          set({
            session,
            user: session?.user ?? null,
            isInitialized: true,
          });

          // Listen for auth changes
          supabase.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
              set({
                session,
                user: session?.user ?? null,
              });
            }
          );
        } catch (err) {
          console.error("Auth initialization error:", err);
          set({ error: "Failed to initialize auth" });
        } finally {
          set({ isLoading: false });
        }
      },

      signIn: async (email, password) => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ error: error.message });
            return { success: false, error: error.message };
          }

          set({
            user: data.user,
            session: data.session,
          });

          return { success: true };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Sign in failed";
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (email, password, username) => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username || email.split("@")[0],
              },
            },
          });

          if (error) {
            set({ error: error.message });
            return { success: false, error: error.message };
          }

          // Note: User might need to confirm email
          if (data.user && !data.session) {
            return {
              success: true,
              error: "กรุณายืนยันอีเมลของคุณเพื่อเข้าสู่ระบบ",
            };
          }

          set({
            user: data.user,
            session: data.session,
          });

          return { success: true };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Sign up failed";
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true });
          await supabase.auth.signOut();
          set({ user: null, session: null });
        } catch (err) {
          console.error("Sign out error:", err);
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (email) => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true, error: null });

          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          });

          if (error) {
            set({ error: error.message });
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Reset password failed";
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      signInWithGoogle: async () => {
        const supabase = createClientSupabaseClient();

        try {
          set({ isLoading: true, error: null });

          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            set({ error: error.message });
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Google sign in failed";
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "cinemax-auth",
      storage: createJSONStorage(() => localforage as unknown as Storage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
