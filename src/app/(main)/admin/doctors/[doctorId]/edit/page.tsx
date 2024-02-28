import React from "react";
import { DoctorForm } from "../../_components/doctor-form";
import { db } from "@/lib/db";
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

  return <DoctorForm doctor={doctor} title={`Edit ${doctor.name} Info`} />;
};

export default Page;
