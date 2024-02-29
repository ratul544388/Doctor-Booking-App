import { getDoctors } from "@/actions/doctors";
import { Doctors } from "@/components/doctors";
import { currentUser } from "@/lib/current-user";
import { Categories } from "./_components/categories";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const category = searchParams.category;
  const doctors = await getDoctors({ category });

  return (
    <div className="flex flex-col gap-4 h-full">
      <Categories/>
      <Doctors
        doctors={doctors}
        className=""
      />
    </div>
  );
};

export default ExplorePage;
