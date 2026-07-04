import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard } from "@/components/dashboard/widgets";
import { ORDERS, type Order, type OrderStatus } from "@/mock/dashboard";
import { useEffect, useState } from "react";
import { Bell, ChefHat, Printer, Timer, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/kitchen/")({ component: Page });

const COLS: { id: OrderStatus; label: string; tint: string }[] = [
  { id: "new",       label: "New",       tint: "border-blue-300 bg-blue-50/30" },
  { id: "preparing", label: "Preparing", tint: "border-amber-300 bg-amber-50/30" },
  { id: "ready",     label: "Ready",     tint: "border-emerald-300 bg-emerald-50/30" },
  { id: "delivered", label: "Delivered", tint: "border-neutral-300 bg-neutral-50/40" },
];

const NEXT: Record<OrderStatus, OrderStatus | null> = { new: "preparing", preparing: "ready", ready: "delivered", delivered: null };

function Page() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);

  // simulate a new order every 45s
  useEffect(() => {
    const t = setInterval(() => {
      const id = `K-${8807 + Math.floor(Math.random() * 100)}`;
      const table = `Terrace ${1 + Math.floor(Math.random() * 8)}`;
      const now = new Date().toTimeString().slice(0, 5);
      const dish = ["Loup de mer", "Tuna tartare", "Duck confit", "Ratatouille"][Math.floor(Math.random() * 4)];
      setOrders((o) => [{ id, table, server: "Isabelle", placedAt: now, type: "dine-in", status: "new", items: [{ name: dish, qty: 1 }] }, ...o]);
      toast.info(`New ticket · ${id} · ${table}`);
    }, 45000);
    return () => clearInterval(t);
  }, []);

  const advance = (id: string) => setOrders((os) => os.map((o) => o.id === id && NEXT[o.status] ? { ...o, status: NEXT[o.status]! } : o));

  const counts = COLS.reduce((a, c) => ({ ...a, [c.id]: orders.filter((o) => o.status === c.id).length }), {} as Record<OrderStatus, number>);

  return (
    <>
      <PageHeader eyebrow="Kitchen Display System" title="Service en cours" description="Tap a card to advance it. New tickets arrive live." />
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <KPICard label="New tickets"  value={counts.new}       icon={Bell} tone="gold" />
        <KPICard label="On the pass"  value={counts.preparing} icon={ChefHat} />
        <KPICard label="Ready"        value={counts.ready}     icon={Utensils} />
        <KPICard label="Delivered"    value={counts.delivered} icon={Timer} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLS.map((c) => (
          <div key={c.id} className={cn("border rounded-sm p-3 min-h-[420px]", c.tint)}>
            <div className="flex items-center justify-between px-1 pb-3 border-b border-current/20 mb-3">
              <span className="eyebrow">{c.label}</span>
              <span className="text-xs tabular-nums">{counts[c.id]}</span>
            </div>
            <div className="space-y-2">
              {orders.filter((o) => o.status === c.id).map((o) => (
                <article key={o.id} className="bg-card border rounded-sm p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{o.id}</div>
                      <div className="font-serif text-lg">{o.table}</div>
                    </div>
                    <div className="text-right">
                      <div className="eyebrow text-[0.55rem]">{o.type === "room-service" ? "Room" : "Dine-in"}</div>
                      <div className="tabular-nums text-xs mt-1">{o.placedAt}</div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm">
                    {o.items.map((it, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{it.qty} × {it.name}</span>
                        {it.note && <em className="text-xs text-muted-foreground">{it.note}</em>}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => window.print()} className="text-[0.6rem] eyebrow inline-flex items-center gap-1.5 hover:text-[color:var(--gold)]"><Printer size={11} /> Print</button>
                    {NEXT[o.status] && (
                      <button onClick={() => advance(o.id)} className="ml-auto btn-outline-gold text-[0.6rem] px-3 py-1.5">→ {NEXT[o.status]}</button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
