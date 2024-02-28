import { Header } from "@/components/header";
import { Loader } from "@/components/loader";
import { currentUser } from "@/lib/current-user";
import { ReactNode, Suspense } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  return (
    <>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <div className="h-full pt-[80px]">{children}</div>
      </Suspense>
    </>
  );
}
