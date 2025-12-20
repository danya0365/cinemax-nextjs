"use client";

import { useCallback, useEffect, useState } from "react";
import { type AnalyticsViewModel } from "./AnalyticsPresenter";
import { createClientAnalyticsPresenter } from "./AnalyticsPresenterClientFactory";

// Initialize presenter instance once (singleton pattern)
const presenter = createClientAnalyticsPresenter();

export interface AnalyticsPresenterState {
  viewModel: AnalyticsViewModel | null;
  loading: boolean;
  error: string | null;
  period: "7d" | "30d" | "90d" | "1y";
}

export interface AnalyticsPresenterActions {
  loadData: () => Promise<void>;
  setPeriod: (period: "7d" | "30d" | "90d" | "1y") => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Analytics presenter
 * Provides state management and actions for Analytics page
 */
export function useAnalyticsPresenter(
  initialViewModel?: AnalyticsViewModel
): [AnalyticsPresenterState, AnalyticsPresenterActions] {
  const [viewModel, setViewModel] = useState<AnalyticsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading analytics data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      period,
    },
    {
      loadData,
      setPeriod,
      setError,
    },
  ];
}
