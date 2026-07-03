import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { TESTIMONIALS, AWARDS } from "@/mock/testimonials";
import { Star } from "lucide-react";
import hero from "@/assets/hero-resort.jpg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — Maison Aurélia" }, { name: "description", content: "A quiet chorus of returning voices." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Testimonials" title={<>In their words</>} image={hero} height="sm" />
      <section className="container-editorial py-20 grid gap-10 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.id} className="border border-border bg-card p-10 hover-lift">
            <div className="flex text-[color:var(--gold)] mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill="currentColor" />)}</div>
            <p className="font-serif text-2xl leading-snug italic">“{t.quote}”</p>
            <footer className="mt-6 eyebrow text-muted-foreground">{t.author} — {t.role}, {t.location}</footer>
          </blockquote>
        ))}
      </section>
      <section className="bg-[color:var(--navy)] text-ivory py-16">
        <div className="container-editorial text-center">
          <div className="eyebrow text-ivory/50 mb-6">Recognised by</div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-lg font-serif italic text-ivory/85">{AWARDS.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
      </section>
    </>
  ),
});
