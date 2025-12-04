"use client";

import { MainLayout } from "@/src/presentation/components";
import { NotificationsView } from "@/src/presentation/components/profile/notifications";
import { useAuthStore } from "@/src/presentation/stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Notifications page - Client Component with auth check
 * Uses presenter pattern following Clean Architecture
 */
export default function NotificationsPage() {
  const router = useRouter();
  const { user, isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isInitialized, isLoading, user, router]);

  if (!isInitialized || isLoading) {
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
        <NotificationsView />
      </div>
    </MainLayout>
  );
}
