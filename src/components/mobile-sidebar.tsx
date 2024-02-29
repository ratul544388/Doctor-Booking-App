"use client";

import { adminNavLinks, navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

interface MobileSidebarProps {
  user: User | null;
}

const variants = {
  open: {
    x: 0,
  },
  closed: {
    x: "-100%",
  },
};

export const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const animate = open ? "open" : "closed";
  const pathname = usePathname();

  const links = user?.role === "ADMIN" ? adminNavLinks : navLinks;

  return (
    <MotionConfig transition={{ ease: "easeIn" }}>
      <SidebarTrigger open={open} onChange={() => setOpen(!open)} />
      <motion.section
        variants={variants}
        initial="closed"
        animate={animate}
        className="fixed left-0 inset-y-0 bg-background border-r shadow-md w-[75vw] max-w-[320px] z-50 pt-5 pb-3 flex flex-col items-center"
      >
        <Logo />
        <nav className="w-[90%] flex flex-col h-full pt-10">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = href === pathname;

            return (
              <Link
                onClick={() => setOpen(false)}
                href={href}
                key={label}
                className={cn(
                  "px-5 flex items-center gap-4 py-2 rounded-md font-medium text_light hover:bg-accent transition-colors",
                  isActive && "bg-secondary text-foreground",
                  !user && label === "My Appointments" && "hidden",
                )}
              >
                <Icon className="h-5 w-5"/>
                {label}
              </Link>
            );
          })}
        </nav>
      </motion.section>
      <motion.span
        onClick={() => setOpen(!open)}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        initial="closed"
        animate={animate}
        className={cn("bg-neutral-900/20 fixed inset-0 z-30")}
      />
    </MotionConfig>
  );
};

export const SidebarTrigger = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: () => void;
}) => {
  const animate = open ? "open" : "closed";

  return (
    <div
      role="button"
      onClick={onChange}
      className="absolute top-3 left-3 w-11 hover:bg-secondary transition-colors aspect-square flex items-center justify-center rounded-full cursor-pointer z-[100]"
    >
      <motion.div className="w-[24px] relative aspect-square">
        <AnimatePresence initial={false}>
          <motion.span
            variants={{
              closed: {
                top: ["50%", "50%", "0%"],
                y: ["-50%", "-50%", "0%"],
                rotate: [45, 0, 0],
              },
              open: {
                top: ["0%", "50%", "50%"],
                y: ["0%", "-50%", "-50%"],
                rotate: [0, 0, 45],
              },
            }}
            initial="closed"
            animate={animate}
            className="absolute w-full h-[4px] bg-neutral-800 rounded-full"
          />
          <motion.span
            variants={{
              closed: {
                rotate: [-45, 0, 0],
              },
              open: {
                rotate: [0, 0, -45],
              },
            }}
            initial="closed"
            animate={animate}
            className="absolute w-full h-[4px] bg-neutral-800 rounded-full"
            style={{ top: "50%", translateY: "-50%" }}
          />
          <motion.span
            variants={{
              closed: {
                bottom: 0,
                y: 0,
                opacity: [0, 1, 1],
              },
              open: {
                bottom: "50%",
                y: "50%",
                opacity: [1, 1, 0],
              },
            }}
            initial="closed"
            animate={animate}
            className="absolute w-1/2 h-[4px] bg-neutral-800 bottom-0 right-0 rounded-full"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
