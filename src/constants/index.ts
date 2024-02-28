import HeartImage from "@/../public/images/categories/heart.png";
import BrainImage from "@/../public/images/categories/brain.png";
import KneeImage from "@/../public/images/categories/knee.png";
import TeethImage from "@/../public/images/categories/teeth.png";

export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const adminNavLinks = [
  {
    label: "Doctors",
    href: "/admin/doctors",
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
  },
  {
    label: "Analysis",
    href: "/admin/analysis",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
];

export const DoctorCategories = [
  {
    image: TeethImage,
    label: "Dentist",
  },
  {
    image: HeartImage,
    label: "Cardiologist",
  },
  {
    image: KneeImage,
    label: "Orthopedic",
  },
  {
    image: BrainImage,
    label: "Neurologist",
  },
];
