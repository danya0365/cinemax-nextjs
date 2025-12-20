import { UsersView } from "@/src/presentation/components/admin/users";
import { createServerUsersPresenter } from "@/src/presentation/presenters/admin/users/UsersPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerUsersPresenter();
  return presenter.generateMetadata();
}

export default async function AdminUsersPage() {
  const presenter = await createServerUsersPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <UsersView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading admin users:", error);
    return <UsersView />;
  }
}
