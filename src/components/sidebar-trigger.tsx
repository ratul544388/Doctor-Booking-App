"use client";

import { MotionConfig, motion } from "framer-motion";
import { useState } from "react";

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
      className="w-11 hover:bg-secondary transition-colors aspect-square flex items-center justify-center rounded-full cursor-pointer z-[100] absolute top-1/2 -translate-y-1/2 left-3"
    >
      <div className="w-[24px] relative aspect-square">
        <MotionConfig transition={{ ease: "easeInOut" }}>
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
        </MotionConfig>
      </div>
    </div>
  );
};
