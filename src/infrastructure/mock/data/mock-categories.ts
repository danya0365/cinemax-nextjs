// Mock Categories Data
export interface MockCategory {
  id: string;
  name: string;
  name_en: string | null;
  name_cn: string | null;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export const mockCategories: MockCategory[] = [
  {
    id: "cat-001",
    name: "โรแมนติก",
    name_en: "Romance",
    name_cn: "爱情",
    slug: "romance",
    description: "ซีรีย์แนวรักโรแมนติก",
    icon: "❤️",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-002",
    name: "ดราม่า",
    name_en: "Drama",
    name_cn: "剧情",
    slug: "drama",
    description: "ซีรีย์แนวดราม่า เข้มข้น อารมณ์",
    icon: "🎭",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-003",
    name: "แอคชั่น",
    name_en: "Action",
    name_cn: "动作",
    slug: "action",
    description: "ซีรีย์แนวแอคชั่น ต่อสู้ มันส์",
    icon: "💥",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-004",
    name: "คอมเมดี้",
    name_en: "Comedy",
    name_cn: "喜剧",
    slug: "comedy",
    description: "ซีรีย์แนวตลก ขำขัน",
    icon: "😂",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-005",
    name: "ระทึกขวัญ",
    name_en: "Thriller",
    name_cn: "惊悚",
    slug: "thriller",
    description: "ซีรีย์แนวระทึกขวัญ ลุ้นตลอด",
    icon: "😱",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-006",
    name: "แฟนตาซี",
    name_en: "Fantasy",
    name_cn: "奇幻",
    slug: "fantasy",
    description: "ซีรีย์แนวแฟนตาซี จินตนาการ",
    icon: "🧙",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-007",
    name: "ย้อนยุค",
    name_en: "Historical",
    name_cn: "古装",
    slug: "historical",
    description: "ซีรีย์แนวย้อนยุค ประวัติศาสตร์",
    icon: "🏯",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-008",
    name: "สืบสวน",
    name_en: "Mystery",
    name_cn: "悬疑",
    slug: "mystery",
    description: "ซีรีย์แนวสืบสวน ไขปริศนา",
    icon: "🔍",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];
