/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * MockSupabaseClient - Mimics Supabase query builder API
 * Returns mock data instead of making real database calls
 */

import {
    getSeriesWithCategory,
    mockCategories,
    mockEpisodes,
    mockUserFavorites,
    mockUserPurchases,
    mockUsers,
    mockWatchHistory,
} from "./data";

type MockData = Record<string, any[]>;

// All mock data tables
const mockTables: MockData = {
  categories: mockCategories,
  series: getSeriesWithCategory(),
  episodes: mockEpisodes,
  profiles: mockUsers,
  user_purchases: mockUserPurchases,
  watch_history: mockWatchHistory,
  user_favorites: mockUserFavorites,
};

// Query builder class that mimics Supabase's chainable API
class MockQueryBuilder {
  private tableName: string;
  private data: any[];
  private selectedFields: string | null = null;
  private filters: Array<{ field: string; op: string; value: any }> = [];
  private orFilters: string | null = null;
  private orderByField: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private rangeStart: number | null = null;
  private rangeEnd: number | null = null;
  private isSingle = false;
  private countOption: "exact" | null = null;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.data = [...(mockTables[tableName] || [])];
  }

  select(fields: string = "*", options?: { count?: "exact" }) {
    this.selectedFields = fields;
    if (options?.count === "exact") {
      this.countOption = "exact";
    }
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push({ field, op: "eq", value });
    return this;
  }

  neq(field: string, value: any) {
    this.filters.push({ field, op: "neq", value });
    return this;
  }

  gt(field: string, value: any) {
    this.filters.push({ field, op: "gt", value });
    return this;
  }

  gte(field: string, value: any) {
    this.filters.push({ field, op: "gte", value });
    return this;
  }

  lt(field: string, value: any) {
    this.filters.push({ field, op: "lt", value });
    return this;
  }

  lte(field: string, value: any) {
    this.filters.push({ field, op: "lte", value });
    return this;
  }

  like(field: string, pattern: string) {
    this.filters.push({ field, op: "like", value: pattern });
    return this;
  }

  ilike(field: string, pattern: string) {
    this.filters.push({ field, op: "ilike", value: pattern });
    return this;
  }

  in(field: string, values: any[]) {
    this.filters.push({ field, op: "in", value: values });
    return this;
  }

  or(filterString: string) {
    this.orFilters = filterString;
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderByField = field;
    this.orderAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  range(start: number, end: number) {
    this.rangeStart = start;
    this.rangeEnd = end;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isSingle = true;
    return this;
  }

  // Execute the query and return results
  private execute(): { data: any; error: null; count?: number } {
    let result = [...this.data];

    // Apply filters
    for (const filter of this.filters) {
      result = result.filter((item) => {
        const fieldValue = this.getNestedValue(item, filter.field);

        switch (filter.op) {
          case "eq":
            return fieldValue === filter.value;
          case "neq":
            return fieldValue !== filter.value;
          case "gt":
            return fieldValue > filter.value;
          case "gte":
            return fieldValue >= filter.value;
          case "lt":
            return fieldValue < filter.value;
          case "lte":
            return fieldValue <= filter.value;
          case "like":
            return String(fieldValue).includes(
              filter.value.replace(/%/g, "")
            );
          case "ilike":
            return String(fieldValue)
              .toLowerCase()
              .includes(filter.value.replace(/%/g, "").toLowerCase());
          case "in":
            return filter.value.includes(fieldValue);
          default:
            return true;
        }
      });
    }

    // Apply OR filters (simplified implementation)
    if (this.orFilters) {
      const orParts = this.orFilters.split(",");
      result = result.filter((item) => {
        return orParts.some((part) => {
          const match = part.match(/(\w+)\.ilike\.(.+)/);
          if (match) {
            const [, field, pattern] = match;
            const value = String(item[field] || "").toLowerCase();
            const searchPattern = pattern.replace(/%/g, "").toLowerCase();
            return value.includes(searchPattern);
          }
          return false;
        });
      });
    }

    // Store count before pagination
    const totalCount = result.length;

    // Apply ordering
    if (this.orderByField) {
      const field = this.orderByField;
      const asc = this.orderAscending;
      result.sort((a, b) => {
        const aVal = this.getNestedValue(a, field);
        const bVal = this.getNestedValue(b, field);
        if (aVal < bVal) return asc ? -1 : 1;
        if (aVal > bVal) return asc ? 1 : -1;
        return 0;
      });
    }

    // Apply range
    if (this.rangeStart !== null && this.rangeEnd !== null) {
      result = result.slice(this.rangeStart, this.rangeEnd + 1);
    }

    // Apply limit
    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    // Return single or array
    if (this.isSingle) {
      return {
        data: result[0] || null,
        error: null,
        ...(this.countOption ? { count: totalCount } : {}),
      };
    }

    return {
      data: result,
      error: null,
      ...(this.countOption ? { count: totalCount } : {}),
    };
  }

  private getNestedValue(obj: any, path: string): any {
    // Handle nested paths like "category.slug"
    const parts = path.split(".");
    let value = obj;
    for (const part of parts) {
      value = value?.[part];
    }
    return value;
  }

  // Make the builder thenable (await-able)
  then(resolve: (value: any) => void, reject?: (reason: any) => void) {
    try {
      const result = this.execute();
      resolve(result);
    } catch (error) {
      if (reject) reject(error);
    }
  }
}

