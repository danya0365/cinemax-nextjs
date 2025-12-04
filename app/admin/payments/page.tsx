import { PaymentsView } from "@/src/presentation/components/admin/payments";
import { PaymentsPresenterFactory } from "@/src/presentation/presenters/admin/payments";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await PaymentsPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function AdminPaymentsPage() {
  const presenter = await PaymentsPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <PaymentsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading payments:", error);
    return <PaymentsView />;
  }
}
