// Centralized mock data for all dashboards.
// Structured to be trivially swappable for real services later.

import { ROOMS } from "@/mock/rooms";

export type Role = "guest" | "super" | "admin" | "reception" | "housekeeping" | "kitchen";

export const ROLE_META: Record<Role, { label: string; home: string; badge: string }> = {
  guest:        { label: "Guest",         home: "/account",       badge: "Member" },
  super:        { label: "Super Admin",   home: "/super",         badge: "Platform" },
  admin:        { label: "Hotel Admin",   home: "/admin",         badge: "Property" },
  reception:    { label: "Receptionist",  home: "/reception",     badge: "Front Desk" },
  housekeeping: { label: "Housekeeping",  home: "/housekeeping",  badge: "Rooms" },
  kitchen:      { label: "Kitchen",       home: "/kitchen",       badge: "F&B" },
};

// ---------- Bookings / Guests ----------
export interface Booking {
  id: string; guest: string; email: string; room: string; roomType: string;
  checkIn: string; checkOut: string; nights: number; guests: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled" | "pending";
  total: number; balance: number; source: string;
}

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

export const BOOKINGS: Booking[] = [
  { id: "AUR-10241", guest: "Éloïse Bernard",   email: "eloise@atelier.fr",     room: "402", roomType: "Ocean Suite",       checkIn: addDays(-1), checkOut: addDays(3),  nights: 4, guests: 2, status: "checked-in",  total: 4720, balance: 0,    source: "Direct" },
  { id: "AUR-10242", guest: "Nikhil Rao",       email: "nrao@meridian.co",      room: "218", roomType: "Deluxe Garden",     checkIn: addDays(0),  checkOut: addDays(2),  nights: 2, guests: 1, status: "confirmed",   total: 1240, balance: 620,  source: "Booking.com" },
  { id: "AUR-10243", guest: "Amelia Chen",      email: "amelia.c@vault.io",     room: "601", roomType: "Presidential",      checkIn: addDays(0),  checkOut: addDays(5),  nights: 5, guests: 3, status: "confirmed",   total: 21000, balance: 4200, source: "Direct" },
  { id: "AUR-10244", guest: "Marcus Ashford",   email: "m.ashford@stonewood.uk",room: "V-03",roomType: "Pool Villa",        checkIn: addDays(-3), checkOut: addDays(0),  nights: 3, guests: 2, status: "checked-out", total: 7950, balance: 0,    source: "Concierge" },
  { id: "AUR-10245", guest: "Sofia Marín",      email: "sofia@marinstudio.es",  room: "305", roomType: "Deluxe Garden",     checkIn: addDays(1),  checkOut: addDays(4),  nights: 3, guests: 2, status: "confirmed",   total: 1860, balance: 1860, source: "Expedia" },
  { id: "AUR-10246", guest: "Henry Whitcombe",  email: "hw@whitcombe.co.uk",    room: "412", roomType: "Ocean Suite",       checkIn: addDays(2),  checkOut: addDays(6),  nights: 4, guests: 2, status: "pending",     total: 4720, balance: 4720, source: "Direct" },
  { id: "AUR-10247", guest: "Yuki Tanaka",      email: "yuki@tanaka.jp",        room: "212", roomType: "Deluxe Garden",     checkIn: addDays(-2), checkOut: addDays(1),  nights: 3, guests: 1, status: "checked-in",  total: 1860, balance: 0,    source: "Direct" },
  { id: "AUR-10248", guest: "Priya Kapoor",     email: "priya@kapoorlaw.in",    room: "V-01",roomType: "Pool Villa",        checkIn: addDays(4),  checkOut: addDays(9),  nights: 5, guests: 4, status: "confirmed",   total: 13250, balance: 6625, source: "Direct" },
  { id: "AUR-10249", guest: "Julien Rossi",     email: "j.rossi@rossi.fr",      room: "410", roomType: "Ocean Suite",       checkIn: addDays(-5), checkOut: addDays(-1), nights: 4, guests: 2, status: "cancelled",   total: 4720, balance: 0,    source: "Booking.com" },
  { id: "AUR-10250", guest: "Ines Da Silva",    email: "ines@dsi.pt",           room: "204", roomType: "Deluxe Garden",     checkIn: addDays(0),  checkOut: addDays(1),  nights: 1, guests: 1, status: "checked-in",  total: 620,  balance: 0,    source: "Walk-in" },
];

