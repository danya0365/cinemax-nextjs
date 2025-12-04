import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteItem {
  seriesId: string;
  addedAt: string;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  isLoading: boolean;
}

interface FavoritesActions {
  addFavorite: (seriesId: string) => void;
  removeFavorite: (seriesId: string) => void;
  isFavorite: (seriesId: string) => boolean;
  toggleFavorite: (seriesId: string) => void;
  clearFavorites: () => void;
}

type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,

      addFavorite: (seriesId: string) => {
        const { favorites } = get();
        if (!favorites.find((f) => f.seriesId === seriesId)) {
          set({
            favorites: [
              ...favorites,
              { seriesId, addedAt: new Date().toISOString() },
            ],
          });
        }
      },

      removeFavorite: (seriesId: string) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter((f) => f.seriesId !== seriesId),
        });
      },

      isFavorite: (seriesId: string) => {
        const { favorites } = get();
        return favorites.some((f) => f.seriesId === seriesId);
      },

      toggleFavorite: (seriesId: string) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(seriesId)) {
          removeFavorite(seriesId);
        } else {
          addFavorite(seriesId);
        }
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "cinemax-favorites",
      storage: createJSONStorage(() => localforage as unknown as Storage),
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
