import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ยกเลิกการชำระเงิน | CINEMAX",
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-2xl p-8 text-center border border-border">
        {/* Cancel Icon */}
        <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          ยกเลิกการชำระเงิน
        </h1>

        <p className="text-muted mb-6">
          การชำระเงินถูกยกเลิก คุณยังไม่ถูกเรียกเก็บเงิน
        </p>

        <div className="space-y-3">
          <Link
            href="/series"
            className="block w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            ดูซีรีย์ต่อ
          </Link>

          <Link
            href="/subscription"
            className="block w-full px-6 py-3 border border-border hover:bg-muted-light dark:hover:bg-muted-dark text-foreground font-medium rounded-lg transition-colors"
          >
            ดูแพ็คเกจสมาชิก
          </Link>

          <Link
            href="/"
            className="block text-muted hover:text-foreground transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted mb-2">มีปัญหาในการชำระเงิน?</p>
          <Link
            href="/help"
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            ติดต่อฝ่ายช่วยเหลือ
          </Link>
        </div>
      </div>
    </div>
  );
}
