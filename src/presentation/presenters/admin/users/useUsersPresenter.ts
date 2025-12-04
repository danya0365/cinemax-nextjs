"use client";

import { useCallback, useEffect, useState } from "react";
import { UsersPresenterFactory, type UsersViewModel } from "./UsersPresenter";

const presenter = UsersPresenterFactory.createClient();

export interface UsersPresenterState {
  viewModel: UsersViewModel | null;
  loading: boolean;
  error: string | null;
  search: string;
  roleFilter: "all" | "user" | "premium" | "admin";
  page: number;
}

export interface UsersPresenterActions {
  loadData: () => Promise<void>;
  setSearch: (search: string) => void;
  setRoleFilter: (filter: "all" | "user" | "premium" | "admin") => void;
  setPage: (page: number) => void;
  toggleUserStatus: (
    userId: string,
    currentStatus: "active" | "suspended"
  ) => Promise<void>;
  setError: (error: string | null) => void;
}

export function useUsersPresenter(
  initialViewModel?: UsersViewModel
): [UsersPresenterState, UsersPresenterActions] {
  const [viewModel, setViewModel] = useState<UsersViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "user" | "premium" | "admin"
  >("all");
  const [page, setPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel(page, 20, search, roleFilter);
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter]);

  const toggleUserStatus = useCallback(
    async (userId: string, currentStatus: "active" | "suspended") => {
      const newStatus = currentStatus === "active" ? "suspended" : "active";
      const success = await presenter.updateUserStatus(userId, newStatus);
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
    { viewModel, loading, error, search, roleFilter, page },
    { loadData, setSearch, setRoleFilter, setPage, toggleUserStatus, setError },
  ];
}
