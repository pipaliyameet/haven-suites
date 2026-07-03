export const SITE = {
  name: "Maison Aurélia",
  shortName: "Aurélia",
  tagline: "A Modern Luxury Hotel & Resort",
  address: "Cap d'Aurélia · 14 Promenade des Étoiles · 06400 Côte d'Azur",
  phone: "+33 4 92 00 14 88",
  email: "reservations@maisonaurelia.com",
  founded: 1927,
  rating: 5,
} as const;

export const NAV_LINKS = [
  { label: "Stays", to: "/rooms" },
  { label: "Suites", to: "/suites" },
  { label: "Dining", to: "/restaurant" },
  { label: "Spa", to: "/spa" },
  { label: "Events", to: "/wedding-events" },
  { label: "Offers", to: "/offers" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export const FOOTER_LINKS = {
  Stay: [
    { label: "Rooms", to: "/rooms" },
    { label: "Luxury Suites", to: "/suites" },
    { label: "Packages", to: "/packages" },
    { label: "Special Offers", to: "/offers" },
    { label: "Gallery", to: "/gallery" },
  ],
  Experience: [
    { label: "Restaurant", to: "/restaurant" },
    { label: "Signature Spa", to: "/spa" },
    { label: "Pool & Beach", to: "/pool" },
    { label: "Weddings", to: "/wedding-events" },
    { label: "Conferences", to: "/conference" },
  ],
  House: [
    { label: "About", to: "/about" },
    { label: "Journal", to: "/blog" },
    { label: "Testimonials", to: "/testimonials" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  Care: [
    { label: "FAQs", to: "/faqs" },
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ],
} as const;