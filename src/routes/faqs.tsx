import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FAQS } from "@/mock/blog";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQs — Maison Aurélia" }, { name: "description", content: "Practical questions, quietly answered." }] }),
  component: FaqsPage,
});

function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow="Questions" title={<>Quietly answered</>} image={exterior} height="sm" />
      <section className="container-editorial py-20 max-w-3xl">
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                  {isOpen ? <Minus size={18} className="text-[color:var(--gold)] shrink-0" /> : <Plus size={18} className="shrink-0" />}
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}><div className="overflow-hidden text-muted-foreground leading-relaxed">{f.a}</div></div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
