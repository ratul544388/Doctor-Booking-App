"use client";

import { adminNavLinks, navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { MotionConfig, motion } from "framer-motion";
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
        className="fixed left-0 inset-y-0 bg-background border-r shadow-md w-[75vw] z-50 pt-5 pb-3 flex flex-col items-center"
      >
        <Logo />
        <nav className="w-[90%] flex flex-col h-full pt-10">
          {links.map(({ href, label }) => {
            const isActive = href === pathname;
            return (
              <Link
                onClick={() => setOpen(false)}
                href={href}
                key={label}
                className={cn(
                  "px-5 py-2 rounded-md font-medium text_light hover:bg-accent transition-colors",
                  isActive && "bg-secondary text-foreground"
                )}
              >
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
      <motion.div
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="w-[24px] opacity-0 relative aspect-square"
      >
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
          animate={animate}
          className="absolute w-1/2 h-[4px] bg-neutral-800 bottom-0 right-0 rounded-full"
        />
      </motion.div>
    </div>
  );
};
