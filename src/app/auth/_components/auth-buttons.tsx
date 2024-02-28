"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface AuthButtonsProps {
  disabled?: boolean;
}

export const AuthButtons = ({ disabled }: AuthButtonsProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect_url") || "/";
  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl,
          })
        }
        type="button"
        className="w-full"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button type="button" className="w-full" variant="outline">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