export interface Guest {
  id: string; name: string; email: string; phone: string; country: string;
  tier: "Silver" | "Gold" | "Platinum" | "Noir"; stays: number; spend: number;
}
export const GUESTS: Guest[] = [
  { id: "G-001", name: "Éloïse Bernard",  email: "eloise@atelier.fr",     phone: "+33 6 12 44 90 21", country: "France",   tier: "Platinum", stays: 14, spend: 68200 },
  { id: "G-002", name: "Nikhil Rao",      email: "nrao@meridian.co",      phone: "+1 415 555 0134",    country: "USA",      tier: "Gold",     stays: 5,  spend: 12400 },
  { id: "G-003", name: "Amelia Chen",     email: "amelia.c@vault.io",     phone: "+65 9123 4455",      country: "Singapore",tier: "Noir",     stays: 22, spend: 214600 },
  { id: "G-004", name: "Marcus Ashford",  email: "m.ashford@stonewood.uk",phone: "+44 20 7946 0111",   country: "UK",       tier: "Platinum", stays: 9,  spend: 41800 },
  { id: "G-005", name: "Sofia Marín",     email: "sofia@marinstudio.es",  phone: "+34 612 88 90 12",   country: "Spain",    tier: "Silver",   stays: 2,  spend: 3720 },
  { id: "G-006", name: "Yuki Tanaka",     email: "yuki@tanaka.jp",        phone: "+81 90 1234 5678",   country: "Japan",    tier: "Gold",     stays: 6,  spend: 18300 },
  { id: "G-007", name: "Priya Kapoor",    email: "priya@kapoorlaw.in",    phone: "+91 98100 22110",    country: "India",    tier: "Platinum", stays: 8,  spend: 52900 },
];

// ---------- Employees ----------
export interface Employee {
  id: string; name: string; role: Role; department: string; email: string;
  status: "active" | "leave" | "off"; shift: string; joined: string;
}
export const EMPLOYEES: Employee[] = [
  { id: "E-101", name: "Camille Laurent",   role: "reception",    department: "Front Office",  email: "camille@aurelia.com",  status: "active", shift: "07:00 – 15:00", joined: "2019-03-11" },
  { id: "E-102", name: "Théo Marchand",     role: "reception",    department: "Front Office",  email: "theo@aurelia.com",     status: "active", shift: "15:00 – 23:00", joined: "2021-07-02" },
  { id: "E-103", name: "Amina Diallo",      role: "housekeeping", department: "Housekeeping",  email: "amina@aurelia.com",    status: "active", shift: "06:00 – 14:00", joined: "2020-01-18" },
  { id: "E-104", name: "Rafael Costa",      role: "housekeeping", department: "Housekeeping",  email: "rafael@aurelia.com",   status: "leave",  shift: "14:00 – 22:00", joined: "2018-09-04" },
  { id: "E-105", name: "Chef Léon Blanc",   role: "kitchen",      department: "F&B — Kitchen", email: "leon@aurelia.com",     status: "active", shift: "10:00 – 22:00", joined: "2017-05-22" },
  { id: "E-106", name: "Isabelle Roux",     role: "kitchen",      department: "F&B — Service", email: "isabelle@aurelia.com", status: "active", shift: "16:00 – 00:00", joined: "2022-11-30" },
  { id: "E-107", name: "Karim Haddad",      role: "admin",        department: "Management",    email: "karim@aurelia.com",    status: "active", shift: "09:00 – 18:00", joined: "2015-02-10" },
];

// ---------- Housekeeping ----------
export type RoomStatus = "dirty" | "in-progress" | "ready" | "maintenance";
export interface HKRoom { id: string; number: string; floor: number; type: string; status: RoomStatus; assignedTo?: string; note?: string; }
export const HK_ROOMS: HKRoom[] = [
  { id: "hk-201", number: "201", floor: 2, type: "Deluxe",       status: "dirty",       assignedTo: "Amina Diallo" },
  { id: "hk-202", number: "202", floor: 2, type: "Deluxe",       status: "in-progress", assignedTo: "Amina Diallo" },
  { id: "hk-204", number: "204", floor: 2, type: "Deluxe",       status: "ready" },
  { id: "hk-212", number: "212", floor: 2, type: "Deluxe",       status: "dirty" },
  { id: "hk-218", number: "218", floor: 2, type: "Deluxe",       status: "in-progress", assignedTo: "Rafael Costa" },
  { id: "hk-305", number: "305", floor: 3, type: "Deluxe",       status: "ready" },
  { id: "hk-402", number: "402", floor: 4, type: "Ocean Suite",  status: "dirty",       assignedTo: "Amina Diallo" },
  { id: "hk-410", number: "410", floor: 4, type: "Ocean Suite",  status: "maintenance", note: "AC service scheduled 14:00" },
  { id: "hk-412", number: "412", floor: 4, type: "Ocean Suite",  status: "ready" },
  { id: "hk-601", number: "601", floor: 6, type: "Presidential", status: "in-progress", assignedTo: "Rafael Costa" },
  { id: "hk-v01", number: "V-01",floor: 0, type: "Villa",        status: "ready" },
  { id: "hk-v03", number: "V-03",floor: 0, type: "Villa",        status: "dirty",       assignedTo: "Amina Diallo" },
];

