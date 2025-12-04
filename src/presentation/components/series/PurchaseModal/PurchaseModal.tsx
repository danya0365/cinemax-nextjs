"use client";

import type { Episode } from "@/src/domain/types";
import { useState } from "react";
import { Modal } from "../../common/Modal";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode: Episode | null;
  seriesTitle: string;
  onPurchase: (episodeId: string, paymentMethod: string) => Promise<boolean>;
}

const paymentMethods = [
  {
    id: "promptpay",
    name: "PromptPay",
    icon: "🏦",
    description: "สแกน QR Code เพื่อชำระเงิน",
  },
  {
    id: "credit_card",
    name: "บัตรเครดิต/เดบิต",
    icon: "💳",
    description: "Visa, Mastercard, JCB",
  },
  {
    id: "truemoney",
    name: "TrueMoney Wallet",
    icon: "📱",
    description: "ชำระผ่าน TrueMoney",
  },
];

export function PurchaseModal({
  isOpen,
  onClose,
  episode,
  seriesTitle,
  onPurchase,
}: PurchaseModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"select" | "confirm" | "success" | "error">(
    "select"
  );

  const handlePurchase = async () => {
    if (!episode || !selectedMethod) return;

    setIsProcessing(true);
    setStep("confirm");

    try {
      const success = await onPurchase(episode.id, selectedMethod);
      setStep(success ? "success" : "error");
    } catch {
      setStep("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep("select");
    setSelectedMethod("");
    onClose();
  };

  if (!episode) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="ซื้อตอน" size="md">
      {step === "select" && (
        <div>
          {/* Episode Info */}
          <div className="p-4 bg-muted-light dark:bg-muted-dark rounded-xl mb-6">
            <h3 className="font-semibold text-foreground">{seriesTitle}</h3>
            <p className="text-sm text-muted">
              ตอนที่ {episode.episode_number}: {episode.title}
            </p>
            <div className="mt-2 text-2xl font-bold text-red-600">
              ฿{episode.price}
            </div>
          </div>

          {/* Payment Methods */}
          <h4 className="font-medium text-foreground mb-3">
            เลือกวิธีชำระเงิน
          </h4>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border text-left transition-colors ${
                  selectedMethod === method.id
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-border hover:border-red-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="font-medium text-foreground">
                      {method.name}
                    </div>
                    <div className="text-sm text-muted">
                      {method.description}
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <svg
                      className="w-5 h-5 text-red-600 ml-auto"
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
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 bg-muted-light dark:bg-muted-dark text-foreground font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handlePurchase}
              disabled={!selectedMethod}
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              ชำระเงิน ฿{episode.price}
            </button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-light dark:bg-muted-dark flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            กำลังดำเนินการ...
          </h3>
          <p className="text-muted">กรุณารอสักครู่</p>
        </div>
      )}

      {step === "success" && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ชำระเงินสำเร็จ!
          </h3>
          <p className="text-muted mb-6">คุณสามารถดูตอนนี้ได้แล้ว</p>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            ดูตอนนี้
          </button>
        </div>
      )}

      {step === "error" && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
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
          <h3 className="text-lg font-semibold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h3>
          <p className="text-muted mb-6">
            ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง
          </p>
          <button
            onClick={() => setStep("select")}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      )}
    </Modal>
  );
}
