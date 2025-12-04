import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายคุกกี้ | CINEMAX",
  description: "นโยบายการใช้คุกกี้และเทคโนโลยีติดตามของ CINEMAX",
};

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            นโยบายคุกกี้
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted">อัปเดตล่าสุด: 1 ธันวาคม 2024</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                คุกกี้คืออะไร?
              </h2>
              <p className="text-foreground/80">
                คุกกี้เป็นไฟล์ข้อมูลขนาดเล็กที่จัดเก็บบนอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์
                คุกกี้ช่วยให้เว็บไซต์จดจำข้อมูลเกี่ยวกับการเยี่ยมชมของคุณ
                ทำให้การเข้าชมครั้งต่อไปง่ายขึ้นและเป็นประโยชน์มากขึ้น
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                ประเภทคุกกี้ที่เราใช้
              </h2>

              <div className="space-y-4 mt-4">
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    🔐 คุกกี้ที่จำเป็น
                  </h3>
                  <p className="text-foreground/80 text-sm">
                    จำเป็นสำหรับการทำงานของเว็บไซต์ เช่น การเข้าสู่ระบบ
                    การรักษาความปลอดภัย ไม่สามารถปิดได้
                  </p>
                </div>

                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    ⚙️ คุกกี้การตั้งค่า
                  </h3>
                  <p className="text-foreground/80 text-sm">
                    จดจำการตั้งค่าของคุณ เช่น ภาษา ธีมสี การตั้งค่าวิดีโอ
                  </p>
                </div>

                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    📊 คุกกี้วิเคราะห์
                  </h3>
                  <p className="text-foreground/80 text-sm">
                    ช่วยให้เราเข้าใจว่าผู้ใช้โต้ตอบกับเว็บไซต์อย่างไร
                    เพื่อปรับปรุงประสบการณ์
                  </p>
                </div>

                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    🎯 คุกกี้การตลาด
                  </h3>
                  <p className="text-foreground/80 text-sm">
                    ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องและวัดประสิทธิภาพแคมเปญ
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                คุกกี้ที่เราใช้
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted-light dark:bg-muted-dark">
                      <th className="border border-border p-3 text-left text-foreground">
                        ชื่อ
                      </th>
                      <th className="border border-border p-3 text-left text-foreground">
                        วัตถุประสงค์
                      </th>
                      <th className="border border-border p-3 text-left text-foreground">
                        ระยะเวลา
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr>
                      <td className="border border-border p-3">sb-*</td>
                      <td className="border border-border p-3">
                        การยืนยันตัวตน Supabase
                      </td>
                      <td className="border border-border p-3">1 ปี</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">theme</td>
                      <td className="border border-border p-3">
                        การตั้งค่าธีม (มืด/สว่าง)
                      </td>
                      <td className="border border-border p-3">1 ปี</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">language</td>
                      <td className="border border-border p-3">
                        การตั้งค่าภาษา
                      </td>
                      <td className="border border-border p-3">1 ปี</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">_ga, _gid</td>
                      <td className="border border-border p-3">
                        Google Analytics
                      </td>
                      <td className="border border-border p-3">2 ปี</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                การจัดการคุกกี้
              </h2>
              <p className="text-foreground/80">
                คุณสามารถควบคุมและจัดการคุกกี้ได้หลายวิธี:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 mt-2">
                <li>ปรับการตั้งค่าในเบราว์เซอร์เพื่อบล็อกหรือลบคุกกี้</li>
                <li>ใช้โหมดไม่ระบุตัวตน (Incognito/Private) ของเบราว์เซอร์</li>
                <li>ติดตั้งส่วนขยายเบราว์เซอร์เพื่อจัดการคุกกี้</li>
              </ul>
              <p className="text-foreground/80 mt-4">
                <strong>หมายเหตุ:</strong>{" "}
                การปิดคุกกี้บางประเภทอาจส่งผลต่อการทำงานของเว็บไซต์
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                การติดต่อ
              </h2>
              <p className="text-foreground/80">
                หากมีคำถามเกี่ยวกับนโยบายคุกกี้ กรุณาติดต่อ{" "}
                <a
                  href="mailto:privacy@cinemax.com"
                  className="text-red-600 hover:underline"
                >
                  privacy@cinemax.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
