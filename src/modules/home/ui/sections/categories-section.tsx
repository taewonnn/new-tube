"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import FilterCarousel from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId?: string;
}

export default function CategoriesSection({ categoryId }: CategoriesSectionProps) {
  return (
    <Suspense fallback={<FilterCarousel data={[]} onSelect={() => {}} isLoading />}>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSectionSuspense({ categoryId }: CategoriesSectionProps) {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return <FilterCarousel value={categoryId} data={data} onSelect={onSelect} />;
}
