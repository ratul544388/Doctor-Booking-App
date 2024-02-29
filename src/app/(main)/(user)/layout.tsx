import { Loader } from "@/components/loader";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.role === "ADMIN") {
    redirect("/admin/doctors");
  }

  return (
    <Suspense fallback={<Loader />}>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </Suspense>
  );
}
