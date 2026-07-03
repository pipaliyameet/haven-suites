import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PageIntro } from "@/components/site/PageIntro";
import conference from "@/assets/conference.jpg";

export const Route = createFileRoute("/conference")({
  head: () => ({ meta: [{ title: "Conferences & Boardrooms — Maison Aurélia" }, { name: "description", content: "Three boardrooms and a private dining salon." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Meetings" title="Boardrooms above the bay" image={conference} description="Discreet, connected, and served with our full culinary programme." />
      <PageIntro eyebrow="For decisions that matter">A place to meet quietly, without a single elevator to interrupt.</PageIntro>
      <section className="container-editorial pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[{ t: "Salon Vallonne", cap: "Up to 16", area: "84 m²", body: "Walnut boardroom with panoramic city view, private catering." }, { t: "Cabinet des Étoiles", cap: "Up to 10", area: "52 m²", body: "An intimate meeting room in the original 1927 wing." }, { t: "Orangerie", cap: "Up to 60", area: "180 m²", body: "For summits, dinners and product launches, with a garden terrace." }].map((c) => (
            <div key={c.t} className="border border-border bg-card p-8 hover-lift"><div className="eyebrow">{c.area} · {c.cap}</div><h3 className="font-serif text-2xl mt-2">{c.t}</h3><p className="mt-3 text-sm text-muted-foreground">{c.body}</p></div>
          ))}
        </div>
      </section>
    </>
  ),
});