// ---------- Kitchen / Restaurant orders ----------
export type OrderStatus = "new" | "preparing" | "ready" | "delivered";
export interface OrderItem { name: string; qty: number; note?: string }
export interface Order {
  id: string; table: string; server: string; placedAt: string;
  items: OrderItem[]; status: OrderStatus; type: "dine-in" | "room-service";
}
export const ORDERS: Order[] = [
  { id: "K-8801", table: "Terrace 4",   server: "Isabelle",  placedAt: "12:41", type: "dine-in",      status: "new",       items: [{ name: "Loup de mer",  qty: 2 }, { name: "Salade niçoise", qty: 1, note: "no anchovy" }, { name: "Sancerre 2019", qty: 1 }] },
  { id: "K-8802", table: "Suite 402",   server: "Théo",      placedAt: "12:47", type: "room-service", status: "new",       items: [{ name: "Club sandwich", qty: 1 }, { name: "Fries", qty: 1 }, { name: "Iced tea", qty: 2 }] },
  { id: "K-8803", table: "Salon 2",     server: "Isabelle",  placedAt: "12:38", type: "dine-in",      status: "preparing", items: [{ name: "Tuna tartare", qty: 1 }, { name: "Risotto milanese", qty: 2, note: "extra saffron" }] },
  { id: "K-8804", table: "Terrace 7",   server: "Isabelle",  placedAt: "12:32", type: "dine-in",      status: "preparing", items: [{ name: "Ratatouille", qty: 1 }, { name: "Duck confit", qty: 1 }, { name: "Rosé pichet", qty: 1 }] },
  { id: "K-8805", table: "Suite 601",   server: "Camille",   placedAt: "12:22", type: "room-service", status: "ready",     items: [{ name: "Caviar service", qty: 1 }, { name: "Champagne Brut", qty: 1 }] },
  { id: "K-8806", table: "Terrace 2",   server: "Isabelle",  placedAt: "12:05", type: "dine-in",      status: "delivered", items: [{ name: "Oysters (6)", qty: 2 }, { name: "Muscadet", qty: 1 }] },
];

// ---------- Inventory ----------
export interface StockItem {
  id: string; name: string; category: "Linen" | "Bath" | "Food" | "Beverage" | "Cleaning" | "Amenities";
  unit: string; onHand: number; reorderAt: number; par: number; supplier: string;
}
export const INVENTORY: StockItem[] = [
  { id: "I-1001", name: "King bedsheet set",       category: "Linen",     unit: "set",    onHand: 128, reorderAt: 60,  par: 180, supplier: "Frette" },
  { id: "I-1002", name: "Bath towel — ivory",      category: "Linen",     unit: "pc",     onHand: 42,  reorderAt: 80,  par: 200, supplier: "Frette" },
  { id: "I-1003", name: "Hermès soap 40g",         category: "Bath",      unit: "pc",     onHand: 220, reorderAt: 120, par: 400, supplier: "Hermès" },
  { id: "I-1004", name: "Hermès shampoo 40ml",     category: "Bath",      unit: "pc",     onHand: 74,  reorderAt: 120, par: 400, supplier: "Hermès" },
  { id: "I-1005", name: "Sea bass fillet",         category: "Food",      unit: "kg",     onHand: 18,  reorderAt: 25,  par: 60,  supplier: "Poissonnerie Marius" },
  { id: "I-1006", name: "Saffron threads",         category: "Food",      unit: "g",      onHand: 210, reorderAt: 100, par: 500, supplier: "Épices d'Or" },
  { id: "I-1007", name: "Champagne Brut",          category: "Beverage",  unit: "bottle", onHand: 96,  reorderAt: 40,  par: 150, supplier: "Ruinart" },
  { id: "I-1008", name: "Sancerre 2019",           category: "Beverage",  unit: "bottle", onHand: 34,  reorderAt: 40,  par: 120, supplier: "Domaine Vacheron" },
  { id: "I-1009", name: "Multi-surface cleaner",   category: "Cleaning",  unit: "L",      onHand: 62,  reorderAt: 30,  par: 100, supplier: "Écolab" },
  { id: "I-1010", name: "Disposable slippers",     category: "Amenities", unit: "pair",   onHand: 340, reorderAt: 200, par: 800, supplier: "Maison Blanc" },
];

