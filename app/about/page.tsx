import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | CINEMAX",
  description:
    "รู้จักกับ CINEMAX แพลตฟอร์มสตรีมมิ่งซีรีย์ไมโครดราม่าที่ดีที่สุด",
};

const stats = [
  { value: "1M+", label: "ผู้ใช้งาน" },
  { value: "500+", label: "ซีรีย์" },
  { value: "10K+", label: "ตอน" },
  { value: "3", label: "ภาษา" },
];

const features = [
  {
    icon: "🎬",
    title: "เนื้อหาคุณภาพ",
    description: "ซีรีย์คัดสรรจากทั่วโลก อัปเดตใหม่ทุกสัปดาห์",
  },
  {
    icon: "📱",
    title: "ดูได้ทุกที่",
    description: "รองรับทุกอุปกรณ์ ดูต่อจากที่ค้างไว้ได้",
  },
  {
    icon: "💎",
    title: "ตอนแรกฟรี",
    description: "ทดลองดูตอนแรกฟรีทุกเรื่อง ก่อนตัดสินใจ",
  },
  {
    icon: "🌍",
    title: "หลายภาษา",
    description: "รองรับ ไทย อังกฤษ และจีน พร้อมซับไตเติ้ล",
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-linear-to-br from-red-600 via-red-500 to-orange-500 py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CINEMAX</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              แพลตฟอร์มสตรีมมิ่งซีรีย์ไมโครดราม่าที่ดีที่สุดในประเทศไทย
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 -mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface border border-border rounded-xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              เรื่องราวของเรา
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg">
              <p>
                CINEMAX
                ก่อตั้งขึ้นด้วยความเชื่อว่าทุกคนควรได้เข้าถึงความบันเทิงคุณภาพ
                เราเริ่มต้นจากทีมเล็กๆ ที่หลงใหลในซีรีย์
                และเติบโตขึ้นมาเป็นแพลตฟอร์มที่มีผู้ใช้งานกว่าล้านคน
              </p>
              <p>
                เรามุ่งมั่นที่จะนำเสนอซีรีย์ไมโครดราม่าที่ดีที่สุดจากทั่วโลก
                ด้วยรูปแบบที่เหมาะกับไลฟ์สไตล์คนรุ่นใหม่ - สั้น กระชับ
                แต่เข้มข้น
              </p>
              <p>
                โมเดล &ldquo;ตอนแรกฟรี&rdquo;
                ของเราทำให้ผู้ใช้สามารถทดลองดูก่อนตัดสินใจ
                ไม่มีการบังคับสมัครสมาชิกรายเดือน จ่ายเฉพาะเนื้อหาที่อยากดู
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted-light dark:bg-muted-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              ทำไมต้อง CINEMAX
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-surface border border-border rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              พร้อมเริ่มดูแล้วหรือยัง?
            </h2>
            <p className="text-muted mb-8">
              สมัครสมาชิกฟรี เริ่มดูซีรีย์ได้ทันที
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                สมัครสมาชิกฟรี
              </Link>
              <Link
                href="/series"
                className="px-8 py-3 bg-surface border border-border hover:border-red-500 text-foreground font-semibold rounded-lg transition-colors"
              >
                ดูซีรีย์ทั้งหมด
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
