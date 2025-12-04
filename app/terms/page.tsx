import { MainLayout } from "@/src/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน | CINEMAX",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการ CINEMAX",
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            ข้อกำหนดการใช้งาน
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted">อัปเดตล่าสุด: 1 ธันวาคม 2024</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                1. การยอมรับข้อกำหนด
              </h2>
              <p className="text-foreground/80">
                การเข้าถึงและใช้งานเว็บไซต์ CINEMAX
                ถือว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้
                หากคุณไม่เห็นด้วยกับส่วนใดส่วนหนึ่งของข้อกำหนดเหล่านี้
                คุณไม่ได้รับอนุญาตให้เข้าถึงบริการ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                2. การใช้บริการ
              </h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>คุณต้องมีอายุ 13 ปีขึ้นไปเพื่อใช้บริการของเรา</li>
                <li>
                  คุณต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันเมื่อสร้างบัญชี
                </li>
                <li>คุณมีหน้าที่รักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ</li>
                <li>คุณไม่สามารถแชร์บัญชีของคุณกับบุคคลอื่น</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                3. เนื้อหาและลิขสิทธิ์
              </h2>
              <p className="text-foreground/80">
                เนื้อหาทั้งหมดบน CINEMAX รวมถึงแต่ไม่จำกัดเพียงวิดีโอ รูปภาพ
                ข้อความ กราฟิก โลโก้ และซอฟต์แวร์ เป็นทรัพย์สินของ CINEMAX
                หรือผู้ให้อนุญาต
                และได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์และทรัพย์สินทางปัญญา
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                4. การชำระเงิน
              </h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>การซื้อตอนหรือสมัครสมาชิกเป็นการทำธุรกรรมที่สิ้นสุดแล้ว</li>
                <li>การคืนเงินจะพิจารณาเป็นรายกรณี</li>
                <li>ราคาอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งล่วงหน้า</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                5. ข้อจำกัดการใช้งาน
              </h2>
              <p className="text-foreground/80">คุณตกลงที่จะไม่:</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>คัดลอก แจกจ่าย หรือเปิดเผยเนื้อหาใดๆ แก่บุคคลที่สาม</li>
                <li>ดัดแปลงหรือสร้างผลงานดัดแปลงจากเนื้อหา</li>
                <li>ใช้วิธีการใดๆ เพื่อหลีกเลี่ยงมาตรการป้องกันเนื้อหา</li>
                <li>ใช้บริการเพื่อวัตถุประสงค์ที่ผิดกฎหมาย</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                6. การยกเลิกบัญชี
              </h2>
              <p className="text-foreground/80">
                เราอาจยกเลิกหรือระงับบัญชีของคุณทันทีโดยไม่ต้องแจ้งล่วงหน้าหรือรับผิดชอบ
                ด้วยเหตุผลใดก็ตาม รวมถึงแต่ไม่จำกัดเพียงการละเมิดข้อกำหนด
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                7. การติดต่อ
              </h2>
              <p className="text-foreground/80">
                หากมีคำถามเกี่ยวกับข้อกำหนดเหล่านี้ กรุณาติดต่อเราที่{" "}
                <a
                  href="mailto:support@cinemax.com"
                  className="text-red-600 hover:underline"
                >
                  support@cinemax.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
