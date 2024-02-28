import { getDoctors } from "@/actions/doctors";
import { CategoryBadge } from "@/components/category-badge";
import { DoctorInfoCard } from "@/components/doctor-info-card";
import { PageHeading } from "@/components/page-heading";
import { Photo } from "@/components/photo";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { doctorId: string } }) => {
  const doctor = await db.doctor.findUnique({
    where: {
      id: params.doctorId,
    },
  });

  if (!doctor) {
    notFound();
  }

  const { id, description, name } = doctor;
  const doctors = await getDoctors({ doctorId: id });
  const user = await currentUser();
  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeading>{name}</PageHeading>
      <Separator />
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col gap-6 w-full">
          <DoctorInfoCard doctor={doctor} user={user} action />
          <section className="border rounded-md shadow-md px-5 py-3">
            <h3 className="text-xl font-bold">About {name}</h3>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </section>
        </div>
        <section className="flex flex-col min-w-[300px] shadow_sm py-3 rounded-md bg-background">
          <h4 className="text-xl font-bold px-4 pb-3">Suggestions</h4>
          {doctors.map(
            ({ id, name, image, category, experience, blurDataUrl }) => (
              <Link
                href={`/doctors/${id}`}
                key={id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors"
              >
                <Photo
                  src={image}
                  alt={name}
                  blurDataUrl={blurDataUrl}
                  className="max-w-[80px] rounded-full"
                />
                <div>
                  <CategoryBadge category={category} />
                  <h3 className="font-semibold text-sm mt-1 line-clamp-1">
                    {name}
                  </h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {experience} years
                  </p>
                </div>
              </Link>
            )
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;
