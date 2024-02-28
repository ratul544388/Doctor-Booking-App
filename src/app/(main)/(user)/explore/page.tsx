import { getDoctors } from "@/actions/doctors";
import { Doctors } from "@/components/doctors";
import { CategorySidebar } from "./_components/category-sidebar";
import { currentUser } from "@/lib/current-user";

const ExplorePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const category = searchParams.category;
  const user = await currentUser();
  const doctors = await getDoctors({ category });

  return (
    <div className="flex gap-6 h-full">
      <CategorySidebar className="hidden sm:block" />
      <Doctors
        doctors={doctors}
        className="w-full sm:grid-cols-2 md:col-end-3 lg:grid-cols-4 xl:grid-cols-5"
        user={user}
      />
    </div>
  );
};

export default ExplorePage;
