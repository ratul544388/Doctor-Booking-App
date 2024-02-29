import { db } from "@/lib/db";
import { AppointmentForm } from "./_components/appointment-form";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";

const AppointmentPage = async ({
  params,
}: {
  params: { doctorId: string };
}) => {
  const user = await currentUser();

  if (!user) {
    redirect(
      `/auth/login?redirect_url=/doctors/${params.doctorId}/appointment`
    );
  }

  const doctor = await db.doctor.findUnique({
    where: {
      id: params.doctorId,
    },
  });

  if (!doctor) {
    notFound();
  }

  return <AppointmentForm doctor={doctor} />;
};

export default AppointmentPage;
