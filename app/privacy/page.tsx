import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | CINEMAX",
  description: "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของ CINEMAX",
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            นโยบายความเป็นส่วนตัว
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted">อัปเดตล่าสุด: 1 ธันวาคม 2024</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <p className="text-foreground/80">
                เราอาจเก็บรวบรวมข้อมูลประเภทต่างๆ ได้แก่:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>
                  <strong>ข้อมูลบัญชี:</strong> อีเมล ชื่อผู้ใช้ รหัสผ่าน
                  (เข้ารหัส)
                </li>
                <li>
                  <strong>ข้อมูลโปรไฟล์:</strong> รูปภาพโปรไฟล์ การตั้งค่าภาษา
                </li>
                <li>
                  <strong>ข้อมูลการใช้งาน:</strong> ประวัติการรับชม รายการโปรด
                  ความคืบหน้าการดู
                </li>
                <li>
                  <strong>ข้อมูลการชำระเงิน:</strong> ประวัติการซื้อ
                  (ไม่เก็บข้อมูลบัตร)
                </li>
                <li>
                  <strong>ข้อมูลอุปกรณ์:</strong> ประเภทอุปกรณ์ IP address
                  เบราว์เซอร์
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                2. การใช้ข้อมูล
              </h2>
              <p className="text-foreground/80">เราใช้ข้อมูลของคุณเพื่อ:</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>ให้บริการและปรับปรุงประสบการณ์การใช้งาน</li>
                <li>แนะนำเนื้อหาที่เหมาะสมกับความสนใจของคุณ</li>
                <li>ประมวลผลการชำระเงินและธุรกรรม</li>
                <li>ส่งการแจ้งเตือนและข้อมูลอัปเดต</li>
                <li>ป้องกันการฉ้อโกงและรักษาความปลอดภัย</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                3. การแชร์ข้อมูล
              </h2>
              <p className="text-foreground/80">
                เราไม่ขายข้อมูลส่วนบุคคลของคุณ เราอาจแชร์ข้อมูลกับ:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>ผู้ให้บริการที่ช่วยในการดำเนินงาน (เช่น การชำระเงิน)</li>
                <li>หน่วยงานกำกับดูแลตามที่กฎหมายกำหนด</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                4. คุกกี้และเทคโนโลยีติดตาม
              </h2>
              <p className="text-foreground/80">
                เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อ:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>จดจำการเข้าสู่ระบบของคุณ</li>
                <li>บันทึกการตั้งค่าของคุณ</li>
                <li>วิเคราะห์การใช้งานเพื่อปรับปรุงบริการ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                5. ความปลอดภัยของข้อมูล
              </h2>
              <p className="text-foreground/80">
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณ
                รวมถึง:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>การเข้ารหัส SSL/TLS</li>
                <li>การเข้ารหัสรหัสผ่าน</li>
                <li>การควบคุมการเข้าถึง</li>
                <li>การตรวจสอบความปลอดภัยอย่างสม่ำเสมอ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                6. สิทธิ์ของคุณ
              </h2>
              <p className="text-foreground/80">คุณมีสิทธิ์:</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>เข้าถึงข้อมูลส่วนบุคคลของคุณ</li>
                <li>แก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                <li>ลบบัญชีและข้อมูลของคุณ</li>
                <li>ยกเลิกการรับข่าวสาร</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                7. การติดต่อ
              </h2>
              <p className="text-foreground/80">
                หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ{" "}
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
