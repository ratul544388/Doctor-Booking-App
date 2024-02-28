"use client";
interface CategoryBadgeProps {
  category: string;
}

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <div className="bg-primary/10 text-primary px-3 rounded-full text-sm font-medium w-fit">
      {category}
    </div>
  );
};
