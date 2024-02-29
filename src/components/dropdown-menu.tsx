"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface DropdownMenuProps {
  trigger: ReactNode;
  options: {
    label: string;
    icon?: IconType | LucideIcon;
    onClick: () => void;
  }[];
}

export const DropdownMenu = ({ trigger, options }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const animate = open ? "visible" : "hidden";
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <div>{trigger}</div>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { pointerEvents: "none", opacity: 0, y: 15 },
          visible: { pointerEvents: "auto", opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animate}
        className="w-full absolute pt-3 -bottom-3"
      >
        <div className="bg-background w-[200px] shadow-[0px_0px_6px_rgba(0,0,0,0.1)] rounded-md absolute right-0 py-3">
          {options.map(({ label, icon: Icon, onClick }, index) => (
            <Button
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              variant="ghost"
              className="w-full h-8 gap-3 rounded-none justify-start"
              key={index}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </Button>
          ))}
        </div>
        <span className="h-3.5 w-3.5 left-1/2 -translate-x-1/2 bg-background absolute bottom-0 translate-y-1/2 rotate-45 shadow-[0px_0px_6px_rgba(0,0,0,0.1)]" />
        <span className="h-3 w-6 left-1/2 -translate-x-1/2 bg-background absolute bottom-0 translate-y-full" />
      </motion.div>
    </div>
  );
};
