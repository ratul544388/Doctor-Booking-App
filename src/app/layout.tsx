import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { cn } from "@/lib/utils";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookEase: Your Trusted Doctor Booking App",
  description:
    "BookEase: Simplifying Doctor Appointments. Fast, easy, and reliable booking for your medical needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "flex flex-col")}>
        <ModalProvider />
        <ToastProvider />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
