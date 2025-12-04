"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const episodeSchema = z.object({
  series_id: z.string().min(1, "กรุณาเลือกซีรีย์"),
  episode_number: z.number().min(1, "ตอนที่ต้องมากกว่า 0"),
  title: z.string().min(1, "กรุณากรอกชื่อตอน"),
  description: z.string().optional(),
  is_free: z.boolean(),
  price: z.number().min(0),
  status: z.enum(["draft", "processing", "published"]),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

const mockSeries = [
  { id: "1", title: "รักข้ามเวลา", episodes: 16 },
  { id: "2", title: "มหากาพย์รัก", episodes: 24 },
  { id: "3", title: "ความลับที่ซ่อนไว้", episodes: 12 },
];

export default function UploadEpisodePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
    defaultValues: {
      is_free: false,
      price: 29,
      status: "draft",
      episode_number: 1,
    },
  });

  const isFree = watch("is_free");
  const selectedSeriesId = watch("series_id");
  const selectedSeries = mockSeries.find((s) => s.id === selectedSeriesId);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const onSubmit = async (data: EpisodeFormData) => {
    if (!videoFile) {
      alert("กรุณาเลือกไฟล์วิดีโอ");
      return;
    }

    setIsSubmitting(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setUploadProgress(i);
    }

    console.log("Form data:", data);
    console.log("Video:", videoFile);
    console.log("Thumbnail:", thumbnailFile);

    setIsSubmitting(false);
    setUploadProgress(0);
    alert("อัปโหลดตอนสำเร็จ!");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/episodes"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            อัปโหลดตอนใหม่
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            เพิ่มตอนใหม่ให้ซีรีย์
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ไฟล์วิดีโอ
              </h2>

              <div className="space-y-4">
                <label className="block">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      videoFile
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-red-500"
                    }`}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                    {videoFile ? (
                      <div>
                        <span className="text-4xl">✅</span>
                        <p className="mt-2 font-medium text-gray-900 dark:text-white">
                          {videoFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl">🎬</span>
                        <p className="mt-2 font-medium text-gray-900 dark:text-white">
                          คลิกเพื่อเลือกไฟล์วิดีโอ
                        </p>
                        <p className="text-sm text-gray-500">
                          MP4, MOV, AVI (สูงสุด 2GB)
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {isSubmitting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        กำลังอัปโหลด...
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Episode Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ข้อมูลตอน
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ซีรีย์ *
                    </label>
                    <select
                      {...register("series_id")}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    >
                      <option value="">เลือกซีรีย์</option>
                      {mockSeries.map((series) => (
                        <option key={series.id} value={series.id}>
                          {series.title}
                        </option>
                      ))}
                    </select>
                    {errors.series_id && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.series_id.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ตอนที่ *
                    </label>
                    <input
                      {...register("episode_number", { valueAsNumber: true })}
                      type="number"
                      min={1}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />
                    {selectedSeries && (
                      <p className="text-xs text-gray-500 mt-1">
                        ซีรีย์นี้มี {selectedSeries.episodes} ตอน
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ชื่อตอน *
                  </label>
                  <input
                    {...register("title")}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    placeholder="เช่น จุดเริ่มต้นของเรื่องราว"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    คำอธิบาย
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white resize-none"
                    placeholder="เขียนเรื่องย่อของตอนนี้..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ภาพปก
              </h2>

              <label className="block cursor-pointer">
                <div
                  className={`aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                    thumbnailFile
                      ? "border-green-500"
                      : "border-gray-300 dark:border-gray-600 hover:border-red-500"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  {thumbnailFile ? (
                    <div className="text-center p-4">
                      <span className="text-2xl">✅</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate max-w-full px-2">
                        {thumbnailFile.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <span className="text-2xl">🖼️</span>
                      <p className="text-sm text-gray-500 mt-1">อัปโหลดภาพปก</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                การตั้งราคา
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer">
                  <input
                    {...register("is_free")}
                    type="checkbox"
                    className="w-5 h-5 text-red-600 rounded"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ตอนฟรี
                    </span>
                    <p className="text-xs text-gray-500">ให้ดูฟรีไม่ต้องซื้อ</p>
                  </div>
                </label>

                {!isFree && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ราคา (บาท)
                    </label>
                    <input
                      {...register("price", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                สถานะ
              </h2>

              <select
                {...register("status")}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="draft">แบบร่าง</option>
                <option value="processing">กำลังประมวลผล</option>
                <option value="published">เผยแพร่ทันที</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/admin/episodes"
            className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            ยกเลิก
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                กำลังอัปโหลด...
              </>
            ) : (
              <>
                <span>📤</span>
                อัปโหลดตอน
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
