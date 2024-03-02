"use client";

import { Skeleton } from "../ui/skeleton";

interface DoctorsSkeletonsProps {
  count: number;
}

export const DoctorsSkeletons = ({ count }: DoctorsSkeletonsProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-md">
          <Skeleton key={index} className="w-full aspect-square" />
          <div className="mt-3 px-3">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-5 mt-3" />
            <Skeleton className="w-[80%] h-3.5 mt-3" />
            <Skeleton className="w-20 h-4 mt-3" />
            <Skeleton className="w-full h-9 rounded-full my-3" />
          </div>
        </div>
      ))}
    </div>
  );
};
