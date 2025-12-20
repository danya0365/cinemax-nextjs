import { MainLayout } from "@/src/presentation/components";
import { SeriesCatalogView } from "@/src/presentation/components/series/SeriesCatalogView";
import { createServerSeriesPresenter } from "@/src/presentation/presenters/series/SeriesPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface SeriesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerSeriesPresenter();
  return presenter.generateMetadata();
}

/**
 * Series Catalog page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function SeriesPage({ searchParams }: SeriesPageProps) {
  const params = await searchParams;
  const presenter = await createServerSeriesPresenter();

  try {
    // Parse filters from search params
    const filters = {
      category: params.category as string | undefined,
      status: params.status as string | undefined,
      search: params.search as string | undefined,
      sort: (params.sort as "latest" | "popular" | "rating") || "latest",
    };

    const page = parseInt(params.page as string) || 1;

    // Get view model from presenter
    const viewModel = await presenter.getViewModel(page, 12, filters);

    return (
      <MainLayout>
        <SeriesCatalogView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching series data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลซีรีย์ได้</p>
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
