import HeartImage from "@/../public/images/categories/heart.png";
import BrainImage from "@/../public/images/categories/brain.png";
import KneeImage from "@/../public/images/categories/knee.png";
import TeethImage from "@/../public/images/categories/teeth.png";
import EyeImage from "@/../public/images/categories/eye.png";
import LeverImage from "@/../public/images/categories/lever.png";
import EarImage from "@/../public/images/categories/ear.png";
import DermatologyImage from "@/../public/images/categories/dermatology.png";
import { Activity, ClipboardPlus, Home, Info, Search, Settings } from "lucide-react";
import {FaUserDoctor} from 'react-icons/fa6'

export const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Search,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
  {
    label: "My Appointments",
    href: "/my-appointments",
    icon: ClipboardPlus,
  },
] as const;

export const adminNavLinks = [
  {
    label: "Doctors",
    href: "/admin/doctors",
    icon: FaUserDoctor,
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: ClipboardPlus,
  },
  {
    label: "Analysis",
    href: "/admin/analysis",
    icon: Activity,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const DoctorCategories = [
  {
    image: BrainImage,
    label: "Neurology",
  },
  {
    image: TeethImage,
    label: "Dentist",
  },
  {
    image: HeartImage,
    label: "Cardiology",
  },
  {
    image: KneeImage,
    label: "Orthopedic",
  },
  {
    image: EyeImage,
    label: "Ophthalmology",
  },
  {
    image: EarImage,
    label: "Audiology",
  },
  {
    image: DermatologyImage,
    label: "Dermatology",
  },
  {
    image: LeverImage,
    label: "Pulmonology",
  },
  // {
  //   image: BrainImage,
  //   label: "General",
  // },
  // {
  //   image: BrainImage,
  //   label: "Gastroenterology",
  // },
  // {
  //   image: BrainImage,
  //   label: "Nephrology",
  // },
];

