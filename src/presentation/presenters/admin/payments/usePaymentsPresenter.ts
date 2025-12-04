"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PaymentsPresenterFactory,
  type PaymentsViewModel,
} from "./PaymentsPresenter";

const presenter = PaymentsPresenterFactory.createClient();

export interface PaymentsPresenterState {
  viewModel: PaymentsViewModel | null;
  loading: boolean;
  error: string | null;
  statusFilter: "all" | "completed" | "pending" | "failed" | "refunded";
  dateRange: string;
}

export interface PaymentsPresenterActions {
  loadData: () => Promise<void>;
  setStatusFilter: (
    status: "all" | "completed" | "pending" | "failed" | "refunded"
  ) => void;
  setDateRange: (range: string) => void;
  refundPayment: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export function usePaymentsPresenter(
  initialViewModel?: PaymentsViewModel
): [PaymentsPresenterState, PaymentsPresenterActions] {
  const [viewModel, setViewModel] = useState<PaymentsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending" | "failed" | "refunded"
  >("all");
  const [dateRange, setDateRange] = useState("7days");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await presenter.getViewModel(statusFilter, dateRange);
      setViewModel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateRange]);

  const refundPayment = useCallback(
    async (id: string) => {
      const success = await presenter.refundPayment(id);
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
    { viewModel, loading, error, statusFilter, dateRange },
    { loadData, setStatusFilter, setDateRange, refundPayment, setError },
  ];
}
