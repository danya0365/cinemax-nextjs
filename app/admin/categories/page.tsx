"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  icon: string;
  seriesCount: number;
  createdAt: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "โรแมนติก",
    name_en: "Romance",
    slug: "romance",
    icon: "💕",
    seriesCount: 45,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "ดราม่า",
    name_en: "Drama",
    slug: "drama",
    icon: "🎭",
    seriesCount: 38,
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "แอ็คชั่น",
    name_en: "Action",
    slug: "action",
    icon: "💥",
    seriesCount: 22,
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    name: "ตลก",
    name_en: "Comedy",
    slug: "comedy",
    icon: "😂",
    seriesCount: 18,
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    name: "ลึกลับ",
    name_en: "Mystery",
    slug: "mystery",
    icon: "🔍",
    seriesCount: 15,
    createdAt: "2024-01-01",
  },
  {
    id: "6",
    name: "แฟนตาซี",
    name_en: "Fantasy",
    slug: "fantasy",
    icon: "✨",
    seriesCount: 12,
    createdAt: "2024-01-01",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", name_en: "", icon: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    name_en: "",
    icon: "📁",
  });

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, name_en: cat.name_en, icon: cat.icon });
  };

  const handleSave = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              name: editForm.name,
              name_en: editForm.name_en,
              icon: editForm.icon,
            }
          : cat
      )
    );
    setEditingId(null);
  };

  const handleAdd = () => {
    const newCat: Category = {
      id: String(categories.length + 1),
      name: newCategory.name,
      name_en: newCategory.name_en,
      slug: newCategory.name_en.toLowerCase().replace(/\s+/g, "-"),
      icon: newCategory.icon,
      seriesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories([...categories, newCat]);
    setShowAddForm(false);
    setNewCategory({ name: "", name_en: "", icon: "📁" });
  };

  const handleDelete = (id: string) => {
    if (confirm("ต้องการลบหมวดหมู่นี้หรือไม่?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            จัดการหมวดหมู่
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการหมวดหมู่ซีรีย์ทั้งหมด
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          เพิ่มหมวดหมู่
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            เพิ่มหมวดหมู่ใหม่
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-center text-2xl"
              placeholder="📁"
              maxLength={2}
            />
            <input
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              placeholder="ชื่อภาษาไทย"
            />
            <input
              value={newCategory.name_en}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name_en: e.target.value })
              }
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              placeholder="English Name"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!newCategory.name || !newCategory.name_en}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                บันทึก
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            {editingId === cat.id ? (
              <div className="space-y-3">
                <input
                  value={editForm.icon}
                  onChange={(e) =>
                    setEditForm({ ...editForm, icon: e.target.value })
                  }
                  className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-2xl text-center"
                  maxLength={2}
                />
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
                <input
                  value={editForm.name_en}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name_en: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(cat.id)}
                    className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm"
                  >
                    บันทึก
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cat.name_en}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    /{cat.slug}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                    {cat.seriesCount} ซีรีย์
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
