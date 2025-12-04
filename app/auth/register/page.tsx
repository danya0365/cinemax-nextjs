import { RegisterForm } from "@/src/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก | CINEMAX",
  description: "สมัครสมาชิกเพื่อเริ่มดูซีรีย์ไมโครดราม่าคุณภาพสูง ตอนแรกดูฟรี!",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-900/20 via-background to-background" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <RegisterForm />
      </div>
    </div>
  );
}
