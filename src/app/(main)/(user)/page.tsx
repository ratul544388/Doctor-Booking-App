import DoctorsImage from "@/../public/images/doctors.jpg";
import { getDoctors } from "@/actions/doctors";
import { Doctors } from "@/components/doctors";
import { Search } from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import { DoctorCategories } from "@/constants";
import { currentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const q = searchParams.q;
  const doctors = await getDoctors({ q });
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center h-full pt-12">
      <section className="grid md:grid-cols-2 gap-8 gap-y-12 items-center">
        <section className="flex flex-col">
          <h1 className="text-4xl font-bold">
            Find & Book <span className="text-primary">Appoinment</span> with{" "}
            <br /> your Fav <span className="text-primary">Doctors</span>
          </h1>
          <p className="mt-4 text_light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            pariatur architecto saepe sequi. Accusantium eos dicta dolorem
            sapiente fugit modi rerum amet perferendis perspiciatis consequatur,
            voluptatum natus. Dignissimos soluta corrupti vitae reiciendis non,
            cupiditate provident!
          </p>
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ variant: "gradient" }),
              "mt-8 w-full max-w-[400px] mx-auto md:mx-0 md:w-fit"
            )}
          >
            Explore Now
          </Link>
        </section>
        <div className="relative w-full max-w-[500px] aspect-[9/7] mx-auto md:mx-0 md:ml-auto">
          <Image
            src={DoctorsImage}
            alt="Doctors Image"
            fill
            placeholder="blur"
            className="object-cover rounded-lg"
          />
        </div>
      </section>
      <section className="flex flex-col items-center mt-16 max-w-[700px]">
        <h2 className="text-3xl font-bold">
          Search <span className="text-primary">Doctors</span>
        </h2>
        <p className="capitalize text_light">
          Search your doctors and book your appointment in one click
        </p>
        <Search className="mt-5" results={doctors.length} />
        {q && !!doctors.length && (
          <Doctors
            doctors={doctors}
            className="mt-8  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
            user={user}
          />
        )}
        <div className="flex flex-wrap justify-center gap-5 mt-12">
          {DoctorCategories.slice(0, 6).map(({ image, label }, index) => (
            <Link
              href={`/explore?category=${label.toLowerCase()}`}
              className="flex flex-col h-[120px] aspect-[9/7] p-4 gap-2 items-center border rounded-md font-medium bg-blue-50 hover:bg-blue-100 transition-colors shadow-md"
              key={index}
            >
              <Image src={image} alt="Category" width={60} height={60} />
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
