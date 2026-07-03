import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PageIntro } from "@/components/site/PageIntro";
import { SectionHeading } from "@/components/site/SectionHeading";
import exterior from "@/assets/hotel-exterior.jpg";
import spa from "@/assets/spa.jpg";
import restaurant from "@/assets/restaurant.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About the Maison — Maison Aurélia" }, { name: "description", content: "Since 1927, a private headland retreat on the Côte d'Azur." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Our House · Est. 1927" title={<>A house older than the road that leads to it.</>} description="Nearly a century of quiet hospitality on a single crescent of Mediterranean coast." image={exterior} />
      <PageIntro eyebrow="A brief history">“We do not aspire to be the largest hotel on this coast — only the most deeply felt.”</PageIntro>
      <section className="container-editorial pb-24">
        <div className="grid gap-16 md:grid-cols-3">
          {[{ year: "1927", title: "The house opens", body: "Comtesse Aurélia de Vallonne opens her seaside residence to a discreet, invited clientele." },
            { year: "1953", title: "The Presidential Suite", body: "Statesmen and film royalty begin a tradition still kept in Suite 400." },
            { year: "1998", title: "Restaurant Solène", body: "A second star arrives; the kitchen becomes a destination in its own right." },
            { year: "2011", title: "The Signature Spa", body: "Seven treatment cabins carved directly into the cliff." },
            { year: "2019", title: "Studio Aurélia renovation", body: "Every suite reimagined in ivory, oak and antique-brass." },
            { year: "2024", title: "Forbes Five-Star", body: "A fourteenth consecutive year on the world's most demanding lists." }].map((m) => (
            <div key={m.year} className="border-t border-border pt-6">
              <div className="font-serif text-4xl text-[color:var(--gold)]">{m.year}</div>
              <h3 className="mt-2 font-serif text-2xl">{m.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-secondary/40 py-24">
        <div className="container-editorial grid gap-12 md:grid-cols-2 items-center">
          <img src={restaurant} alt="" className="image-cover aspect-[4/5] object-cover w-full" loading="lazy" />
          <div><SectionHeading align="left" eyebrow="Our craft" title={<>An unfashionable devotion to detail</>} description="From the pressed cotton of your morning newspaper to the temperature of the towels in the hammam." /></div>
        </div>
      </section>
      <section className="container-editorial py-24 text-center">
        <SectionHeading eyebrow="Our people" title={<>A very small, very devoted team</>} description="One hundred and eighty custodians across the maison, with an average tenure of nineteen years." />
        <img src={spa} alt="" className="mt-16 w-full h-[440px] object-cover" loading="lazy" />
      </section>
    </>
  ),
});
