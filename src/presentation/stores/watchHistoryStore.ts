import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WatchHistoryItem {
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  progress: number; // 0-100
  duration: number; // in seconds
  watchedAt: string;
  thumbnail?: string;
}

interface WatchHistoryState {
  history: WatchHistoryItem[];
  isLoading: boolean;
}

interface WatchHistoryActions {
  addToHistory: (item: Omit<WatchHistoryItem, "watchedAt">) => void;
  updateProgress: (
    seriesId: string,
    episodeNumber: number,
    progress: number
  ) => void;
  removeFromHistory: (seriesId: string, episodeNumber: number) => void;
  getLastWatched: (seriesId: string) => WatchHistoryItem | undefined;
  getContinueWatching: () => WatchHistoryItem[];
  clearHistory: () => void;
}

type WatchHistoryStore = WatchHistoryState & WatchHistoryActions;

export const useWatchHistoryStore = create<WatchHistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      isLoading: false,

      addToHistory: (item) => {
        const { history } = get();
        const existingIndex = history.findIndex(
          (h) =>
            h.seriesId === item.seriesId &&
            h.episodeNumber === item.episodeNumber
        );

        const newItem: WatchHistoryItem = {
          ...item,
          watchedAt: new Date().toISOString(),
        };

        if (existingIndex >= 0) {
          // Update existing entry
          const newHistory = [...history];
          newHistory[existingIndex] = newItem;
          set({ history: newHistory });
        } else {
          // Add new entry
          set({ history: [newItem, ...history].slice(0, 50) }); // Keep max 50 items
        }
      },

      updateProgress: (seriesId, episodeNumber, progress) => {
        const { history } = get();
        const existingIndex = history.findIndex(
          (h) => h.seriesId === seriesId && h.episodeNumber === episodeNumber
        );

        if (existingIndex >= 0) {
          const newHistory = [...history];
          newHistory[existingIndex] = {
            ...newHistory[existingIndex],
            progress,
            watchedAt: new Date().toISOString(),
          };
          set({ history: newHistory });
        }
      },

      removeFromHistory: (seriesId, episodeNumber) => {
        const { history } = get();
        set({
          history: history.filter(
            (h) =>
              !(h.seriesId === seriesId && h.episodeNumber === episodeNumber)
          ),
        });
      },

      getLastWatched: (seriesId) => {
        const { history } = get();
        return history.find((h) => h.seriesId === seriesId);
      },

      getContinueWatching: () => {
        const { history } = get();
        // Return items that are not 100% complete, sorted by most recent
        return history
          .filter((h) => h.progress < 100)
          .sort(
            (a, b) =>
              new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime()
          )
          .slice(0, 10);
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: "cinemax-watch-history",
      storage: createJSONStorage(() => localforage as unknown as Storage),
      partialize: (state) => ({ history: state.history }),
    }
  )
);
