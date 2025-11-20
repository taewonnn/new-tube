import CategoriesSection from "../sections/categories-section";

interface HomeViewProps {
  categoryId?: string;
}

export default function HomeView({ categoryId }: HomeViewProps) {
  return (
    <div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 pt-2.5">
      <CategoriesSection categoryId={categoryId} />

      {/* @TODO: Add videos section */}
      {/* <VideosSection categoryId={categoryId} /> */}
    </div>
  );
}
