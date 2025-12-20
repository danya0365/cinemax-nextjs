"use client";

import { useCallback, useEffect, useState } from "react";
import { type DashboardViewModel } from "./DashboardPresenter";
import { createClientDashboardPresenter } from "./DashboardPresenterClientFactory";

const presenter = createClientDashboardPresenter();

export interface DashboardPresenterState {
  viewModel: DashboardViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

export function useDashboardPresenter(
  initialViewModel?: DashboardViewModel
): [DashboardPresenterState, DashboardPresenterActions] {
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    { viewModel, loading, error },
    { loadData, setError },
  ];
}
