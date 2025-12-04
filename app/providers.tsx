"use client";

import { ThemeProvider } from "@/src/presentation/components";
import { ToastContainer } from "@/src/presentation/components/common/Toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}
