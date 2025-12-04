"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SeriesPresenterFactory,
  type Series,
  type SeriesFilters,
  type SeriesViewModel,
} from "./SeriesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = SeriesPresenterFactory.createClient();

export interface SeriesPresenterState {
  viewModel: SeriesViewModel | null;
  loading: boolean;
  error: string | null;
  filters: SeriesFilters;
  page: number;
}

export interface SeriesPresenterActions {
  loadData: () => Promise<void>;
  setFilters: (filters: SeriesFilters) => void;
  setPage: (page: number) => void;
  getSeriesById: (id: string) => Promise<Series | null>;
  incrementViewCount: (seriesId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Series presenter
 * Provides state management and actions for Series catalog
 */
export function useSeriesPresenter(
  initialViewModel?: SeriesViewModel
): [SeriesPresenterState, SeriesPresenterActions] {
  const [viewModel, setViewModel] = useState<SeriesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<SeriesFilters>(
    initialViewModel?.filters || {}
  );
  const [page, setPageState] = useState(initialViewModel?.page || 1);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(page, 12, filters);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading series data:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  /**
   * Set filters and reload data
   */
  const setFilters = useCallback((newFilters: SeriesFilters) => {
    setFiltersState(newFilters);
    setPageState(1); // Reset to first page when filters change
  }, []);

  /**
   * Set page and reload data
   */
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  /**
   * Get series by ID
   */
  const getSeriesById = useCallback(
    async (id: string): Promise<Series | null> => {
      try {
        return await presenter.getSeriesById(id);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error getting series:", err);
        return null;
      }
    },
    []
  );

  /**
   * Increment view count
   */
  const incrementViewCount = useCallback(async (seriesId: string) => {
    try {
      await presenter.incrementViewCount(seriesId);
    } catch (err) {
      console.error("Error incrementing view count:", err);
    }
  }, []);

  // Load data when page or filters change
  useEffect(() => {
    loadData();
  }, [loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      filters,
      page,
    },
    {
      loadData,
      setFilters,
      setPage,
      getSeriesById,
      incrementViewCount,
      setError,
    },
  ];
}
