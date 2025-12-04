"use client";

import { useCallback, useState } from "react";
import { useAuthStore } from "../stores";
import { toast } from "../stores/toastStore";

interface CheckoutParams {
  type: "episode" | "subscription";
  episodeId?: string;
  episodeTitle?: string;
  seriesTitle?: string;
  planId?: string;
  planName?: string;
  price: number;
}

interface UsePaymentReturn {
  isLoading: boolean;
  error: string | null;
  checkout: (params: CheckoutParams) => Promise<void>;
  verifyPayment: (sessionId: string) => Promise<boolean>;
}

export function usePayment(): UsePaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const checkout = useCallback(
    async (params: CheckoutParams) => {
      if (!user) {
        toast.error("ไม่ได้เข้าสู่ระบบ", "กรุณาเข้าสู่ระบบก่อนทำการชำระเงิน");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/payment/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...params,
            userId: user.id,
            userEmail: user.email,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "ไม่สามารถสร้างรายการชำระเงินได้");
        }

        // Redirect to Stripe Checkout
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("ไม่พบ URL สำหรับชำระเงิน");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
        setError(message);
        toast.error("ชำระเงินไม่สำเร็จ", message);
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const verifyPayment = useCallback(
    async (sessionId: string): Promise<boolean> => {
      try {
        const response = await fetch(
          `/api/payment/verify?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        return data.status === "paid";
      } catch (err) {
        console.error("Payment verification error:", err);
        return false;
      }
    },
    []
  );

  return {
    isLoading,
    error,
    checkout,
    verifyPayment,
  };
}

// Hook for checking if user has purchased an episode
export function usePurchaseCheck() {
  const { user } = useAuthStore();
  const [purchasedEpisodes, setPurchasedEpisodes] = useState<Set<string>>(
    new Set()
  );

  const checkPurchase = useCallback(
    async (episodeId: string): Promise<boolean> => {
      if (!user) return false;

      // Check from local state first
      if (purchasedEpisodes.has(episodeId)) return true;

      try {
        const response = await fetch(
          `/api/purchases/check?episodeId=${episodeId}`
        );
        const data = await response.json();

        if (data.purchased) {
          setPurchasedEpisodes((prev) => new Set(prev).add(episodeId));
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [user, purchasedEpisodes]
  );

  return { checkPurchase, purchasedEpisodes };
}
