import type { SupabaseClient } from "@supabase/supabase-js";

export interface AdminCategory {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  icon: string;
  series_count: number;
  created_at: string;
}

export interface AdminCategoriesViewModel {
  categories: AdminCategory[];
}

export class AdminCategoriesPresenter {
  constructor(private readonly supabase: SupabaseClient) {}

  async getViewModel(): Promise<AdminCategoriesViewModel> {
    const categories = await this.getCategories();
    return { categories };
  }

  async getCategories(): Promise<AdminCategory[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    // Get series counts
    const categoriesWithCounts = await Promise.all(
      (data || []).map(async (cat) => {
        const { count } = await this.supabase
          .from("series")
          .select("*", { count: "exact", head: true })
          .eq("category_id", cat.id);

        return {
          id: cat.id,
          name: cat.name || "",
          name_en: cat.name_en || "",
          slug: cat.slug || "",
          icon: cat.icon || "📁",
          series_count: count || 0,
          created_at: cat.created_at,
        };
      })
    );

    return categoriesWithCounts;
  }

  async createCategory(data: {
    name: string;
    name_en: string;
    icon: string;
  }): Promise<boolean> {
    const slug = data.name_en.toLowerCase().replace(/\s+/g, "-");
    const { error } = await this.supabase.from("categories").insert({
      name: data.name,
      name_en: data.name_en,
      slug,
      icon: data.icon,
    });
    return !error;
  }

  async updateCategory(
    id: string,
    data: { name: string; name_en: string; icon: string }
  ): Promise<boolean> {
    const { error } = await this.supabase
      .from("categories")
      .update({
        name: data.name,
        name_en: data.name_en,
        icon: data.icon,
      })
      .eq("id", id);
    return !error;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from("categories")
      .delete()
      .eq("id", id);
    return !error;
  }

  generateMetadata() {
    return {
      title: "จัดการหมวดหมู่ | CINEMAX Admin",
      description: "จัดการหมวดหมู่ซีรีย์ทั้งหมด",
    };
  }
}
