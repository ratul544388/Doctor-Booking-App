"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "./dropdown-menu";
import { Button } from "./ui/button";
import { UserAvatar } from "./user-avatar";
import { User2 } from "lucide-react";
import {FaUserDoctor} from 'react-icons/fa6'
import {MdLogout} from 'react-icons/md'

interface UserButtonProps {
  user: User;
}

export const UserButton = ({ user }: UserButtonProps) => {
  const router = useRouter();
  const trigger = (
    <Button className="h-10 w-10 rounded-full" variant="ghost">
      <UserAvatar src={user.image as string} alt="Ratul Hossain" />
    </Button>
  );
  const options = [
    {
      label: "Profile",
      onClick: () => router.push("/profile"),
      icon: User2,
    },
    {
      label: "My Apointments",
      onClick: () => router.push("/my-appointments"),
      icon: FaUserDoctor
    },
    {
      label: "Logout",
      onClick: () => signOut({ callbackUrl: "/" }),
      icon: MdLogout
    },
  ];
  return <DropdownMenu options={options} trigger={trigger} />;
};
