import { db } from "@/lib/db";
import { AppointmentForm } from "./_components/appointment-form";
import { notFound } from "next/navigation";

const AppointmentPage = async ({params} : {params: {doctorId: string}}) => {
  const doctor = await db.doctor.findUnique({
    where: {
      id: params.doctorId,
    }
  })

  if(!doctor) {
    notFound();
  }

  return (
    <AppointmentForm doctor={doctor}/>
  );
};

export default AppointmentPage;