// ---------- Guest invoices / loyalty ----------
export interface Invoice {
  id: string; date: string; description: string; amount: number; status: "paid" | "due" | "refunded";
}
export const INVOICES: Invoice[] = [
  { id: "INV-2026-0412", date: addDays(-1), description: "Suite 402 · 2 nights",              amount: 2360, status: "paid" },
  { id: "INV-2026-0398", date: addDays(-14), description: "Signature Spa · Aurélia ritual",    amount: 380,  status: "paid" },
  { id: "INV-2026-0377", date: addDays(-32), description: "Restaurant · Terrace dinner for 2", amount: 214,  status: "paid" },
  { id: "INV-2026-0355", date: addDays(-60), description: "Suite 402 · 3 nights",              amount: 3540, status: "paid" },
  { id: "INV-2026-0410", date: addDays(0),  description: "Mini-bar · Suite 402",              amount: 82,   status: "due" },
];

// ---------- Chat ----------
export interface ChatMessage { id: string; from: "guest" | "concierge"; text: string; at: string; }
export const CHAT: ChatMessage[] = [
  { id: "m1", from: "concierge", text: "Welcome back, Éloïse. Your terrace table for two at 20:30 is confirmed.", at: "10:12" },
  { id: "m2", from: "guest",     text: "Thank you. Could we also arrange a car to Èze at 15:00 tomorrow?",        at: "10:14" },
  { id: "m3", from: "concierge", text: "Of course. A Mercedes S-Class will meet you at the porte-cochère.",        at: "10:15" },
  { id: "m4", from: "guest",     text: "Perfect.",                                                                 at: "10:16" },
];

// ---------- Reviews ----------
export interface Review { id: string; author: string; stars: number; date: string; body: string; }
export const REVIEWS: Review[] = [
  { id: "r1", author: "Éloïse B.", stars: 5, date: addDays(-40), body: "Impeccable service and the terrace at dusk is unforgettable." },
  { id: "r2", author: "Marcus A.", stars: 5, date: addDays(-95), body: "The Pool Villa is a private world. Butler service was flawless." },
  { id: "r3", author: "Priya K.",  stars: 4, date: addDays(-160), body: "Beautiful property. Would have loved a late check-out." },
];

// ---------- Room service menu ----------
export interface MenuItem { id: string; name: string; category: string; price: number; description: string; }
export const MENU: MenuItem[] = [
  { id: "mi1", name: "Petit déjeuner continental", category: "Breakfast", price: 42, description: "Viennoiseries, seasonal fruit, yoghurt, coffee." },
  { id: "mi2", name: "Eggs Aurélia",                category: "Breakfast", price: 34, description: "Soft scramble, chives, sourdough toast." },
  { id: "mi3", name: "Club sandwich",               category: "All day",   price: 32, description: "Free-range chicken, tomato, aïoli, hand-cut fries." },
  { id: "mi4", name: "Loup de mer",                 category: "Dinner",    price: 62, description: "Whole roasted sea bass, fennel, citrus butter." },
  { id: "mi5", name: "Chocolate soufflé",           category: "Dessert",   price: 22, description: "Warm 70% Valrhona, crème anglaise." },
  { id: "mi6", name: "Champagne — Ruinart Brut",    category: "Cellar",    price: 180, description: "House pour, 750ml." },
];

// ---------- Super admin: chains / subscriptions / audit ----------
export interface Chain { id: string; name: string; hotels: number; country: string; plan: "Essential" | "Signature" | "Enterprise"; mrr: number; }
export const CHAINS: Chain[] = [
  { id: "ch-01", name: "Maison Aurélia Collection", hotels: 4,  country: "France",    plan: "Enterprise", mrr: 24800 },
  { id: "ch-02", name: "Meridian Resorts",           hotels: 12, country: "USA",       plan: "Enterprise", mrr: 62400 },
  { id: "ch-03", name: "Stonewood Hotels",           hotels: 6,  country: "UK",        plan: "Signature",  mrr: 18600 },
  { id: "ch-04", name: "Kaimana Islands",            hotels: 3,  country: "Maldives",  plan: "Signature",  mrr: 9300 },
  { id: "ch-05", name: "Nord Boutique",              hotels: 2,  country: "Norway",    plan: "Essential",  mrr: 2100 },
];

