"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminCategoriesPresenterFactory,
  type AdminCategoriesViewModel,
} from "./AdminCategoriesPresenter";

const presenter = AdminCategoriesPresenterFactory.createClient();

export interface AdminCategoriesPresenterState {
  viewModel: AdminCategoriesViewModel | null;
  loading: boolean;
  error: string | null;
  editingId: string | null;
  showAddForm: boolean;
}

export interface AdminCategoriesPresenterActions {
  loadData: () => Promise<void>;
  createCategory: (data: {
    name: string;
    name_en: string;
    icon: string;
  }) => Promise<void>;
  updateCategory: (
    id: string,
    data: { name: string; name_en: string; icon: string }
  ) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setEditingId: (id: string | null) => void;
  setShowAddForm: (show: boolean) => void;
  setError: (error: string | null) => void;
}

export function useAdminCategoriesPresenter(
  initialViewModel?: AdminCategoriesViewModel
): [AdminCategoriesPresenterState, AdminCategoriesPresenterActions] {
  const [viewModel, setViewModel] = useState<AdminCategoriesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (data: { name: string; name_en: string; icon: string }) => {
      const success = await presenter.createCategory(data);
      if (success) {
        setShowAddForm(false);
        loadData();
      }
    },
    [loadData]
  );

  const updateCategory = useCallback(
    async (
      id: string,
      data: { name: string; name_en: string; icon: string }
    ) => {
      const success = await presenter.updateCategory(id, data);
      if (success) {
        setEditingId(null);
        loadData();
      }
    },
    [loadData]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      const success = await presenter.deleteCategory(id);
      if (success) {
        loadData();
      }
    },
    [loadData]
  );

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    { viewModel, loading, error, editingId, showAddForm },
    {
      loadData,
      createCategory,
      updateCategory,
      deleteCategory,
      setEditingId,
      setShowAddForm,
      setError,
    },
  ];
}
