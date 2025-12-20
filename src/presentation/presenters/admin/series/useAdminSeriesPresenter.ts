"use client";

import { useCallback, useEffect, useState } from "react";
import { type AdminSeriesViewModel } from "./AdminSeriesPresenter";
import { createClientAdminSeriesPresenter } from "./AdminSeriesPresenterClientFactory";

const presenter = createClientAdminSeriesPresenter();

export interface AdminSeriesPresenterState {
  viewModel: AdminSeriesViewModel | null;
  loading: boolean;
  error: string | null;
  search: string;
  filter: "all" | "published" | "draft" | "scheduled";
  page: number;
}

export interface AdminSeriesPresenterActions {
  loadData: () => Promise<void>;
  setSearch: (search: string) => void;
  setFilter: (filter: "all" | "published" | "draft" | "scheduled") => void;
  setPage: (page: number) => void;
  deleteSeries: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export function useAdminSeriesPresenter(
  initialViewModel?: AdminSeriesViewModel
): [AdminSeriesPresenterState, AdminSeriesPresenterActions] {
  const [viewModel, setViewModel] = useState<AdminSeriesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "scheduled"
  >("all");
  const [page, setPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel(page, 20, search, filter);
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, search, filter]);

  const deleteSeries = useCallback(
    async (id: string) => {
      const success = await presenter.deleteSeries(id);
      if (success) {
        loadData();
      }
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return [
    { viewModel, loading, error, search, filter, page },
    { loadData, setSearch, setFilter, setPage, deleteSeries, setError },
  ];
}
