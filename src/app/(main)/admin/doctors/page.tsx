import { getDoctors } from "@/actions/doctors";
import { Doctors } from "@/components/doctors";
import { Search } from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import getBase64 from "@/lib/getLocalBase64";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const q = searchParams.q;
  const doctors = await getDoctors({q});

  return (
    <div className="flex flex-col gap-3 h-full">
      <section className="flex items-center justify-between">
        <h3 className="font-bold text-3xl text-primary">Doctors</h3>
        <Link href="/admin/doctors/new" className={buttonVariants()}>
          Add new
          <PlusCircledIcon className="h-4 w-4 ml-2" />
        </Link>
      </section>
      <Separator />
      <Search className="my-3 mx-0" results={doctors.length} />
      <Doctors doctors={doctors} isAdmin/>
    </div>
  );
};

export default Page;
