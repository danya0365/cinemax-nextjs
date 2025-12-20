"use client";

import { useCallback, useEffect, useState } from "react";
import { type FavoritesViewModel } from "./FavoritesPresenter";
import { createClientFavoritesPresenter } from "./FavoritesPresenterClientFactory";

const presenter = createClientFavoritesPresenter();

export interface FavoritesPresenterState {
  viewModel: FavoritesViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface FavoritesPresenterActions {
  loadData: (userId: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export function useFavoritesPresenter(
  userId: string | null,
  initialViewModel?: FavoritesViewModel
): [FavoritesPresenterState, FavoritesPresenterActions] {
  const [viewModel, setViewModel] = useState<FavoritesViewModel | null>(
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

  const removeFavorite = useCallback(
    async (id: string) => {
      const success = await presenter.removeFavorite(id);
      if (success && viewModel) {
        setViewModel({
          ...viewModel,
          favorites: viewModel.favorites.filter((f) => f.id !== id),
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
    { loadData, removeFavorite, setError },
  ];
}
