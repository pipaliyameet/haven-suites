import roomSuite from "@/assets/room-suite.jpg";
import roomPres from "@/assets/room-presidential.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import pool from "@/assets/pool.jpg";

export interface Room {
  id: string; name: string; subtitle: string; category: string; price: number; size: number; beds: string; guests: number; view: string; amenities: string[]; image: string; description: string;
}

export const ROOMS: Room[] = [
  { id: "deluxe-garden", name: "Deluxe Garden Room", subtitle: "Serene retreat overlooking the maison gardens", category: "Room", price: 620, size: 48, beds: "King", guests: 2, view: "Garden", amenities: ["Rainfall shower","Private terrace","Nespresso bar","Complimentary minibar"], image: roomDeluxe, description: "Framed by sculpted cypress and dwarf citrus, the Deluxe Garden Room offers a quiet vantage of our seventeenth-century parterre." },
  { id: "ocean-suite", name: "Ocean Suite", subtitle: "Panoramic Mediterranean horizons at sunset", category: "Suite", price: 1180, size: 82, beds: "King + Sofa", guests: 3, view: "Ocean", amenities: ["Freestanding bathtub","Butler service","Sea-facing terrace","Hermès amenities"], image: roomSuite, description: "Floor-to-ceiling glazing frames the horizon as it shifts from cobalt to gold each evening. A private terrace invites long, unhurried mornings." },
  { id: "presidential", name: "Presidential Suite", subtitle: "The Maison's celebrated residence", category: "Presidential", price: 4200, size: 260, beds: "Two Kings", guests: 5, view: "Skyline", amenities: ["Private chef","Grand piano","Cinema room","Chauffeur on request"], image: roomPres, description: "A private residence within the hotel, hosting statesmen and film royalty since 1953." },
  { id: "pool-villa", name: "Pool Villa Aurélia", subtitle: "Private plunge pool and beachfront access", category: "Villa", price: 2650, size: 180, beds: "King", guests: 4, view: "Beachfront", amenities: ["Private pool","Outdoor lounge","Butler","Beach cabana"], image: pool, description: "A self-contained villa steps from the private beach — indoor-outdoor living around a mosaic-tiled plunge pool." },
];

export const SUITES = ROOMS.filter((r) => r.category !== "Room");
