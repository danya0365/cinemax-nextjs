"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PurchasesPresenterFactory,
  type PurchasesViewModel,
} from "./PurchasesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = PurchasesPresenterFactory.createClient();

export interface PurchasesPresenterState {
  viewModel: PurchasesViewModel | null;
  loading: boolean;
  error: string | null;
  filter: "all" | "completed" | "pending" | "failed";
}

export interface PurchasesPresenterActions {
  loadData: (userId: string) => Promise<void>;
  setFilter: (filter: "all" | "completed" | "pending" | "failed") => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Purchases presenter
 * Provides state management and actions for Purchases page
 */
export function usePurchasesPresenter(
  userId: string | null,
  initialViewModel?: PurchasesViewModel
): [PurchasesPresenterState, PurchasesPresenterActions] {
  const [viewModel, setViewModel] = useState<PurchasesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(uid);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading purchases data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if user is available
  useEffect(() => {
    if (userId && !initialViewModel) {
      loadData(userId);
    }
  }, [userId, initialViewModel, loadData]);

  // Get filtered purchases
  const filteredPurchases =
    viewModel?.purchases.filter((p) => {
      if (filter === "all") return true;
      return p.status === filter;
    }) || [];

  return [
    {
      viewModel: viewModel
        ? { ...viewModel, purchases: filteredPurchases }
        : null,
      loading,
      error,
      filter,
    },
    {
      loadData,
      setFilter,
      setError,
    },
  ];
}
