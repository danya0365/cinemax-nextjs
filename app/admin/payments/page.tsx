import { PaymentsView } from "@/src/presentation/components/admin/payments";
import { createServerPaymentsPresenter } from "@/src/presentation/presenters/admin/payments/PaymentsPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerPaymentsPresenter();
  return presenter.generateMetadata();
}

export default async function AdminPaymentsPage() {
  const presenter = await createServerPaymentsPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <PaymentsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading payments:", error);
    return <PaymentsView />;
  }
}
