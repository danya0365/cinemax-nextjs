"use client";

import {
  useSettingsPresenter,
  type Language,
  type Quality,
  type SettingsViewModel,
} from "@/src/presentation/presenters/profile/settings";
import { useAuthStore } from "@/src/presentation/stores";
import Link from "next/link";

interface SettingsViewProps {
  initialViewModel?: SettingsViewModel;
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

export function SettingsView({ initialViewModel }: SettingsViewProps) {
  const { user } = useAuthStore();
  const [state, actions] = useSettingsPresenter(
    user?.id || null,
    initialViewModel
  );
  const settings = state.viewModel?.settings;

  // Loading state
  if (state.loading && !settings) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-muted">กำลังโหลดการตั้งค่า...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !settings) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-2">เกิดข้อผิดพลาด</p>
          <p className="text-muted mb-4">{state.error}</p>
          <button
            onClick={() => user?.id && actions.loadData(user.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (!settings) return null;

  const handleSave = async () => {
    if (!user?.id) return;
    await actions.updateSettings(user.id, {
      language: settings.language,
      default_quality: settings.default_quality,
      auto_play: settings.auto_play,
      notifications_new_episodes: settings.notifications_new_episodes,
      notifications_recommendations: settings.notifications_recommendations,
      notifications_promotions: settings.notifications_promotions,
    });
  };

  return (
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

      {/* Success message */}
      {state.successMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          {state.successMessage}
        </div>
      )}

      {/* Error message */}
      {state.error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {state.error}
        </div>
      )}

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
                onClick={() => actions.setLanguage(lang.value as Language)}
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
            value={settings.default_quality}
            onChange={(e) => actions.setQuality(e.target.value as Quality)}
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
              <div className="text-sm text-muted">เล่นตอนถัดไปเมื่อดูจบ</div>
            </div>
            <input
              type="checkbox"
              checked={settings.auto_play}
              onChange={(e) => actions.setAutoPlay(e.target.checked)}
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
                key: "notifications_new_episodes",
                label: "ตอนใหม่",
                desc: "แจ้งเตือนเมื่อมีตอนใหม่ของซีรีย์ที่ติดตาม",
              },
              {
                key: "notifications_recommendations",
                label: "แนะนำซีรีย์",
                desc: "แนะนำซีรีย์ใหม่ที่อาจสนใจ",
              },
              {
                key: "notifications_promotions",
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
                    settings[item.key as keyof typeof settings] as boolean
                  }
                  onChange={(e) =>
                    actions.setNotificationPreference(
                      item.key,
                      e.target.checked
                    )
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
          disabled={state.saving}
          className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {state.saving ? (
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
  );
}
