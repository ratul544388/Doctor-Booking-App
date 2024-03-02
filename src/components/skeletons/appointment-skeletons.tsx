"use client";

import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface AppointmentSkeletonsProps {}

export const AppointmentsSkeletons = ({}: AppointmentSkeletonsProps) => {
  return (
    <div className="flex flex-col w-full gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full border rounded-md shadow_sm p-5 flex flex-col lg:flex-row gap-6"
        >
          <div className="flex flex-col xs:flex-row gap-6 w-full max-w-[550px]">
            <Skeleton className="w-full max-w-[220px] aspect-square" />
            <div>
              <Skeleton className="w-32 h-6 mt-2" />
              <Skeleton className="w-40 h-4 mt-3" />
              <Skeleton className="w-52 h-4 mt-3" />
              <Skeleton className="w-40 h-4 mt-2" />
              <Skeleton className="w-20 h-5 mt-2" />
              <Skeleton className="w-44 h-6 mt-2" />
            </div>
          </div>
          <div>
            <Skeleton className="w-36 h-6" />
            <Separator className="mt-3" />
            <Skeleton className="w-56 h-4 mt-3" />
            <Skeleton className="w-52 h-4 mt-3" />
            <Skeleton className="w-64 h-4 mt-3" />
            <Skeleton className="w-52 h-4 mt-3" />
            <Skeleton className="w-52 h-4 mt-3" />
            <Skeleton className="w-32 h-4 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
};