// Mock RPC functions
const mockRpcFunctions: Record<string, (params: any) => any> = {
  increment_series_view_count: ({ series_id }: { series_id: string }) => {
    const series = mockTables.series.find((s) => s.id === series_id);
    if (series) {
      series.view_count += 1;
    }
    return { data: null, error: null };
  },
};

// Mock Auth object
const mockAuth = {
  getUser: async () => ({
    data: {
      user: {
        id: "user-001",
        email: "demo@cinemax.com",
        user_metadata: {
          username: "DemoUser",
          avatar_url: "https://picsum.photos/seed/user1/200/200",
        },
      },
    },
    error: null,
  }),
  getSession: async () => ({
    data: {
      session: {
        user: {
          id: "user-001",
          email: "demo@cinemax.com",
        },
        access_token: "mock-token",
      },
    },
    error: null,
  }),
  signInWithPassword: async () => ({
    data: {
      user: { id: "user-001", email: "demo@cinemax.com" },
      session: { access_token: "mock-token" },
    },
    error: null,
  }),
  signInWithOAuth: async () => ({
    data: { url: "http://localhost:3000" },
    error: null,
  }),
  signUp: async () => ({
    data: { user: { id: "new-user", email: "new@example.com" }, session: null },
    error: null,
  }),
  signOut: async () => ({ error: null }),
  onAuthStateChange: (callback: any) => {
    // Simulate initial auth state
    setTimeout(() => {
      callback("SIGNED_IN", {
        user: { id: "user-001", email: "demo@cinemax.com" },
      });
    }, 100);
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
  resetPasswordForEmail: async () => ({ data: {}, error: null }),
  updateUser: async () => ({
    data: { user: { id: "user-001" } },
    error: null,
  }),
};

// The main mock client
export interface MockSupabaseClientType {
  from: (table: string) => MockQueryBuilder;
  rpc: (
    fnName: string,
    params?: any
  ) => Promise<{ data: any; error: null }>;
  auth: typeof mockAuth;
}

export function createMockSupabaseClient(): MockSupabaseClientType {
  return {
    from: (table: string) => new MockQueryBuilder(table),
    rpc: async (fnName: string, params?: any) => {
      const fn = mockRpcFunctions[fnName];
      if (fn) {
        return fn(params);
      }
      return { data: null, error: null };
    },
    auth: mockAuth,
  };
}
