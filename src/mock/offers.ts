export interface Offer { id: string; title: string; eyebrow: string; description: string; includes: string[]; from: number; nights: number }

export const OFFERS: Offer[] = [
  { id: "long-weekend", title: "A Long Weekend by the Sea", eyebrow: "Fourth night complimentary", description: "Slow mornings, sunset apéritifs on the terrace and a private tour of the cellars.", includes: ["Fourth night on the house","Daily breakfast","Sunset cellar tasting","Late 4pm checkout"], from: 620, nights: 4 },
  { id: "spa-retreat", title: "The Signature Spa Retreat", eyebrow: "Two nights · Two treatments", description: "A pair of couture facials, sea-salt massages and unhurried afternoons in the hammam.", includes: ["Two 90-minute treatments","Hammam & vitality pool access","Ayurvedic tasting menu","Chauffeur transfer"], from: 980, nights: 2 },
  { id: "romance", title: "The Aurélia Romance", eyebrow: "For two", description: "A curated escape for couples: a private chef's tasting, a champagne turndown and a helicopter tour of the coast.", includes: ["Chef's tasting for two","Champagne turndown","Coastal helicopter tour","Ocean Suite upgrade"], from: 2450, nights: 3 },
  { id: "family", title: "A Family Summer", eyebrow: "Second room half price", description: "Interconnecting suites, an atelier for young guests, and afternoons at the private beach.", includes: ["50% off second room","Petit Aurélia atelier","Daily beach cabana","Family dining menu"], from: 1180, nights: 5 },
];

export interface Package { id: string; title: string; duration: string; price: number; description: string }
export const PACKAGES: Package[] = [
  { id: "p1", title: "Bed & Breakfast", duration: "Per night", price: 620, description: "Room with our full French breakfast served in-room or in the orangerie." },
  { id: "p2", title: "Half Board", duration: "Per night", price: 780, description: "Breakfast and a three-course dinner at Restaurant Solène." },
  { id: "p3", title: "Full Board", duration: "Per night", price: 940, description: "All meals included with a daily glass of house champagne." },
  { id: "p4", title: "Wellness All-Inclusive", duration: "Per person, per night", price: 1240, description: "Meals, one signature treatment daily, and yoga at dawn." },
];
