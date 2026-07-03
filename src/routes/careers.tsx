import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PageIntro } from "@/components/site/PageIntro";
import exterior from "@/assets/hotel-exterior.jpg";
import { ArrowUpRight } from "lucide-react";

const OPENINGS = [
  { title: "Chef de Partie · Fish", dept: "Restaurant Solène", location: "On property" },
  { title: "Head Sommelier", dept: "Cellar", location: "On property" },
  { title: "Spa Therapist", dept: "The Signature Spa", location: "On property" },
  { title: "Front Desk Agent · Overnight", dept: "Reception", location: "On property" },
  { title: "Executive Housekeeper", dept: "Housekeeping", location: "On property" },
  { title: "Digital Product Manager", dept: "Corporate", location: "Paris" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — Maison Aurélia" }, { name: "description", content: "A very small, very devoted team. Roles at the maison." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Careers" title={<>A very devoted team</>} image={exterior} height="sm" />
      <PageIntro eyebrow="Working here">Our average tenure is nineteen years. We think that says most of what needs saying.</PageIntro>
      <section className="container-editorial pb-24">
        <div className="border-y border-border">
          {OPENINGS.map((o) => (
            <a key={o.title} href="#" className="group flex items-center justify-between gap-6 border-b border-border last:border-b-0 py-7 hover:bg-secondary/40 px-3 -mx-3 transition-colors">
              <div><h3 className="font-serif text-2xl group-hover:text-[color:var(--gold)] transition-colors">{o.title}</h3><div className="mt-1 text-xs text-muted-foreground tracking-wider uppercase">{o.dept} · {o.location}</div></div>
              <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-[color:var(--gold)] transition-colors" />
            </a>
          ))}
        </div>
      </section>
    </>
  ),
});
