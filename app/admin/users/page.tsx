import { UsersView } from "@/src/presentation/components/admin/users";
import { UsersPresenterFactory } from "@/src/presentation/presenters/admin/users";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await UsersPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function AdminUsersPage() {
  const presenter = await UsersPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <UsersView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading admin users:", error);
    return <UsersView />;
  }
}
