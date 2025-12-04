import { DashboardView } from "@/src/presentation/components/admin/dashboard";
import { DashboardPresenterFactory } from "@/src/presentation/presenters/admin/dashboard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await DashboardPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function AdminDashboard() {
  const presenter = await DashboardPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <DashboardView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <DashboardView />;
  }
}
