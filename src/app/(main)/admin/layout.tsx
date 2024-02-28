import { Loader } from "@/components/loader";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { currentUser } from "@/lib/current-user";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    notFound();
  }
  return (
    <Suspense fallback={<Loader />}>
      <MaxWidthWrapper className="h-full">{children}</MaxWidthWrapper>
    </Suspense>
  );
}
