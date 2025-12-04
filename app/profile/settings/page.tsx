"use client";

import { MainLayout } from "@/src/presentation/components";
import { SettingsView } from "@/src/presentation/components/profile/settings";
import { useAuthStore } from "@/src/presentation/stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Settings page - Client Component with auth check
 * Uses presenter pattern following Clean Architecture
 */
export default function SettingsPage() {
  const router = useRouter();
  const { user, isInitialized, isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !authLoading && !user) {
      router.push("/auth/login");
    }
  }, [isInitialized, authLoading, user, router]);

  if (!isInitialized || authLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) return null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <SettingsView />
      </div>
    </MainLayout>
  );
}
