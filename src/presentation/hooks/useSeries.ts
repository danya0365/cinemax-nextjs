"use client";

import type { Episode, Series } from "@/src/domain/types";
import { useCallback } from "react";
import { useApi } from "./useApi";

interface SeriesListResponse {
  data: Series[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

interface SeriesDetailResponse {
  series: Series;
  episodes?: Episode[];
}

interface SeriesFilters {
  category?: string;
  sort?: "newest" | "popular" | "rating" | "oldest";
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

// Fetch series list
export function useSeriesList(filters: SeriesFilters = {}) {
  const fetcher = useCallback(async (): Promise<SeriesListResponse> => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.search) params.set("q", filters.search);
    if (filters.featured) params.set("featured", "true");
    if (filters.limit) params.set("limit", filters.limit.toString());
    if (filters.offset) params.set("offset", filters.offset.toString());

    const response = await fetch(`/api/series?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch series");
    return response.json();
  }, [
    filters.category,
    filters.sort,
    filters.search,
    filters.featured,
    filters.limit,
    filters.offset,
  ]);

  return useApi(fetcher);
}

// Fetch single series with episodes
export function useSeriesDetail(id: string, includeEpisodes = true) {
  const fetcher = useCallback(async (): Promise<SeriesDetailResponse> => {
    const params = includeEpisodes ? "?include=episodes" : "";
    const response = await fetch(`/api/series/${id}${params}`);
    if (!response.ok) throw new Error("Failed to fetch series");
    return response.json();
  }, [id, includeEpisodes]);

  return useApi(fetcher, { immediate: !!id });
}

// Fetch featured series
export function useFeaturedSeries() {
  return useSeriesList({ featured: true, limit: 6 });
}

// Fetch trending series
export function useTrendingSeries() {
  return useSeriesList({ sort: "popular", limit: 10 });
}

// Search series
export function useSearchSeries(query: string) {
  const fetcher = useCallback(async (): Promise<SeriesListResponse> => {
    if (!query || query.length < 2) {
      return {
        data: [],
        meta: { total: 0, limit: 20, offset: 0, hasMore: false },
      };
    }

    const response = await fetch(`/api/series?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to search series");
    return response.json();
  }, [query]);

  return useApi(fetcher);
}
