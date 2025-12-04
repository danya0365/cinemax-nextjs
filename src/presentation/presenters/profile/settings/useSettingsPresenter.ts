"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SettingsPresenterFactory,
  type Language,
  type Quality,
  type SettingsViewModel,
  type UserSettings,
} from "./SettingsPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = SettingsPresenterFactory.createClient();

export interface SettingsPresenterState {
  viewModel: SettingsViewModel | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface SettingsPresenterActions {
  loadData: (userId: string) => Promise<void>;
  updateSettings: (
    userId: string,
    settings: Partial<
      Omit<UserSettings, "id" | "user_id" | "created_at" | "updated_at">
    >
  ) => Promise<void>;
  setLanguage: (language: Language) => void;
  setQuality: (quality: Quality) => void;
  setAutoPlay: (autoPlay: boolean) => void;
  setNotificationPreference: (key: string, value: boolean) => void;
  setError: (error: string | null) => void;
  clearSuccessMessage: () => void;
}

/**
 * Custom hook for Settings presenter
 * Provides state management and actions for Settings page
 */
export function useSettingsPresenter(
  userId: string | null,
  initialViewModel?: SettingsViewModel
): [SettingsPresenterState, SettingsPresenterActions] {
  const [viewModel, setViewModel] = useState<SettingsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      console.error("Error loading settings data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update settings on server
   */
  const updateSettings = useCallback(
    async (
      uid: string,
      settings: Partial<
        Omit<UserSettings, "id" | "user_id" | "created_at" | "updated_at">
      >
    ) => {
      setSaving(true);
      setError(null);

      try {
        const success = await presenter.updateSettings(uid, settings);
        if (success) {
          setSuccessMessage("บันทึกการตั้งค่าเรียบร้อย");
          // Auto-clear success message after 3 seconds
          setTimeout(() => setSuccessMessage(null), 3000);
        } else {
          setError("ไม่สามารถบันทึกการตั้งค่าได้");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error updating settings:", err);
      } finally {
        setSaving(false);
      }
    },
    []
  );

  /**
   * Update local state for language
   */
  const setLanguage = useCallback(
    (language: Language) => {
      if (viewModel) {
        setViewModel({
          ...viewModel,
          settings: { ...viewModel.settings, language },
        });
      }
    },
    [viewModel]
  );

  /**
   * Update local state for quality
   */
  const setQuality = useCallback(
    (quality: Quality) => {
      if (viewModel) {
        setViewModel({
          ...viewModel,
          settings: { ...viewModel.settings, default_quality: quality },
        });
      }
    },
    [viewModel]
  );

  /**
   * Update local state for auto play
   */
  const setAutoPlay = useCallback(
    (autoPlay: boolean) => {
      if (viewModel) {
        setViewModel({
          ...viewModel,
          settings: { ...viewModel.settings, auto_play: autoPlay },
        });
      }
    },
    [viewModel]
  );

  /**
   * Update local state for notification preferences
   */
  const setNotificationPreference = useCallback(
    (key: string, value: boolean) => {
      if (viewModel) {
        setViewModel({
          ...viewModel,
          settings: { ...viewModel.settings, [key]: value },
        });
      }
    },
    [viewModel]
  );

  /**
   * Clear success message
   */
  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  // Load data on mount if user is available
  useEffect(() => {
    if (userId && !initialViewModel) {
      loadData(userId);
    }
  }, [userId, initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      saving,
      error,
      successMessage,
    },
    {
      loadData,
      updateSettings,
      setLanguage,
      setQuality,
      setAutoPlay,
      setNotificationPreference,
      setError,
      clearSuccessMessage,
    },
  ];
}
