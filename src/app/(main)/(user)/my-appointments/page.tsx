import { getAppointments } from "@/actions/appointment";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { Appointment } from "./_components/appointment";
import { AppointmentsSkeletons } from "@/components/skeletons/appointment-skeletons";
import { Suspense } from "react";

const Page = async () => {
  const user = await currentUser();
  const appointments = await getAppointments({ userId: user?.id as string });

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeading>My Appointments</PageHeading>
      <Separator />
      <section className="flex flex-col gap-5">
        <Suspense fallback={<AppointmentsSkeletons />}>
          {appointments.map((appointment) => (
            <Appointment appointment={appointment} key={appointment.id} />
          ))}
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
