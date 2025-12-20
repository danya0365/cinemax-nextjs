import { AnalyticsView } from "@/src/presentation/components/admin/analytics";
import { createServerAnalyticsPresenter } from "@/src/presentation/presenters/admin/analytics/AnalyticsPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerAnalyticsPresenter();
  return presenter.generateMetadata();
}

/**
 * Admin Analytics page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function AnalyticsPage() {
  const presenter = await createServerAnalyticsPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <AnalyticsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching analytics data:", error);

    // Fallback UI
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลดข้อมูลได้
          </p>
          <Link
            href="/admin"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
