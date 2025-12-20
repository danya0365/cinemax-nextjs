"use client";

import { useCallback, useEffect, useState } from "react";
import { type NotificationsViewModel } from "./NotificationsPresenter";
import { createClientNotificationsPresenter } from "./NotificationsPresenterClientFactory";

// Initialize presenter instance once (singleton pattern)
const presenter = createClientNotificationsPresenter();

export interface NotificationsPresenterState {
  viewModel: NotificationsViewModel | null;
  loading: boolean;
  error: string | null;
  filter: "all" | "unread";
}

export interface NotificationsPresenterActions {
  loadData: (userId: string) => Promise<void>;
  setFilter: (filter: "all" | "unread") => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: (userId: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Notifications presenter
 * Provides state management and actions for Notifications page
 */
export function useNotificationsPresenter(
  userId: string | null,
  initialViewModel?: NotificationsViewModel
): [NotificationsPresenterState, NotificationsPresenterActions] {
  const [viewModel, setViewModel] = useState<NotificationsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

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
      console.error("Error loading notifications data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(
    async (id: string) => {
      const success = await presenter.markAsRead(id);
      if (success && viewModel) {
        setViewModel({
          ...viewModel,
          notifications: viewModel.notifications.map((n) =>
            n.id === id ? { ...n, is_read: true } : n
          ),
          unreadCount: Math.max(0, viewModel.unreadCount - 1),
        });
      }
    },
    [viewModel]
  );

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(
    async (uid: string) => {
      const success = await presenter.markAllAsRead(uid);
      if (success && viewModel) {
        setViewModel({
          ...viewModel,
          notifications: viewModel.notifications.map((n) => ({
            ...n,
            is_read: true,
          })),
          unreadCount: 0,
        });
      }
    },
    [viewModel]
  );

  /**
   * Delete notification
   */
  const deleteNotification = useCallback(
    async (id: string) => {
      const notification = viewModel?.notifications.find((n) => n.id === id);
      const success = await presenter.deleteNotification(id);
      if (success && viewModel) {
        setViewModel({
          ...viewModel,
          notifications: viewModel.notifications.filter((n) => n.id !== id),
          unreadCount:
            notification && !notification.is_read
              ? Math.max(0, viewModel.unreadCount - 1)
              : viewModel.unreadCount,
        });
      }
    },
    [viewModel]
  );

  // Load data on mount if user is available
  useEffect(() => {
    if (userId && !initialViewModel) {
      loadData(userId);
    }
  }, [userId, initialViewModel, loadData]);

  // Get filtered notifications
  const filteredNotifications =
    viewModel?.notifications.filter((n) => {
      if (filter === "all") return true;
      return !n.is_read;
    }) || [];

  return [
    {
      viewModel: viewModel
        ? { ...viewModel, notifications: filteredNotifications }
        : null,
      loading,
      error,
      filter,
    },
    {
      loadData,
      setFilter,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      setError,
    },
  ];
}
