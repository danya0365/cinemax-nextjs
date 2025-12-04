import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "แพ็คเกจสมาชิก | CINEMAX",
  description: "เลือกแพ็คเกจที่เหมาะกับคุณ ดูซีรีย์ไม่จำกัด",
};

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  discount?: number;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "ฟรี",
    price: 0,
    period: "ตลอดชีพ",
    description: "เริ่มต้นดูซีรีย์ฟรี",
    features: ["ดูตอนแรกฟรีทุกเรื่อง", "คุณภาพ 720p", "มีโฆษณา", "1 อุปกรณ์"],
  },
  {
    id: "basic",
    name: "Basic",
    price: 99,
    period: "เดือน",
    description: "สำหรับผู้เริ่มต้น",
    features: [
      "ดูซีรีย์ไม่จำกัด",
      "คุณภาพ 1080p",
      "ไม่มีโฆษณา",
      "2 อุปกรณ์พร้อมกัน",
      "ดาวน์โหลดได้ 5 เรื่อง",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    period: "เดือน",
    description: "ประสบการณ์ที่ดีที่สุด",
    features: [
      "ดูซีรีย์ไม่จำกัด",
      "คุณภาพ 4K Ultra HD",
      "ไม่มีโฆษณา",
      "4 อุปกรณ์พร้อมกัน",
      "ดาวน์โหลดได้ไม่จำกัด",
      "ดูก่อนใคร 24 ชม.",
      "เนื้อหาพิเศษ",
    ],
    popular: true,
  },
  {
    id: "yearly",
    name: "รายปี",
    price: 1990,
    period: "ปี",
    description: "ประหยัดสุดคุ้ม",
    discount: 17,
    features: [
      "ทุกฟีเจอร์ Premium",
      "ประหยัด 2 เดือน",
      "ของขวัญพิเศษ",
      "สิทธิ์ VIP Events",
    ],
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`relative rounded-2xl p-6 ${
        plan.popular
          ? "bg-red-600 text-white ring-4 ring-red-600/30"
          : "bg-surface border border-border"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
          ยอดนิยม
        </div>
      )}

      {/* Discount Badge */}
      {plan.discount && (
        <div className="absolute -top-3 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          ประหยัด {plan.discount}%
        </div>
      )}

      {/* Plan Name */}
      <h3
        className={`text-xl font-bold mb-2 ${
          plan.popular ? "text-white" : "text-foreground"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`text-sm mb-4 ${
          plan.popular ? "text-white/80" : "text-muted"
        }`}
      >
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-6">
        <span
          className={`text-4xl font-bold ${
            plan.popular ? "text-white" : "text-foreground"
          }`}
        >
          ฿{plan.price.toLocaleString()}
        </span>
        <span
          className={`text-sm ${plan.popular ? "text-white/80" : "text-muted"}`}
        >
          /{plan.period}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className={`w-5 h-5 shrink-0 ${
                plan.popular ? "text-white" : "text-green-500"
              }`}
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
            <span
              className={`text-sm ${
                plan.popular ? "text-white/90" : "text-foreground"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          plan.popular
            ? "bg-white text-red-600 hover:bg-gray-100"
            : plan.price === 0
            ? "bg-muted-light dark:bg-muted-dark text-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {plan.price === 0 ? "เริ่มใช้งานฟรี" : "เลือกแพ็คเกจนี้"}
      </button>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-red-600 via-red-500 to-orange-500 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              เลือกแพ็คเกจที่เหมาะกับคุณ
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              ดูซีรีย์คุณภาพจากทั่วโลกได้ไม่จำกัด ยกเลิกได้ทุกเมื่อ
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* FAQ Section */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              คำถามที่พบบ่อย
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "สามารถยกเลิกได้ทุกเมื่อไหม?",
                  a: "ใช่ คุณสามารถยกเลิกแพ็คเกจได้ทุกเมื่อ โดยจะยังใช้งานได้จนครบรอบบิล",
                },
                {
                  q: "รองรับการชำระเงินแบบไหนบ้าง?",
                  a: "เรารองรับบัตรเครดิต/เดบิต, PromptPay, TrueMoney Wallet และ Mobile Banking",
                },
                {
                  q: "สามารถดูบนอุปกรณ์ไหนได้บ้าง?",
                  a: "รองรับทุกอุปกรณ์ ทั้ง Smart TV, มือถือ, แท็บเล็ต และคอมพิวเตอร์",
                },
                {
                  q: "มีเนื้อหาใหม่เพิ่มบ่อยแค่ไหน?",
                  a: "เราอัปเดตซีรีย์ใหม่ทุกสัปดาห์ และมีเนื้อหาพิเศษสำหรับสมาชิก Premium",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-surface border border-border rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground hover:bg-muted-light dark:hover:bg-muted-dark">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-muted group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-muted">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 text-center">
            <div className="bg-surface border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ยังไม่แน่ใจ?
              </h3>
              <p className="text-muted mb-6">
                ลองใช้งานฟรี 7 วัน ไม่ต้องใช้บัตรเครดิต ยกเลิกได้ทุกเมื่อ
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                เริ่มทดลองใช้ฟรี
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
