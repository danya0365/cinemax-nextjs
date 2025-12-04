import type { Category } from "@/src/domain/types";
import { NextResponse } from "next/server";

// Mock categories
const mockCategories: (Category & { seriesCount: number })[] = [
  {
    id: "1",
    name: "โรแมนติก",
    name_en: "Romance",
    name_cn: "浪漫",
    slug: "romance",
    icon: "💕",
    seriesCount: 45,
  },
  {
    id: "2",
    name: "แอ็คชั่น",
    name_en: "Action",
    name_cn: "动作",
    slug: "action",
    icon: "💥",
    seriesCount: 32,
  },
  {
    id: "3",
    name: "ตลก",
    name_en: "Comedy",
    name_cn: "喜剧",
    slug: "comedy",
    icon: "😂",
    seriesCount: 28,
  },
  {
    id: "4",
    name: "ดราม่า",
    name_en: "Drama",
    name_cn: "戏剧",
    slug: "drama",
    icon: "🎭",
    seriesCount: 56,
  },
  {
    id: "5",
    name: "แฟนตาซี",
    name_en: "Fantasy",
    name_cn: "奇幻",
    slug: "fantasy",
    icon: "✨",
    seriesCount: 23,
  },
  {
    id: "6",
    name: "สยองขวัญ",
    name_en: "Horror",
    name_cn: "恐怖",
    slug: "horror",
    icon: "👻",
    seriesCount: 18,
  },
  {
    id: "7",
    name: "ไมโครดราม่า",
    name_en: "Micro Drama",
    name_cn: "微短剧",
    slug: "micro-drama",
    icon: "📱",
    seriesCount: 67,
  },
  {
    id: "8",
    name: "ซีรีย์แนวตั้ง",
    name_en: "Vertical Series",
    name_cn: "竖屏剧",
    slug: "vertical",
    icon: "📲",
    seriesCount: 41,
  },
];

export async function GET() {
  return NextResponse.json({
    data: mockCategories,
    meta: {
      total: mockCategories.length,
    },
  });
}
