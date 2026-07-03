import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PACKAGES } from "@/mock/offers";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [{ title: "Packages — Maison Aurélia" }, { name: "description", content: "Bed & breakfast, half board, full board and wellness all-inclusive." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Packages" title={<>Choose your rhythm</>} image={exterior} height="sm" />
      <section className="container-editorial py-20 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead><tr className="border-b border-border"><th className="eyebrow py-4">Package</th><th className="eyebrow py-4 hidden md:table-cell">Description</th><th className="eyebrow py-4">Duration</th><th className="eyebrow py-4 text-right">Price</th><th></th></tr></thead>
          <tbody>{PACKAGES.map((p) => (
            <tr key={p.id} className="border-b border-border/60 hover:bg-secondary/40 transition-colors">
              <td className="py-6 font-serif text-2xl">{p.title}</td>
              <td className="py-6 hidden md:table-cell text-sm text-muted-foreground max-w-md">{p.description}</td>
              <td className="py-6 text-sm">{p.duration}</td>
              <td className="py-6 text-right font-serif text-2xl text-[color:var(--gold)]">${p.price}</td>
              <td className="py-6 text-right"><button className="btn-outline-gold">Book</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </>
  ),
});
