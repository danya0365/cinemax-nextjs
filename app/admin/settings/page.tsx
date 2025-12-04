"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "CINEMAX",
    siteDescription: "แพลตฟอร์มดูซีรีย์ออนไลน์ที่ดีที่สุด",
    contactEmail: "support@cinemax.com",
    defaultLanguage: "th",
    enableRegistration: true,
    enableGoogleLogin: true,
    maintenanceMode: false,
    defaultEpisodePrice: 29,
    freeEpisodesPerSeries: 1,
    maxUploadSize: 2048,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    alert("บันทึกการตั้งค่าสำเร็จ!");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ตั้งค่าระบบ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            จัดการการตั้งค่าทั่วไปของระบบ
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            "บันทึกการตั้งค่า"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ข้อมูลเว็บไซต์
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ชื่อเว็บไซต์
              </label>
              <input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                คำอธิบายเว็บไซต์
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                อีเมลติดต่อ
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ภาษาเริ่มต้น
              </label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) =>
                  setSettings({ ...settings, defaultLanguage: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="th">ภาษาไทย</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            การยืนยันตัวตน
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  เปิดให้สมัครสมาชิก
                </span>
                <p className="text-sm text-gray-500">
                  อนุญาตให้ผู้ใช้ใหม่สมัครสมาชิก
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableRegistration: e.target.checked,
                  })
                }
                className="w-5 h-5 text-red-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  เข้าสู่ระบบด้วย Google
                </span>
                <p className="text-sm text-gray-500">
                  อนุญาตให้เข้าสู่ระบบผ่าน Google OAuth
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableGoogleLogin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableGoogleLogin: e.target.checked,
                  })
                }
                className="w-5 h-5 text-red-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50">
              <div>
                <span className="font-medium text-yellow-800 dark:text-yellow-200">
                  โหมดปิดปรับปรุง
                </span>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  ปิดเว็บไซต์ชั่วคราวเพื่อปรับปรุง
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenanceMode: e.target.checked,
                  })
                }
                className="w-5 h-5 text-yellow-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Content Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            การตั้งค่าเนื้อหา
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ราคาตอนเริ่มต้น (บาท)
              </label>
              <input
                type="number"
                value={settings.defaultEpisodePrice}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultEpisodePrice: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                จำนวนตอนฟรีต่อซีรีย์
              </label>
              <input
                type="number"
                value={settings.freeEpisodesPerSeries}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    freeEpisodesPerSeries: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                จำนวนตอนแรกที่ให้ดูฟรี
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ขนาดอัปโหลดสูงสุด (MB)
              </label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxUploadSize: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-red-200 dark:border-red-900/50">
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            ⚠️ Danger Zone
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                ล้างแคช
              </h3>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                ล้างแคชทั้งหมดของระบบ
              </p>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                ล้างแคช
              </button>
            </div>

            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                รีเซ็ตระบบ
              </h3>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                รีเซ็ตการตั้งค่าทั้งหมดเป็นค่าเริ่มต้น
              </p>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                รีเซ็ตการตั้งค่า
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
