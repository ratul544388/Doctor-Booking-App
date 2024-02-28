import { Loader } from "@/components/loader";
import { ReactNode, Suspense } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <div className="h-full py-10 flex items-center justify-center bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-500">
        {children}
      </div>
    </Suspense>
  );
}
