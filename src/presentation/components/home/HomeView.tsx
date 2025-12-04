"use client";

import {
  useHomePresenter,
  type HomeViewModel,
} from "@/src/presentation/presenters/home";
import Image from "next/image";
import Link from "next/link";

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

// Format view count
const formatViews = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
};

export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state, actions] = useHomePresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Loading state
  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-muted">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !viewModel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium mb-2">เกิดข้อผิดพลาด</p>
          <p className="text-muted mb-4">{state.error}</p>
          <button
            onClick={actions.loadData}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const featuredSeries = viewModel?.featuredSeries[0];
  const trendingSeries = viewModel?.trendingSeries || [];
  const categories = viewModel?.categories || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-linear-to-br from-gray-900 via-gray-800 to-red-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-red-600 rounded-full">
                ตอนแรกดูฟรี!
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ดูซีรีย์ไมโครดราม่า
                <br />
                <span className="text-red-500">ที่ดีที่สุด</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                สตรีมซีรีย์ไมโครดราม่า ซีรีย์แนวตั้ง ซีรีย์สั้น
                หลากหลายแนวได้ทุกที่ทุกเวลา ตอนแรกดูฟรี!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/series"
                  className="px-8 py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  เริ่มดูเลย
                </Link>
                <Link
                  href="/auth/register"
                  className="px-8 py-3 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </div>

            {/* Hero Featured Card */}
            {featuredSeries && (
              <div className="hidden lg:block">
                <Link
                  href={`/series/${featuredSeries.id}`}
                  className="relative group block"
                >
                  <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                    <div className="aspect-video relative">
                      {featuredSeries.poster ? (
                        <Image
                          src={featuredSeries.poster}
                          alt={featuredSeries.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <span className="text-6xl">🎬</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-white font-medium">
                          {featuredSeries.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">
                          {featuredSeries.total_episodes} ตอน
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {featuredSeries.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {featuredSeries.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                ซีรีย์ยอดนิยมวันนี้
              </h2>
              <p className="text-muted mt-1">เรื่องที่คนดูมากที่สุด</p>
            </div>
            <Link
              href="/series?sort=popular"
              className="hidden sm:flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              ดูทั้งหมด
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingSeries.slice(0, 5).map((series, index) => (
              <Link
                key={series.id}
                href={`/series/${series.id}`}
                className="group relative"
              >
                <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-red-600 rounded-lg">
                      {index + 1}
                    </span>
                  </div>

                  {series.thumbnail ? (
                    <Image
                      src={series.thumbnail}
                      alt={series.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors line-clamp-1">
                    {series.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {series.rating.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span>{series.total_episodes} ตอน</span>
                    <span>•</span>
                    <span>{formatViews(series.view_count)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              หมวดหมู่ซีรีย์
            </h2>
            <p className="text-muted">เลือกชมซีรีย์ตามประเภทที่คุณชอบ</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group p-6 bg-background rounded-xl border border-border hover:border-red-500 hover:shadow-lg transition-all text-center"
              >
                <span className="text-4xl block mb-3">
                  {category.icon || "🎬"}
                </span>
                <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-red-600 to-red-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            พร้อมเริ่มดูแล้วหรือยัง?
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            สมัครสมาชิกวันนี้และเริ่มดูซีรีย์ไมโครดราม่าคุณภาพสูงได้ทันที
            ตอนแรกของทุกเรื่องดูฟรี!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 text-lg font-semibold bg-white text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              สมัครสมาชิกฟรี
            </Link>
            <Link
              href="/series"
              className="px-8 py-3 text-lg font-semibold bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-lg transition-colors"
            >
              ดูซีรีย์ทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-3xl">▶️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                ตอนแรกดูฟรี
              </h3>
              <p className="text-muted">
                ลองดูตอนแรกฟรีทุกเรื่อง ก่อนตัดสินใจซื้อตอนถัดไป
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                ดูได้ทุกที่
              </h3>
              <p className="text-muted">
                รองรับทุกอุปกรณ์ ดูได้ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-3xl">🌏</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                รองรับหลายภาษา
              </h3>
              <p className="text-muted">
                รองรับ 3 ภาษา ไทย อังกฤษ และจีน สำหรับผู้ชมทั่วโลก
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
