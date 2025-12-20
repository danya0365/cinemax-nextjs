import { AdminSeriesView } from "@/src/presentation/components/admin/series";
import { createServerAdminSeriesPresenter } from "@/src/presentation/presenters/admin/series/AdminSeriesPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerAdminSeriesPresenter();
  return presenter.generateMetadata();
}

export default async function AdminSeriesPage() {
  const presenter = await createServerAdminSeriesPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <AdminSeriesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading admin series:", error);
    return <AdminSeriesView />;
  }
}
