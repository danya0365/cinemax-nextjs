import type { Series } from "@/src/domain/types";
import { SeriesCard } from "../SeriesCard";

interface SeriesGridProps {
  series: Series[];
  showRank?: boolean;
}

export function SeriesGrid({ series, showRank = false }: SeriesGridProps) {
  if (series.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="w-24 h-24 text-muted mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          ไม่พบซีรีย์
        </h3>
        <p className="text-muted text-center">
          ลองค้นหาด้วยคำค้นอื่น หรือเปลี่ยนตัวกรอง
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {series.map((item, index) => (
        <SeriesCard
          key={item.id}
          series={item}
          rank={showRank ? index + 1 : undefined}
          showRank={showRank}
        />
      ))}
    </div>
  );
}
