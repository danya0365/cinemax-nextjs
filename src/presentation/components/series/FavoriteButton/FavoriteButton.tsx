"use client";

import { useFavoritesStore } from "@/src/presentation/stores";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  seriesId: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function FavoriteButton({
  seriesId,
  size = "md",
  showLabel = false,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorite = mounted ? isFavorite(seriesId) : false;

  const handleClick = () => {
    setIsAnimating(true);
    toggleFavorite(seriesId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (!mounted) {
    return (
      <button
        className={`${sizeClasses[size]} rounded-full bg-black/50 text-white ${className}`}
        disabled
      >
        <svg
          className={iconSizes[size]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        transition-all duration-200
        ${
          favorite
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-black/50 text-white hover:bg-black/70"
        }
        ${isAnimating ? "scale-125" : "scale-100"}
        ${className}
      `}
      title={favorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
    >
      <div className="flex items-center gap-2">
        <svg
          className={`${iconSizes[size]} transition-transform ${
            isAnimating ? "scale-110" : ""
          }`}
          fill={favorite ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {showLabel && (
          <span className="text-sm font-medium">
            {favorite ? "ในรายการโปรด" : "เพิ่มรายการโปรด"}
          </span>
        )}
      </div>
    </button>
  );
}
