import { MainLayout } from "@/src/presentation/components";
import { HomeView } from "@/src/presentation/components/home";
import { createServerHomePresenter } from "@/src/presentation/presenters/home/HomePresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerHomePresenter();
  return presenter.generateMetadata();
}

/**
 * Home page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function Home() {
  const presenter = await createServerHomePresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <HomeView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching home data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลได้</p>
            <Link
              href="/series"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              ดูซีรีย์ทั้งหมด
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
}