export interface Subscription { id: string; chain: string; plan: string; seats: number; renews: string; status: "active" | "trial" | "past-due"; amount: number; }
export const SUBSCRIPTIONS: Subscription[] = [
  { id: "sub-1001", chain: "Maison Aurélia Collection", plan: "Enterprise",  seats: 240, renews: addDays(180), status: "active",   amount: 24800 },
  { id: "sub-1002", chain: "Meridian Resorts",           plan: "Enterprise",  seats: 720, renews: addDays(90),  status: "active",   amount: 62400 },
  { id: "sub-1003", chain: "Stonewood Hotels",           plan: "Signature",   seats: 180, renews: addDays(45),  status: "active",   amount: 18600 },
  { id: "sub-1004", chain: "Kaimana Islands",            plan: "Signature",   seats: 90,  renews: addDays(-3),  status: "past-due", amount: 9300 },
  { id: "sub-1005", chain: "Nord Boutique",              plan: "Essential",   seats: 24,  renews: addDays(14),  status: "trial",    amount: 0 },
];

export interface AuditLog { id: string; at: string; actor: string; action: string; entity: string; ip: string; }
export const AUDIT: AuditLog[] = [
  { id: "a1", at: "2026-07-04 10:14", actor: "karim@aurelia.com",  action: "UPDATE_PRICING",     entity: "Room type: Ocean Suite",         ip: "88.14.22.9" },
  { id: "a2", at: "2026-07-04 09:42", actor: "camille@aurelia.com",action: "CHECKIN",            entity: "Booking AUR-10241",              ip: "10.0.4.22" },
  { id: "a3", at: "2026-07-04 09:11", actor: "system",             action: "SUBSCRIPTION_RENEW", entity: "Chain: Meridian Resorts",        ip: "—" },
  { id: "a4", at: "2026-07-03 22:07", actor: "theo@aurelia.com",   action: "REFUND",             entity: "Invoice INV-2026-0402 · €214",   ip: "10.0.4.31" },
  { id: "a5", at: "2026-07-03 18:33", actor: "amina@aurelia.com",  action: "ROOM_READY",         entity: "Room 305",                       ip: "10.0.6.14" },
];

// ---------- Analytics series ----------
export const REVENUE_SERIES = [
  { month: "Jan", revenue: 182000, adr: 690 },
  { month: "Feb", revenue: 214000, adr: 720 },
  { month: "Mar", revenue: 268000, adr: 760 },
  { month: "Apr", revenue: 312000, adr: 820 },
  { month: "May", revenue: 388000, adr: 890 },
  { month: "Jun", revenue: 462000, adr: 940 },
  { month: "Jul", revenue: 528000, adr: 980 },
  { month: "Aug", revenue: 561000, adr: 1020 },
  { month: "Sep", revenue: 442000, adr: 910 },
  { month: "Oct", revenue: 348000, adr: 830 },
  { month: "Nov", revenue: 262000, adr: 740 },
  { month: "Dec", revenue: 318000, adr: 810 },
];

export const OCCUPANCY_SERIES = REVENUE_SERIES.map((r, i) => ({
  month: r.month,
  occupancy: [52, 58, 64, 72, 81, 88, 94, 96, 84, 71, 60, 74][i],
}));

export const ROOM_TYPE_UTIL = [
  { type: "Deluxe",       nights: 1840 },
  { type: "Ocean Suite",  nights: 1220 },
  { type: "Villa",        nights: 620 },
  { type: "Presidential", nights: 190 },
];

export const RATINGS_SERIES = [
  { source: "Direct",     rating: 4.9 },
  { source: "Booking",    rating: 4.7 },
  { source: "Expedia",    rating: 4.6 },
  { source: "TripAdvisor",rating: 4.8 },
];

export const RESTAURANT_SALES = [
  { day: "Mon", covers: 84,  revenue: 6200 },
  { day: "Tue", covers: 92,  revenue: 7100 },
  { day: "Wed", covers: 108, revenue: 8400 },
  { day: "Thu", covers: 116, revenue: 9200 },
  { day: "Fri", covers: 148, revenue: 12800 },
  { day: "Sat", covers: 172, revenue: 15400 },
  { day: "Sun", covers: 138, revenue: 11200 },
];

export const AVAILABLE_ROOMS_FOR_ALLOC = ROOMS.map((r) => ({ id: r.id, name: r.name, price: r.price }));
