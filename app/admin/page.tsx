import { DashboardView } from "@/src/presentation/components/admin/dashboard";
import { createServerDashboardPresenter } from "@/src/presentation/presenters/admin/dashboard/DashboardPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerDashboardPresenter();
  return presenter.generateMetadata();
}

export default async function AdminDashboard() {
  const presenter = await createServerDashboardPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <DashboardView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <DashboardView />;
  }
}
