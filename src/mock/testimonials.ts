export interface Testimonial { id: string; quote: string; author: string; role: string; location: string; publication?: string }

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "A masterclass in restraint. Every gesture — the folded silk, the second cortado brought without asking — feels considered.", author: "Elena Marchetti", role: "Travel Editor", location: "Milan", publication: "Condé Nast Traveller" },
  { id: "t2", quote: "The kind of place where the concierge remembers your daughter's favourite pastry three years later. Rarefied hospitality.", author: "James Whitcombe", role: "Repeat Guest", location: "London" },
  { id: "t3", quote: "Dinner on the terrace as the mistral softened over the bay — one of the more perfect evenings of my life.", author: "Sofía Guerrero", role: "Guest", location: "Buenos Aires" },
  { id: "t4", quote: "Modern luxury done the old way. Nothing is announced; everything is present.", author: "Kenji Arai", role: "Architect", location: "Kyoto" },
];

export const AWARDS = ["Forbes Five-Star · 2024","AAA Five-Diamond","Relais & Châteaux","Condé Nast Gold List","Travel + Leisure Top 100","La Liste · World Top 1000"];
