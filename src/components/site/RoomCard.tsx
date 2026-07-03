import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bed, Maximize2, Users, ArrowUpRight } from "lucide-react";
import type { Room } from "@/mock/rooms";

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-card"
    >
      <div className="image-cover relative aspect-[4/5] w-full">
        <img src={room.image} alt={room.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[0.65rem] tracking-[0.22em] uppercase font-medium text-navy">{room.category}</div>
      </div>
      <div className="flex flex-col gap-4 px-1 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl leading-tight">{room.name}</h3>
            <div className="mt-1 text-xs text-muted-foreground">{room.subtitle}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="eyebrow text-[0.6rem] text-muted-foreground">From</div>
            <div className="font-serif text-2xl text-[color:var(--gold)]">${room.price}</div>
            <div className="text-[0.65rem] text-muted-foreground">per night</div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Maximize2 size={13} /> {room.size} m²</span>
          <span className="inline-flex items-center gap-1.5"><Bed size={13} /> {room.beds}</span>
          <span className="inline-flex items-center gap-1.5"><Users size={13} /> Up to {room.guests}</span>
        </div>
        <Link to="/rooms" className="mt-2 inline-flex items-center justify-between border-t border-border pt-4 text-[0.7rem] uppercase tracking-[0.22em] font-medium text-foreground group-hover:text-[color:var(--gold)] transition-colors">
          Discover the suite <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
