// Mock Series Data
import { mockCategories } from "./mock-categories";

export interface MockSeries {
  id: string;
  title: string;
  title_en: string | null;
  title_cn: string | null;
  description: string;
  thumbnail: string | null;
  poster: string | null;
  category_id: string | null;
  total_episodes: number;
  release_date: string | null;
  status: "ongoing" | "completed" | "upcoming";
  view_count: number;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: (typeof mockCategories)[0];
}

// Poster images from picsum for demo
const posterBase = "https://picsum.photos/seed";

export const mockSeries: MockSeries[] = [
  {
    id: "series-001",
    title: "รักข้ามเวลา",
    title_en: "Love Through Time",
    title_cn: "穿越时空的爱",
    description:
      "เรื่องราวความรักของหญิงสาวที่ย้อนเวลากลับไปพบรักแท้ในอดีต ผจญภัยผ่านกาลเวลาเพื่อค้นหาความรักที่แท้จริง",
    thumbnail: `${posterBase}/series1-thumb/400/225`,
    poster: `${posterBase}/series1/300/450`,
    category_id: "cat-001",
    total_episodes: 24,
    release_date: "2024-03-15",
    status: "ongoing",
    view_count: 1250000,
    rating: 4.8,
    is_featured: true,
    created_at: "2024-03-15T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "series-002",
    title: "เล่ห์รักซาตาน",
    title_en: "Devil's Game of Love",
    title_cn: "恶魔的爱情游戏",
    description:
      "CEO หนุ่มผู้เย็นชาพบรักกับสาวน้อยธรรมดา เกมรักที่ซับซ้อนเริ่มต้นขึ้น ใครจะเป็นผู้ชนะ?",
    thumbnail: `${posterBase}/series2-thumb/400/225`,
    poster: `${posterBase}/series2/300/450`,
    category_id: "cat-002",
    total_episodes: 30,
    release_date: "2024-02-01",
    status: "completed",
    view_count: 2100000,
    rating: 4.9,
    is_featured: true,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-08-30T00:00:00Z",
  },
  {
    id: "series-003",
    title: "นักรบแดนสวรรค์",
    title_en: "Heaven's Warriors",
    title_cn: "天堂战士",
    description:
      "เหล่านักรบผู้ถูกเลือกต้องต่อสู้เพื่อปกป้องโลกจากเหล่าปีศาจ แอคชั่นมันส์ๆ รวมพลังต่อสู้",
    thumbnail: `${posterBase}/series3-thumb/400/225`,
    poster: `${posterBase}/series3/300/450`,
    category_id: "cat-003",
    total_episodes: 40,
    release_date: "2024-01-10",
    status: "ongoing",
    view_count: 1800000,
    rating: 4.7,
    is_featured: true,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-12-15T00:00:00Z",
  },
  {
    id: "series-004",
    title: "รักวุ่นวายของคุณครู",
    title_en: "Teacher's Chaotic Love",
    title_cn: "老师的混乱爱情",
    description:
      "คอมเมดี้รักโรแมนติกของอาจารย์มหาลัยหนุ่มหล่อกับนักศึกษาสาวซุ่มซ่าม เรื่องราวขำๆ ที่จะทำให้คุณยิ้ม",
    thumbnail: `${posterBase}/series4-thumb/400/225`,
    poster: `${posterBase}/series4/300/450`,
    category_id: "cat-004",
    total_episodes: 20,
    release_date: "2024-04-20",
    status: "completed",
    view_count: 980000,
    rating: 4.5,
    is_featured: false,
    created_at: "2024-04-20T00:00:00Z",
    updated_at: "2024-07-15T00:00:00Z",
  },
  {
    id: "series-005",
    title: "เงามรณะ",
    title_en: "Shadow of Death",
    title_cn: "死亡阴影",
    description:
      "ระทึกขวัญปริศนาฆาตกรต่อเนื่อง นักสืบหนุ่มต้องไขคดีก่อนเหยื่อรายต่อไป เกมล่าที่ลุ้นระทึก",
    thumbnail: `${posterBase}/series5-thumb/400/225`,
    poster: `${posterBase}/series5/300/450`,
    category_id: "cat-005",
    total_episodes: 16,
    release_date: "2024-05-01",
    status: "completed",
    view_count: 1500000,
    rating: 4.8,
    is_featured: true,
    created_at: "2024-05-01T00:00:00Z",
    updated_at: "2024-08-20T00:00:00Z",
  },
  {
    id: "series-006",
    title: "เทพบุตรจอมอสูร",
    title_en: "Son of the Demon",
    title_cn: "恶魔之子",
    description:
      "แฟนตาซีสุดอลังการ เรื่องราวของเจ้าชายครึ่งเทพครึ่งอสูรที่ต้องเลือกข้างในสงครามระหว่างสองโลก",
    thumbnail: `${posterBase}/series6-thumb/400/225`,
    poster: `${posterBase}/series6/300/450`,
    category_id: "cat-006",
    total_episodes: 50,
    release_date: "2024-06-15",
    status: "ongoing",
    view_count: 2500000,
    rating: 4.9,
    is_featured: true,
    created_at: "2024-06-15T00:00:00Z",
    updated_at: "2024-12-20T00:00:00Z",
  },
  {
    id: "series-007",
    title: "ตำนานราชวงศ์ฟ้า",
    title_en: "Legend of the Sky Dynasty",
    title_cn: "天朝传奇",
    description:
      "ซีรีย์ย้อนยุคสุดอลังการ เรื่องราวของหญิงสามัญชนที่ก้าวขึ้นเป็นฮองเฮาผู้ยิ่งใหญ่",
    thumbnail: `${posterBase}/series7-thumb/400/225`,
    poster: `${posterBase}/series7/300/450`,
    category_id: "cat-007",
    total_episodes: 60,
    release_date: "2024-07-01",
    status: "ongoing",
    view_count: 3200000,
    rating: 4.9,
    is_featured: true,
    created_at: "2024-07-01T00:00:00Z",
    updated_at: "2024-12-25T00:00:00Z",
  },
  {
    id: "series-008",
    title: "ปริศนาคฤหาสน์ร้าง",
    title_en: "Mystery of the Abandoned Mansion",
    title_cn: "废弃豪宅之谜",
    description:
      "กลุ่มเพื่อนติดอยู่ในคฤหาสน์เก่าลึกลับ ต้องไขปริศนาเพื่อหนีออกมา ใครจะรอด?",
    thumbnail: `${posterBase}/series8-thumb/400/225`,
    poster: `${posterBase}/series8/300/450`,
    category_id: "cat-008",
    total_episodes: 12,
    release_date: "2024-08-10",
    status: "completed",
    view_count: 890000,
    rating: 4.6,
    is_featured: false,
    created_at: "2024-08-10T00:00:00Z",
    updated_at: "2024-10-30T00:00:00Z",
  },
  {
    id: "series-009",
    title: "หัวใจเจ้าชายน้ำแข็ง",
    title_en: "Heart of the Ice Prince",
    title_cn: "冰王子的心",
    description:
      "เรื่องราวของ CEO หนุ่มเย็นชาที่หัวใจละลายเพราะเลขาสาวร่าเริง รักหวานๆ ที่จะทำให้คุณฟิน",
    thumbnail: `${posterBase}/series9-thumb/400/225`,
    poster: `${posterBase}/series9/300/450`,
    category_id: "cat-001",
    total_episodes: 26,
    release_date: "2024-09-05",
    status: "ongoing",
    view_count: 1100000,
    rating: 4.7,
    is_featured: false,
    created_at: "2024-09-05T00:00:00Z",
    updated_at: "2024-12-10T00:00:00Z",
  },
  {
    id: "series-010",
    title: "สงครามรักแย่งบัลลังก์",
    title_en: "War for the Throne",
    title_cn: "夺位之战",
    description:
      "ดราม่าหนักๆ เรื่องราวการแย่งชิงอำนาจในตระกูลมหาเศรษฐี รัก แค้น ทรยศ ทุกอย่างรวมอยู่ที่นี่",
    thumbnail: `${posterBase}/series10-thumb/400/225`,
    poster: `${posterBase}/series10/300/450`,
    category_id: "cat-002",
    total_episodes: 35,
    release_date: "2024-10-01",
    status: "ongoing",
    view_count: 1750000,
    rating: 4.8,
    is_featured: true,
    created_at: "2024-10-01T00:00:00Z",
    updated_at: "2024-12-22T00:00:00Z",
  },
  {
    id: "series-011",
    title: "ทีมนักสู้พิทักษ์โลก",
    title_en: "Earth Protector Squad",
    title_cn: "地球守护者",
    description:
      "ทีมฮีโร่รวมพลต่อสู้กับเหล่าวายร้ายต่างดาว แอคชั่นมันส์ๆ CGI อลังการ",
    thumbnail: `${posterBase}/series11-thumb/400/225`,
    poster: `${posterBase}/series11/300/450`,
    category_id: "cat-003",
    total_episodes: 28,
    release_date: "2024-11-01",
    status: "ongoing",
    view_count: 920000,
    rating: 4.5,
    is_featured: false,
    created_at: "2024-11-01T00:00:00Z",
    updated_at: "2024-12-18T00:00:00Z",
  },
  {
    id: "series-012",
    title: "คู่กัดคู่หมั้น",
    title_en: "Enemies to Lovers",
    title_cn: "冤家变恋人",
    description:
      "คอมเมดี้โรแมนติกของคู่ศัตรูวัยเด็กที่ถูกบังคับให้หมั้นกัน จะรักหรือจะเกลียด ลุ้นกันเอง!",
    thumbnail: `${posterBase}/series12-thumb/400/225`,
    poster: `${posterBase}/series12/300/450`,
    category_id: "cat-004",
    total_episodes: 18,
    release_date: "2024-12-01",
    status: "upcoming",
    view_count: 500000,
    rating: 4.6,
    is_featured: true,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-25T00:00:00Z",
  },
];

// Helper function to add category relation to series
export function getSeriesWithCategory(): MockSeries[] {
  return mockSeries.map((series) => ({
    ...series,
    category: mockCategories.find((cat) => cat.id === series.category_id),
  }));
}
