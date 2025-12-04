"use client";

import type { Category } from "@/src/domain/types";
import { useCallback } from "react";
import { useApi } from "./useApi";

interface CategoriesResponse {
  data: (Category & { seriesCount: number })[];
  meta: {
    total: number;
  };
}

// Fetch all categories
export function useCategories() {
  const fetcher = useCallback(async (): Promise<CategoriesResponse> => {
    const response = await fetch("/api/categories");
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  }, []);

  return useApi(fetcher);
}

// Fetch category by slug
export function useCategoryBySlug(slug: string) {
  const { data, ...rest } = useCategories();

  const category = data?.data.find((c) => c.slug === slug);

  return {
    data: category ?? null,
    ...rest,
  };
}
