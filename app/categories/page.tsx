import { MainLayout } from "@/src/presentation/components";
import { CategoriesView } from "@/src/presentation/components/categories/CategoriesView";
import { CategoriesPresenterFactory } from "@/src/presentation/presenters/categories";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await CategoriesPresenterFactory.createServer();
  return presenter.generateMetadata();
}

/**
 * Categories page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function CategoriesPage() {
  const presenter = await CategoriesPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <div className="min-h-screen bg-background">
          <CategoriesView initialViewModel={viewModel} />
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching categories data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลหมวดหมู่ได้</p>
            <Link
              href="/"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
}
