import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import spa from "@/assets/spa.jpg";

const RITUALS = [
  { name: "The Aurélia Signature", duration: "120 min", price: 380, body: "Sea-salt exfoliation, warm-stone massage, couture facial." },
  { name: "Hammam & Silver", duration: "90 min", price: 260, body: "Traditional hammam ritual finished with a silver-thread mask." },
  { name: "Deep Tissue Reset", duration: "75 min", price: 220, body: "For long-haul travellers — focused work on shoulders, neck, calves." },
  { name: "The Coastal Couples", duration: "150 min", price: 720, body: "For two — private cabin overlooking the sea, champagne finish." },
  { name: "Cellular Radiance Facial", duration: "80 min", price: 290, body: "A bespoke facial by Dr. Rey using cold-pressed plant peptides." },
  { name: "Sleep Recovery Ritual", duration: "100 min", price: 310, body: "Aromatherapy massage designed to reset circadian rhythm." },
];

export const Route = createFileRoute("/spa")({
  head: () => ({ meta: [{ title: "The Signature Spa — Maison Aurélia" }, { name: "description", content: "Seven treatment cabins, a marble hammam, and a vitality pool carved into the cliff." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Wellness" title={<>Rituals carved into the cliff</>} description="Seven treatment cabins overlooking the Mediterranean. Slowness, as an art." image={spa} />
      <section className="container-editorial py-24">
        <SectionHeading eyebrow="Rituals & Treatments" title={<>Our signature menu</>} />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {RITUALS.map((r) => (
            <div key={r.name} className="hover-lift border border-border bg-card p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl">{r.name}</h3>
                <div className="text-right"><div className="font-serif text-2xl text-[color:var(--gold)]">€{r.price}</div><div className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{r.duration}</div></div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  ),
});
