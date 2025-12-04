import { AdminCategoriesView } from "@/src/presentation/components/admin/categories";
import { AdminCategoriesPresenterFactory } from "@/src/presentation/presenters/admin/categories";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await AdminCategoriesPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function AdminCategoriesPage() {
  const presenter = await AdminCategoriesPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <AdminCategoriesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading categories:", error);
    return <AdminCategoriesView />;
  }
}
