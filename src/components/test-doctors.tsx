import { getDoctors } from "@/actions/doctors";
import { Doctors } from "./doctors";

export const TestDoctors = async ({ category }: { category?: string }) => {
  const doctors = await getDoctors({ category });
  return <Doctors doctors={doctors} key={Math.random()} />;
};
