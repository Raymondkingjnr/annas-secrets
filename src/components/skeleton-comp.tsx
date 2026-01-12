import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-[300px] rounded-lg border p-4 space-y-4">
      {/* Image */}
      <Skeleton className="h-[180px] w-full rounded-md" />

      {/* Title */}
      <Skeleton className="h-4 w-3/4" />

      {/* Price */}
      <Skeleton className="h-4 w-1/2" />

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};
