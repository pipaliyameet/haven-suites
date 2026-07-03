import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { RoomCard } from "@/components/site/RoomCard";
import { ROOMS } from "@/mock/rooms";
import suite from "@/assets/room-suite.jpg";

export const Route = createFileRoute("/rooms")({
  head: () => ({ meta: [{ title: "Rooms & Suites — Maison Aurélia" }, { name: "description", content: "Eighty-four rooms, suites and villas above the Mediterranean." }] }),
  component: RoomsPage,
});

const CATS = ["All", "Room", "Suite", "Presidential", "Villa"] as const;

function RoomsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "size">("price-asc");
  const rooms = useMemo(() => {
    let list = ROOMS.filter((r) => cat === "All" || r.category === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "size") list = [...list].sort((a, b) => b.size - a.size);
    return list;
  }, [cat, sort]);
  return (
    <>
      <PageHero eyebrow="Stays" title={<>Rooms with a quiet view</>} description="Eighty-four suites and villas, each renovated by Studio Aurélia." image={suite} />
      <section className="container-editorial py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex flex-wrap gap-1">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] font-medium transition-colors ${cat === c ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="eyebrow">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="bg-transparent border border-border px-3 py-2 text-sm">
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>
        {rooms.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground"><div className="font-serif text-2xl text-foreground">No rooms match your filters</div><p className="mt-2 text-sm">Try broadening your selection.</p></div>
        ) : (
          <div className="mt-14 grid gap-14 md:grid-cols-2 lg:grid-cols-3">{rooms.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}</div>
        )}
      </section>
    </>
  );
}
