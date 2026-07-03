import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { OFFERS } from "@/mock/offers";
import { Check } from "lucide-react";
import hero from "@/assets/hero-resort.jpg";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title: "Special Offers — Maison Aurélia" }, { name: "description", content: "Curated escapes: a long weekend, a spa retreat, a private romance." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Offers" title={<>A few quietly curated escapes</>} image={hero} height="sm" />
      <section className="container-editorial py-20 grid gap-10 lg:grid-cols-2">
        {OFFERS.map((o) => (
          <article key={o.id} className="border border-border bg-card p-10 hover-lift">
            <div className="eyebrow">{o.eyebrow}</div>
            <h2 className="font-serif text-3xl mt-3">{o.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{o.description}</p>
            <ul className="mt-6 space-y-2">{o.includes.map((i) => <li key={i} className="flex items-center gap-2 text-sm"><Check size={14} className="text-[color:var(--gold)]" /> {i}</li>)}</ul>
            <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
              <div><div className="eyebrow text-[0.6rem] text-muted-foreground">From</div><div className="font-serif text-3xl text-[color:var(--gold)]">${o.from}<span className="text-sm text-muted-foreground"> / night · {o.nights} nights</span></div></div>
              <button className="btn-outline-gold">Reserve</button>
            </div>
          </article>
        ))}
      </section>
    </>
  ),
});
