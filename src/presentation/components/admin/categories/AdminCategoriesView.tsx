"use client";

import {
  useAdminCategoriesPresenter,
  type AdminCategoriesViewModel,
} from "@/src/presentation/presenters/admin/categories";
import { useState } from "react";

interface AdminCategoriesViewProps {
  initialViewModel?: AdminCategoriesViewModel;
}

export function AdminCategoriesView({
  initialViewModel,
}: AdminCategoriesViewProps) {
  const [state, actions] = useAdminCategoriesPresenter(initialViewModel);
  const categories = state.viewModel?.categories || [];

  const [editForm, setEditForm] = useState({ name: "", name_en: "", icon: "" });
  const [newCategory, setNewCategory] = useState({
    name: "",
    name_en: "",
    icon: "📁",
  });

  if (state.loading && !state.viewModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  const handleEdit = (cat: {
    id: string;
    name: string;
    name_en: string;
    icon: string;
  }) => {
    actions.setEditingId(cat.id);
    setEditForm({ name: cat.name, name_en: cat.name_en, icon: cat.icon });
  };

  const handleSave = (id: string) => {
    actions.updateCategory(id, editForm);
  };

  const handleAdd = () => {
    actions.createCategory(newCategory);
    setNewCategory({ name: "", name_en: "", icon: "📁" });
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
          onClick={() => actions.setShowAddForm(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          เพิ่มหมวดหมู่
        </button>
      </div>

      {/* Add Form */}
      {state.showAddForm && (
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
                onClick={() => actions.setShowAddForm(false)}
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
            {state.editingId === cat.id ? (
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
                    onClick={() => actions.setEditingId(null)}
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
                      onClick={() => {
                        if (confirm("ต้องการลบหมวดหมู่นี้?")) {
                          actions.deleteCategory(cat.id);
                        }
                      }}
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
                    {cat.series_count} ซีรีย์
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
