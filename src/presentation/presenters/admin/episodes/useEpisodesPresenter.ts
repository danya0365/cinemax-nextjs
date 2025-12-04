"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EpisodesPresenterFactory,
  type CreateEpisodeData,
  type Episode,
  type EpisodeFilters,
  type EpisodesViewModel,
  type UpdateEpisodeData,
} from "./EpisodesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = EpisodesPresenterFactory.createClient();

export interface EpisodesPresenterState {
  viewModel: EpisodesViewModel | null;
  loading: boolean;
  error: string | null;
  filters: EpisodeFilters;
  page: number;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedEpisodeId: string | null;
}

export interface EpisodesPresenterActions {
  loadData: () => Promise<void>;
  setFilters: (filters: EpisodeFilters) => void;
  setPage: (page: number) => void;
  createEpisode: (data: CreateEpisodeData) => Promise<void>;
  updateEpisode: (data: UpdateEpisodeData) => Promise<void>;
  deleteEpisode: (id: string) => Promise<void>;
  getEpisodeById: (id: string) => Promise<Episode | null>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (episodeId: string) => void;
  closeEditModal: () => void;
  openDeleteModal: (episodeId: string) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Episodes presenter
 * Provides state management and actions for Episodes admin
 */
export function useEpisodesPresenter(
  initialViewModel?: EpisodesViewModel
): [EpisodesPresenterState, EpisodesPresenterActions] {
  const [viewModel, setViewModel] = useState<EpisodesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<EpisodeFilters>(
    initialViewModel?.filters || {}
  );
  const [page, setPageState] = useState(initialViewModel?.page || 1);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(
    null
  );

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(page, 20, filters);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading episodes data:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  /**
   * Set filters and reload data
   */
  const setFilters = useCallback((newFilters: EpisodeFilters) => {
    setFiltersState(newFilters);
    setPageState(1);
  }, []);

  /**
   * Set page
   */
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  /**
   * Create a new episode
   */
  const createEpisode = useCallback(
    async (data: CreateEpisodeData) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.createEpisode(data);
        setIsCreateModalOpen(false);
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error creating episode:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  /**
   * Update an existing episode
   */
  const updateEpisode = useCallback(
    async (data: UpdateEpisodeData) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.updateEpisode(data.id, data);
        setIsEditModalOpen(false);
        setSelectedEpisodeId(null);
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error updating episode:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  /**
   * Delete an episode
   */
  const deleteEpisode = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await presenter.deleteEpisode(id);
        setIsDeleteModalOpen(false);
        setSelectedEpisodeId(null);
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error deleting episode:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  /**
   * Get episode by ID
   */
  const getEpisodeById = useCallback(
    async (id: string): Promise<Episode | null> => {
      try {
        return await presenter.getEpisodeById(id);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error getting episode:", err);
        return null;
      }
    },
    []
  );

  // Modal actions
  const openCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
    setError(null);
  }, []);

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setError(null);
  }, []);

  const openEditModal = useCallback((episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setIsEditModalOpen(true);
    setError(null);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedEpisodeId(null);
    setError(null);
  }, []);

  const openDeleteModal = useCallback((episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setIsDeleteModalOpen(true);
    setError(null);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEpisodeId(null);
    setError(null);
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
      isCreateModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      selectedEpisodeId,
    },
    {
      loadData,
      setFilters,
      setPage,
      createEpisode,
      updateEpisode,
      deleteEpisode,
      getEpisodeById,
      openCreateModal,
      closeCreateModal,
      openEditModal,
      closeEditModal,
      openDeleteModal,
      closeDeleteModal,
      setError,
    },
  ];
}
