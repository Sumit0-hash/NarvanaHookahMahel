export function ProductCardSkeleton() {
  return (
    <div className="bg-charcoal-800 border border-charcoal-700/30 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-charcoal-700" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 bg-charcoal-700 rounded" />
        <div className="h-4 w-3/4 bg-charcoal-700 rounded" />
        <div className="h-5 w-1/3 bg-charcoal-700 rounded" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-charcoal-800 border border-charcoal-700/30 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-charcoal-700" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[90vh] bg-charcoal-900 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-2xl space-y-6">
          <div className="h-6 w-48 bg-charcoal-800 rounded-full" />
          <div className="h-16 w-96 bg-charcoal-800 rounded" />
          <div className="h-4 w-full bg-charcoal-800 rounded" />
          <div className="h-4 w-3/4 bg-charcoal-800 rounded" />
          <div className="flex gap-4 mt-4">
            <div className="h-12 w-40 bg-charcoal-800 rounded-lg" />
            <div className="h-12 w-40 bg-charcoal-800 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
