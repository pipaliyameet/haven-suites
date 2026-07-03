import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { POSTS } from "@/mock/blog";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import restaurant from "@/assets/restaurant.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "The Journal — Maison Aurélia" }, { name: "description", content: "Quiet dispatches from the maison." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Journal" title={<>Quiet dispatches from the maison</>} image={restaurant} height="sm" />
      <section className="container-editorial py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <motion.a key={p.id} href="#" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.05 }} className="group flex flex-col">
              <div className="image-cover aspect-[4/5]"><img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" /></div>
              <div className="mt-5">
                <div className="eyebrow">{p.category} · {p.readMinutes} min</div>
                <h3 className="mt-3 font-serif text-2xl group-hover:text-[color:var(--gold)] transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">{p.author} · {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}<ArrowUpRight size={12} className="ml-auto" /></div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  ),
});
