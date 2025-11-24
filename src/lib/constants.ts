import {
  Award,
  Baby,
  Bone,
  BrainCircuit,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Cpu,
  Users,
  UserCheck,
} from 'lucide-react';

// -----------------------------
// NAVIGATION LINKS
// -----------------------------
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/patient-resources', label: 'Patient Resources' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

// -----------------------------
// ICON MAPPING (matches DB icons)
// -----------------------------
export const iconMap = {
  Droplets,
  BrainCircuit,
  Bone,
  Baby,
  HeartPulse,
  HeartHandshake,
  Award,
  Cpu,
  Users,
  UserCheck,
};

// -----------------------------
// FETCH SERVICES FROM BACKEND
// -----------------------------
export async function getServices() {
  try {
    const res = await fetch("http://localhost:5000/services", {
      next: { revalidate: 10 }, // revalidate every 10 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch services");

    const data = await res.json();
    return data; // Expect an array of service objects
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// -----------------------------
// FETCH TESTIMONIALS FROM BACKEND
// -----------------------------
export async function getTestimonials() {
  try {
    const res = await fetch("http://localhost:5000/testimonials", {
      next: { revalidate: 10 }, // revalidate every 10 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch testimonials");

    const data = await res.json();
    return data; // Expect an array of testimonial objects
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// -----------------------------
// WHY CHOOSE US DATA
// -----------------------------
export const whyChooseUs = [
  {
    title: 'Qualified Professionals',
    description: 'Our team consists of certified and experienced personel dedicated to your recovery.',
    icon: UserCheck,
  },
  {
    title: 'Personalized Care',
    description: 'We create tailored treatment plans that address your unique needs and goals.',
    icon: HeartHandshake,
  },
  {
    title: 'Modern Equipment',
    description: 'We use state-of-the-art equipment to provide the most effective treatments.',
    icon: Cpu,
  },
  {
    title: 'Supportive Environment',
    description: 'A calming and encouraging atmosphere to help you feel motivated and hopeful.',
    icon: Users,
  },
];
