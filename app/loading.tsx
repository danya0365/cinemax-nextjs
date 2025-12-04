export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-red-600 animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground font-medium">กำลังโหลด...</span>
        </div>
      </div>
    </div>
  );
}
