import { getDoctors } from "@/actions/doctors";
import Await from "@/components/await";
import { Doctors } from "@/components/doctors";
import { Suspense } from "react";
import { Categories } from "./_components/categories";
import { DoctorsSkeletons } from "@/components/skeletons/doctors-skeletons";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const category = searchParams.category;

  const promise = getDoctors({ category });

  return (
    <div className="flex flex-col gap-4 h-full">
      <Categories />
      <Suspense fallback={<DoctorsSkeletons count={18} />} key={Math.random()}>
        <Await promise={promise}>
          {(doctors) => <Doctors doctors={doctors} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default ExplorePage;
