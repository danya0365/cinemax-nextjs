import { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  primary: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  success:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  warning:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  rounded = true,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${rounded ? "rounded-full" : "rounded"}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Status Badge with dot indicator
interface StatusBadgeProps {
  status: "online" | "offline" | "busy" | "away";
  label?: string;
  showDot?: boolean;
}

const statusStyles = {
  online: { dot: "bg-green-500", text: "ออนไลน์" },
  offline: { dot: "bg-gray-400", text: "ออฟไลน์" },
  busy: { dot: "bg-red-500", text: "ไม่ว่าง" },
  away: { dot: "bg-yellow-500", text: "ไม่อยู่" },
};

export function StatusBadge({
  status,
  label,
  showDot = true,
}: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${statusStyles[status].dot}`} />
      )}
      {label || statusStyles[status].text}
    </span>
  );
}

// Episode Badge (Free/Paid/Locked)
interface EpisodeBadgeProps {
  type: "free" | "paid" | "locked" | "new" | "premium";
}

const episodeStyles = {
  free: { bg: "bg-green-600", text: "ฟรี" },
  paid: { bg: "bg-red-600", text: "ซื้อแล้ว" },
  locked: { bg: "bg-gray-600", text: "ล็อค" },
  new: { bg: "bg-blue-600", text: "ใหม่" },
  premium: { bg: "bg-yellow-600", text: "Premium" },
};

export function EpisodeBadge({ type }: EpisodeBadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium text-white ${episodeStyles[type].bg}`}
    >
      {episodeStyles[type].text}
    </span>
  );
}

// Rating Badge
interface RatingBadgeProps {
  rating: number;
  showIcon?: boolean;
}

export function RatingBadge({ rating, showIcon = true }: RatingBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded text-xs text-white">
      {showIcon && (
        <svg
          className="w-3 h-3 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {rating.toFixed(1)}
    </span>
  );
}
