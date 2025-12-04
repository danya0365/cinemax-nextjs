"use client";

import { MainLayout } from "@/src/presentation/components";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Language = "th" | "en" | "zh";
type Quality = "auto" | "1080p" | "720p" | "480p";

interface Settings {
  language: Language;
  defaultQuality: Quality;
  autoPlay: boolean;
  notifications: {
    newEpisodes: boolean;
    recommendations: boolean;
    promotions: boolean;
  };
}

const languages = [
  { value: "th", label: "ภาษาไทย", flag: "🇹🇭" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
];

const qualities = [
  { value: "auto", label: "อัตโนมัติ" },
  { value: "1080p", label: "1080p (Full HD)" },
  { value: "720p", label: "720p (HD)" },
  { value: "480p", label: "480p (SD)" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, isInitialized, isLoading: authLoading } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    language: "th",
    defaultQuality: "auto",
    autoPlay: true,
    notifications: {
      newEpisodes: true,
      recommendations: true,
      promotions: false,
    },
  });

  useEffect(() => {
    if (isInitialized && !authLoading && !user) {
      router.push("/auth/login");
    }
  }, [isInitialized, authLoading, user, router]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    // Show success (would use toast in real app)
    alert("บันทึกการตั้งค่าเรียบร้อย");
  };

  if (!isInitialized || authLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) return null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/profile"
              className="p-2 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
            >
              <svg
                className="w-5 h-5 text-muted"
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
            <h1 className="text-2xl font-bold text-foreground">ตั้งค่า</h1>
          </div>

          <div className="space-y-6">
            {/* Language */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                ภาษา
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        language: lang.value as Language,
                      })
                    }
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      settings.language === lang.value
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-border hover:border-red-500"
                    }`}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <div className="text-sm text-foreground">{lang.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Quality */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                คุณภาพวิดีโอ
              </h2>
              <select
                value={settings.defaultQuality}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultQuality: e.target.value as Quality,
                  })
                }
                className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {qualities.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted mt-2">
                เลือกคุณภาพเริ่มต้นสำหรับการเล่นวิดีโอ
              </p>
            </div>

            {/* Playback */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                การเล่น
              </h2>
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark cursor-pointer">
                <div>
                  <div className="font-medium text-foreground">
                    เล่นตอนถัดไปอัตโนมัติ
                  </div>
                  <div className="text-sm text-muted">
                    เล่นตอนถัดไปเมื่อดูจบ
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoPlay}
                  onChange={(e) =>
                    setSettings({ ...settings, autoPlay: e.target.checked })
                  }
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
              </label>
            </div>

            {/* Notifications */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                การแจ้งเตือน
              </h2>
              <div className="space-y-2">
                {[
                  {
                    key: "newEpisodes",
                    label: "ตอนใหม่",
                    desc: "แจ้งเตือนเมื่อมีตอนใหม่ของซีรีย์ที่ติดตาม",
                  },
                  {
                    key: "recommendations",
                    label: "แนะนำซีรีย์",
                    desc: "แนะนำซีรีย์ใหม่ที่อาจสนใจ",
                  },
                  {
                    key: "promotions",
                    label: "โปรโมชั่น",
                    desc: "ข่าวสารและโปรโมชั่นพิเศษ",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted-light dark:hover:bg-muted-dark cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm text-muted">{item.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        settings.notifications[
                          item.key as keyof typeof settings.notifications
                        ]
                      }
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [item.key]: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                "บันทึกการตั้งค่า"
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
