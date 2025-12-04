import { ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-muted-light dark:bg-muted-dark rounded ${className}`}
    />
  );
}

// Series Card Skeleton
export function SeriesCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-2/3 bg-muted-light dark:bg-muted-dark rounded-lg mb-2" />
      <div className="h-4 bg-muted-light dark:bg-muted-dark rounded w-3/4 mb-1" />
      <div className="h-3 bg-muted-light dark:bg-muted-dark rounded w-1/2" />
    </div>
  );
}

// Episode Card Skeleton
export function EpisodeCardSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-surface border border-border animate-pulse">
      <div className="w-40 h-24 bg-muted-light dark:bg-muted-dark rounded-lg shrink-0" />
      <div className="flex-1">
        <div className="h-5 bg-muted-light dark:bg-muted-dark rounded w-3/4 mb-2" />
        <div className="h-4 bg-muted-light dark:bg-muted-dark rounded w-1/2 mb-2" />
        <div className="h-3 bg-muted-light dark:bg-muted-dark rounded w-1/4" />
      </div>
    </div>
  );
}

// Profile Avatar Skeleton
export function AvatarSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-muted-light dark:bg-muted-dark animate-pulse`}
    />
  );
}

// Text Line Skeleton
export function TextSkeleton({
  width = "full",
  height = "4",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={`h-${height} bg-muted-light dark:bg-muted-dark rounded animate-pulse`}
      style={{ width: width === "full" ? "100%" : width }}
    />
  );
}

// Button Skeleton
export function ButtonSkeleton({ width = "w-24" }: { width?: string }) {
  return (
    <div
      className={`${width} h-10 bg-muted-light dark:bg-muted-dark rounded-lg animate-pulse`}
    />
  );
}
