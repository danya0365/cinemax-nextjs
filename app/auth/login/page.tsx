import { LoginForm } from "@/src/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | CINEMAX",
  description: "เข้าสู่ระบบเพื่อดูซีรีย์ไมโครดราม่าคุณภาพสูง",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-900/20 via-background to-background" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
