"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CategoriesPresenterFactory,
  type CategoriesViewModel,
  type Category,
} from "./CategoriesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = CategoriesPresenterFactory.createClient();

export interface CategoriesPresenterState {
  viewModel: CategoriesViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface CategoriesPresenterActions {
  loadData: () => Promise<void>;
  getCategoryBySlug: (slug: string) => Promise<Category | null>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Categories presenter
 * Provides state management and actions for Categories
 */
export function useCategoriesPresenter(
  initialViewModel?: CategoriesViewModel
): [CategoriesPresenterState, CategoriesPresenterActions] {
  const [viewModel, setViewModel] = useState<CategoriesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

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
      console.error("Error loading categories data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get category by slug
   */
  const getCategoryBySlug = useCallback(
    async (slug: string): Promise<Category | null> => {
      try {
        return await presenter.getCategoryBySlug(slug);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error getting category:", err);
        return null;
      }
    },
    []
  );

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
    },
    {
      loadData,
      getCategoryBySlug,
      setError,
    },
  ];
}
