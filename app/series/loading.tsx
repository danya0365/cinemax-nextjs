export default function SeriesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted-light dark:bg-muted-dark rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted-light dark:bg-muted-dark rounded animate-pulse" />
        </div>

        {/* Filter Skeleton */}
        <div className="flex gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-muted-light dark:bg-muted-dark rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-2/3 bg-muted-light dark:bg-muted-dark rounded-lg mb-2" />
              <div className="h-4 bg-muted-light dark:bg-muted-dark rounded w-3/4 mb-1" />
              <div className="h-3 bg-muted-light dark:bg-muted-dark rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
