import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PageIntro } from "@/components/site/PageIntro";
import { SectionHeading } from "@/components/site/SectionHeading";
import wedding from "@/assets/wedding.jpg";

export const Route = createFileRoute("/wedding-events")({
  head: () => ({ meta: [{ title: "Weddings & Private Events — Maison Aurélia" }, { name: "description", content: "Ceremonies in the Grand Salon, banquets in the Orangerie." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Weddings & Events" title={<>The occasion, remembered exactly.</>} image={wedding} description="An in-house atelier of planners, florists and pâtissiers." />
      <PageIntro>“The best wedding I have ever attended, and I have attended too many.” — L'Officiel</PageIntro>
      <section className="container-editorial pb-24">
        <SectionHeading eyebrow="How we work" title={<>An atelier, not a venue</>} description="A single planner from your first note through the last dance." />
        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {[{ t: "The Enquiry", b: "A private conversation over tea in the Grand Salon." }, { t: "The Design", b: "A bespoke moodboard by our creative director." }, { t: "The Rehearsal", b: "A full technical rehearsal the evening prior." }, { t: "The Day", b: "Held by a team of forty, kept invisible until you need them." }].map((c, i) => (
            <div key={c.t} className="border-t border-border pt-6"><div className="font-serif text-3xl text-[color:var(--gold)]">0{i + 1}</div><h3 className="font-serif text-xl mt-2">{c.t}</h3><p className="mt-2 text-sm text-muted-foreground">{c.b}</p></div>
          ))}
        </div>
      </section>
    </>
  ),
});
