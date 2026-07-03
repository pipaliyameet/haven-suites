import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import restaurant from "@/assets/restaurant.jpg";
import { Clock, Utensils, Wine } from "lucide-react";

const MENU = [
  { section: "Entrées", items: [{ name: "Sea urchin & sourdough", price: 42, desc: "Marennes urchin, cultured cream, toasted levain" }, { name: "Heirloom tomato tartare", price: 34, desc: "Basil oil, aged sherry, olive powder" }, { name: "Foie gras, quince", price: 48, desc: "Torchon, poached Provençal quince, brioche" }] },
  { section: "Poissons", items: [{ name: "Line-caught sea bass", price: 62, desc: "Fennel confit, saffron beurre blanc, samphire" }, { name: "Blue lobster à la nage", price: 88, desc: "Court-bouillon, tarragon, fresh peas" }, { name: "Wild turbot on the bone", price: 76, desc: "For two · brown butter, capers, lemon" }] },
  { section: "Viandes", items: [{ name: "Salt-marsh lamb", price: 68, desc: "Anchovy, garden herbs, black garlic" }, { name: "Aged pigeon", price: 74, desc: "Roasted breast, confit leg, cherry gastrique" }, { name: "Wagyu, coal-roasted", price: 92, desc: "Miyazaki A5, hearth vegetables, bordelaise" }] },
  { section: "Desserts", items: [{ name: "Millefeuille vanille", price: 22, desc: "Bourbon vanilla, salted caramel" }, { name: "Soufflé Grand Marnier", price: 26, desc: "Bitter chocolate ice cream" }, { name: "Cheeses of the region", price: 28, desc: "Aged selection, fig chutney" }] },
];

export const Route = createFileRoute("/restaurant")({
  head: () => ({ meta: [{ title: "Restaurant Solène — Maison Aurélia" }, { name: "description", content: "Chef Solène Aubert composes a daily tasting menu around the morning's catch." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Restaurant Solène · Two Michelin Stars" title={<>A kitchen that whispers</>} description="Composed around the morning's catch, our kitchen garden, and whatever the season insists upon." image={restaurant} />
      <section className="container-editorial py-20 grid gap-8 md:grid-cols-3 text-center">
        {[{ icon: <Clock />, title: "Hours", body: "Breakfast · 07:00 – 10:30  ·  Dinner · 19:00 – 22:30" }, { icon: <Utensils />, title: "Menus", body: "À la carte, seven-course tasting, or bespoke chef's table" }, { icon: <Wine />, title: "Cellar", body: "Twelve thousand bottles · pairings by Sommelier Théo Léger" }].map((c) => (
          <div key={c.title} className="border-t border-border pt-6">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center text-[color:var(--gold)]">{c.icon}</div>
            <div className="eyebrow">{c.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </section>
      <section className="bg-secondary/40 py-24">
        <div className="container-editorial">
          <SectionHeading eyebrow="À la carte" title={<>The current menu</>} description="Composed daily by Chef Aubert. Prices in EUR, service included." />
          <div className="mt-16 grid gap-14 md:grid-cols-2">
            {MENU.map((s) => (
              <div key={s.section}>
                <div className="mb-6 flex items-center gap-3"><span className="gold-rule" /><h3 className="font-serif text-2xl italic">{s.section}</h3></div>
                <ul className="space-y-6">
                  {s.items.map((it) => (
                    <li key={it.name}>
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-serif text-xl">{it.name}</div>
                        <div className="flex-1 border-b border-dotted border-border/70 mx-2" />
                        <div className="font-serif text-lg text-[color:var(--gold)]">€{it.price}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{it.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center"><a href="#reserve" className="btn-gold">Reserve a table</a></div>
        </div>
      </section>
    </>
  ),
});
