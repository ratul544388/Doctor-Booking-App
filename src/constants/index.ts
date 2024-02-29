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
  {
    label: "My Appointments",
    href: "/my-appointments",
  },
] as const;

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
    image: BrainImage,
    label: "Ophthalmology",
  },
  {
    image: BrainImage,
    label: "Dermatology",
  },
  {
    image: BrainImage,
    label: "Audiology",
  },
  {
    image: BrainImage,
    label: "Pulmonology",
  },
  {
    image: BrainImage,
    label: "General",
  },
  {
    image: BrainImage,
    label: "Gastroenterology",
  },
  {
    image: BrainImage,
    label: "Nephrology",
  },
];

