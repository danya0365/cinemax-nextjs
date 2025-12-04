"use client";

import { useCallback, useEffect, useState } from "react";
import {
  HistoryPresenterFactory,
  type HistoryViewModel,
} from "./HistoryPresenter";

const presenter = HistoryPresenterFactory.createClient();

export interface HistoryPresenterState {
  viewModel: HistoryViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface HistoryPresenterActions {
  loadData: (userId: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export function useHistoryPresenter(
  userId: string | null,
  initialViewModel?: HistoryViewModel
): [HistoryPresenterState, HistoryPresenterActions] {
  const [viewModel, setViewModel] = useState<HistoryViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await presenter.getViewModel(uid);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = useCallback(
    async (id: string) => {
      const success = await presenter.deleteHistoryItem(id);
      if (success && viewModel) {
        setViewModel({
          ...viewModel,
          history: viewModel.history.filter((h) => h.id !== id),
          total: viewModel.total - 1,
        });
      }
    },
    [viewModel]
  );

  useEffect(() => {
    if (userId && !initialViewModel) {
      loadData(userId);
    }
  }, [userId, initialViewModel, loadData]);

  return [
    { viewModel, loading, error },
    { loadData, deleteItem, setError },
  ];
}
