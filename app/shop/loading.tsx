import { ProductGridSkeleton } from '@/components/loading-skeleton';

export default function ShopLoading() {
  return (
    <div className="container-luxury section-padding">
      <div className="mb-8">
        <div className="h-10 w-48 bg-charcoal-800 rounded animate-pulse" />
        <div className="h-4 w-72 bg-charcoal-800 rounded animate-pulse mt-3" />
      </div>
      <ProductGridSkeleton count={12} />
    </div>
  );
}
