"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { Button } from "../ui/button";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  title?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Modal = ({
  children,
  title,
  description,
  open,
  disabled,
  className,
}: ModalProps) => {
  const { onClose } = useModalStore();

  const animation = useAnimation();
  useEffect(() => {
    if (open) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [open, animation]);

  const handleClose = () => {
    if (disabled) return;
    onClose();
    animation.start("hidden");
  };

  return (
    <motion.div
      onClick={handleClose}
      variants={{
        hidden: {
          display: "none",
          opacity: 0,
          transition: {
            delay: 0.15,
          },
        },
        visible: { display: "flex", opacity: 1 },
      }}
      transition={{
        duration: 0.15,
      }}
      initial="hidden"
      animate={animation}
      className="fixed flex items-center justify-center inset-0 z-[9999] bg-neutral-900/80 backdrop-blur-sm"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { scale: 0.65, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          type: "tween",
          duration: 0.15,
        }}
        initial="hidden"
        animate={animation}
        className={cn(
          "relative h-[100svh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-background border rounded-lg w-full max-w-[450px]",
          className
        )}
      >
        <Button
          onClick={handleClose}
          disabled={disabled}
          className="absolute right-2 top-1 z-50"
          variant="ghost"
          size="icon"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div className="max-h-[90vh] h-full">
          <div className="p-5 h-full">
            <h1 className="font-semibold text-lg">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="mt-5 h-full">{children}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
