"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentDetails {
  status: string;
  metadata: {
    type: string;
    episodeId?: string;
    planId?: string;
  };
  amount: number;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const res = await fetch(`/api/payment/verify?session_id=${sessionId}`);
      const data = await res.json();

      if (res.ok) {
        setDetails(data);
      } else {
        setError(data.error || "ไม่สามารถตรวจสอบการชำระเงินได้");
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">กำลังตรวจสอบการชำระเงิน...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface rounded-2xl p-8 text-center border border-border">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  const isEpisode = details?.metadata?.type === "episode_purchase";
  const isSubscription = details?.metadata?.type === "subscription";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-2xl p-8 text-center border border-border">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          ชำระเงินสำเร็จ!
        </h1>

        <p className="text-muted mb-6">
          {isEpisode && "ขอบคุณสำหรับการซื้อตอน คุณสามารถรับชมได้ทันที"}
          {isSubscription &&
            "ขอบคุณสำหรับการสมัครสมาชิก คุณสามารถใช้งานได้ทันที"}
          {!isEpisode && !isSubscription && "ขอบคุณสำหรับการชำระเงิน"}
        </p>

        {details && (
          <div className="bg-muted-light dark:bg-muted-dark rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted">จำนวนเงิน</span>
              <span className="text-xl font-bold text-foreground">
                ฿{details.amount}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {isEpisode && details?.metadata?.episodeId && (
            <Link
              href={`/watch/${details.metadata.episodeId}`}
              className="block w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              ดูตอนที่ซื้อเลย
            </Link>
          )}

          {isSubscription && (
            <Link
              href="/series"
              className="block w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              เริ่มดูซีรีย์เลย
            </Link>
          )}

          <Link
            href="/profile/purchases"
            className="block w-full px-6 py-3 border border-border hover:bg-muted-light dark:hover:bg-muted-dark text-foreground font-medium rounded-lg transition-colors"
          >
            ดูประวัติการซื้อ
          </Link>

          <Link
            href="/"
            className="block text-muted hover:text-foreground transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
