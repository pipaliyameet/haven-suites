import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SUITES } from "@/mock/rooms";
import { motion } from "framer-motion";
import { Bed, Maximize2, Users, Check } from "lucide-react";
import pres from "@/assets/room-presidential.jpg";

export const Route = createFileRoute("/suites")({
  head: () => ({ meta: [{ title: "Luxury Suites — Maison Aurélia" }, { name: "description", content: "Ocean-facing suites, private villas and the Presidential." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Signature Residences" title={<>Suites for a slower kind of stay</>} description="Private terraces, butler service and rooms large enough to feel like a residence." image={pres} />
      <section className="container-editorial py-24 space-y-32">
        {SUITES.map((s, i) => (
          <motion.article key={s.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9 }} className={`grid gap-14 md:grid-cols-2 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className="image-cover aspect-[4/5]"><img src={s.image} alt={s.name} className="h-full w-full object-cover" loading="lazy" /></div>
            <div>
              <div className="eyebrow flex items-center gap-3"><span className="gold-rule" /> {s.category}</div>
              <h2 className="mt-4 font-serif text-5xl leading-[1.05]">{s.name}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{s.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Maximize2 size={14} /> {s.size} m²</span>
                <span className="inline-flex items-center gap-2"><Bed size={14} /> {s.beds}</span>
                <span className="inline-flex items-center gap-2"><Users size={14} /> Up to {s.guests}</span>
              </div>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check size={14} className="text-[color:var(--gold)]" /> {a}</li>)}
              </ul>
              <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
                <div><div className="eyebrow text-[0.6rem] text-muted-foreground">From</div><div className="font-serif text-4xl text-[color:var(--gold)]">${s.price}<span className="text-sm text-muted-foreground"> / night</span></div></div>
                <button className="btn-gold">Reserve</button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  ),
});
