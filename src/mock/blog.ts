import restaurant from "@/assets/restaurant.jpg";
import spa from "@/assets/spa.jpg";
import pool from "@/assets/pool.jpg";
import wedding from "@/assets/wedding.jpg";
import exterior from "@/assets/hotel-exterior.jpg";
import suite from "@/assets/room-suite.jpg";

export interface Post { id: string; title: string; excerpt: string; author: string; date: string; category: string; readMinutes: number; image: string }

export const POSTS: Post[] = [
  { id: "1", title: "The Quiet Season on the Côte", excerpt: "Why September remains our most quietly luminous month, and how to spend it.", author: "Camille Auberge", date: "2025-09-14", category: "Travel", readMinutes: 6, image: exterior },
  { id: "2", title: "In the Cellar with Sommelier Théo Léger", excerpt: "A conversation over a 1997 Bandol on why terroir is a form of memory.", author: "Julien Vasseur", date: "2025-08-02", category: "Cellar", readMinutes: 8, image: restaurant },
  { id: "3", title: "The Ritual of the Hammam", excerpt: "Our spa director on slowness as the ultimate luxury.", author: "Nadia Rey", date: "2025-07-19", category: "Spa", readMinutes: 5, image: spa },
  { id: "4", title: "A Summer Wedding at the Orangerie", excerpt: "How a family from Lyon reimagined the classic Provençal celebration.", author: "Élise Marin", date: "2025-06-30", category: "Weddings", readMinutes: 7, image: wedding },
  { id: "5", title: "Ten Minutes with Chef Solène Aubert", excerpt: "On sea urchin, restraint, and the courage of a nearly empty plate.", author: "Camille Auberge", date: "2025-05-11", category: "Kitchen", readMinutes: 6, image: restaurant },
  { id: "6", title: "The Suite With the Best Sunset", excerpt: "An architectural love letter to Suite 407, and a curious hydrangea.", author: "Marc Lévêque", date: "2025-04-08", category: "House", readMinutes: 4, image: suite },
];

export interface FAQ { q: string; a: string }
export const FAQS: FAQ[] = [
  { q: "What time is check-in and check-out?", a: "Check-in from 3:00pm, check-out until noon. Early arrival and late departure can be arranged with our concierge, subject to availability." },
  { q: "Do you accommodate children?", a: "Warmly. We offer connecting suites, a dedicated children's atelier, and a discreet in-room babysitting service." },
  { q: "Is airport transfer included?", a: "Complimentary chauffeur transfer is included with the Aurélia Romance and Wellness packages." },
  { q: "What is your cancellation policy?", a: "Reservations may be cancelled at no charge up to 72 hours prior to arrival. Non-refundable rates have distinct terms disclosed at booking." },
  { q: "Do you accept pets?", a: "Small pets are welcomed in Garden and Ocean categories with prior notice. A bespoke amenity kit is provided." },
  { q: "Can dietary needs be met at the restaurant?", a: "Chef Aubert's kitchen builds tasting menus around any dietary preference — please notify us at least 24 hours in advance." },
  { q: "Is the property accessible?", a: "Ground-floor suites and the main restaurant are fully accessible. Contact the concierge to arrange the ideal accommodation." },
  { q: "Do you offer private events?", a: "The Orangerie and the Grand Salon host weddings, board dinners, and private concerts." },
];

export const GALLERY = [exterior, suite, pool, spa, wedding, restaurant];
