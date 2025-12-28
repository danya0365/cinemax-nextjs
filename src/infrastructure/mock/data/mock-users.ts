// Mock Users Data
export interface MockUser {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  language_preference: "th" | "en" | "zh";
  subscription_type: "free" | "premium" | "vip";
  created_at: string;
  updated_at: string;
}

export interface MockUserPurchase {
  id: string;
  user_id: string;
  episode_id: string;
  amount: number;
  payment_method: "credit_card" | "promptpay" | "truemoney";
  transaction_id: string;
  status: "completed" | "pending" | "failed";
  purchased_at: string;
}

export interface MockWatchHistory {
  id: string;
  user_id: string;
  episode_id: string;
  series_id: string;
  progress: number; // percentage 0-100
  watched_at: string;
}

export interface MockUserFavorite {
  id: string;
  user_id: string;
  series_id: string;
  created_at: string;
}

// Mock current user
export const mockCurrentUser: MockUser = {
  id: "user-001",
  email: "demo@cinemax.com",
  username: "DemoUser",
  avatar: "https://picsum.photos/seed/user1/200/200",
  language_preference: "th",
  subscription_type: "premium",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-12-01T00:00:00Z",
};

export const mockUsers: MockUser[] = [
  mockCurrentUser,
  {
    id: "user-002",
    email: "user2@example.com",
    username: "MovieLover",
    avatar: "https://picsum.photos/seed/user2/200/200",
    language_preference: "th",
    subscription_type: "vip",
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-11-20T00:00:00Z",
  },
  {
    id: "user-003",
    email: "user3@example.com",
    username: "SeriesAddict",
    avatar: "https://picsum.photos/seed/user3/200/200",
    language_preference: "en",
    subscription_type: "free",
    created_at: "2024-03-10T00:00:00Z",
    updated_at: "2024-12-15T00:00:00Z",
  },
];

export const mockUserPurchases: MockUserPurchase[] = [
  {
    id: "purchase-001",
    user_id: "user-001",
    episode_id: "series-001-ep-002",
    amount: 19,
    payment_method: "promptpay",
    transaction_id: "TXN001",
    status: "completed",
    purchased_at: "2024-12-01T10:30:00Z",
  },
  {
    id: "purchase-002",
    user_id: "user-001",
    episode_id: "series-002-ep-002",
    amount: 15,
    payment_method: "credit_card",
    transaction_id: "TXN002",
    status: "completed",
    purchased_at: "2024-12-05T14:20:00Z",
  },
];

export const mockWatchHistory: MockWatchHistory[] = [
  {
    id: "history-001",
    user_id: "user-001",
    episode_id: "series-001-ep-001",
    series_id: "series-001",
    progress: 100,
    watched_at: "2024-12-01T08:00:00Z",
  },
  {
    id: "history-002",
    user_id: "user-001",
    episode_id: "series-002-ep-001",
    series_id: "series-002",
    progress: 75,
    watched_at: "2024-12-02T20:30:00Z",
  },
  {
    id: "history-003",
    user_id: "user-001",
    episode_id: "series-006-ep-001",
    series_id: "series-006",
    progress: 50,
    watched_at: "2024-12-20T19:00:00Z",
  },
];

export const mockUserFavorites: MockUserFavorite[] = [
  {
    id: "fav-001",
    user_id: "user-001",
    series_id: "series-001",
    created_at: "2024-11-15T00:00:00Z",
  },
  {
    id: "fav-002",
    user_id: "user-001",
    series_id: "series-006",
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "fav-003",
    user_id: "user-001",
    series_id: "series-007",
    created_at: "2024-12-10T00:00:00Z",
  },
];
