"use client";

import { MainLayout } from "@/src/presentation/components";
import { useAuthStore } from "@/src/presentation/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  username: z
    .string()
    .min(3, "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร")
    .max(20, "ชื่อผู้ใช้ต้องไม่เกิน 20 ตัวอักษร")
    .regex(/^[a-zA-Z0-9_]+$/, "ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _"),
  language: z.enum(["th", "en", "cn"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoading, initialize } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      language: "th",
    },
  });

  useEffect(() => {
    setMounted(true);
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (user) {
      reset({
        username:
          user.user_metadata?.username || user.email?.split("@")[0] || "",
        language: "th",
      });
    }
  }, [user, reset]);

  if (!mounted || isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    router.push("/auth/login?redirectTo=/profile/edit");
    return null;
  }

  const displayName =
    user.user_metadata?.username || user.email?.split("@")[0] || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // TODO: Implement actual profile update
      console.log("Updating profile:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/profile"
              className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">แก้ไขโปรไฟล์</h1>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-4xl font-bold">
                  {avatarLetter}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-surface border border-border rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-muted mt-2">
                คลิกเพื่อเปลี่ยนรูปโปรไฟล์
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-lg bg-muted-light dark:bg-muted-dark border border-border text-muted cursor-not-allowed"
                />
                <p className="text-xs text-muted mt-1">
                  ไม่สามารถเปลี่ยนอีเมลได้
                </p>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  ชื่อผู้ใช้
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className={`w-full px-4 py-3 rounded-lg bg-surface border ${
                    errors.username ? "border-red-500" : "border-border"
                  } text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors`}
                  placeholder="username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Language */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  ภาษาที่ต้องการ
                </label>
                <select
                  id="language"
                  {...register("language")}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                  <option value="cn">中文</option>
                </select>
              </div>

              {/* Success Message */}
              {saveSuccess && (
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  บันทึกโปรไฟล์เรียบร้อยแล้ว
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    "บันทึกการเปลี่ยนแปลง"
                  )}
                </button>
                <Link
                  href="/profile"
                  className="px-6 py-3 bg-surface border border-border hover:border-red-500 text-foreground font-medium rounded-lg transition-colors"
                >
                  ยกเลิก
                </Link>
              </div>
            </form>

            {/* Danger Zone */}
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                โซนอันตราย
              </h2>
              <div className="p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
                <h3 className="font-medium text-foreground mb-2">ลบบัญชี</h3>
                <p className="text-sm text-muted mb-4">
                  การลบบัญชีจะทำให้ข้อมูลทั้งหมดของคุณหายไปอย่างถาวร
                  รวมถึงประวัติการรับชมและรายการโปรด
                </p>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                  ลบบัญชีของฉัน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
