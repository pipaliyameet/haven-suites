import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PageIntro } from "@/components/site/PageIntro";
import pool from "@/assets/pool.jpg";

export const Route = createFileRoute("/pool")({
  head: () => ({ meta: [{ title: "Pool & Beach — Maison Aurélia" }, { name: "description", content: "Infinity pool above the Mediterranean and a private beach cove." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Pool & Beach" title="Turquoise at every hour" image={pool} description="Two seawater pools, twelve cabanas and a private cove." />
      <PageIntro eyebrow="On the water">A day here begins slowly, at the pool bar, and ends slowly, at the pool bar.</PageIntro>
      <section className="container-editorial pb-24 grid gap-6 md:grid-cols-3">
        {[{ t: "Infinity Pool", b: "Heated seawater, open sunrise to sunset, cabanas by reservation." }, { t: "Adults' Pool", b: "A quieter, garden-side pool reserved for guests over sixteen." }, { t: "Private Cove", b: "Twelve minutes down the cliff steps to our stretch of pebble beach." }].map((c) => (
          <div key={c.t} className="border-t border-border pt-6"><div className="eyebrow">Feature</div><h3 className="font-serif text-2xl mt-2">{c.t}</h3><p className="mt-3 text-sm text-muted-foreground">{c.b}</p></div>
        ))}
      </section>
    </>
  ),
});
