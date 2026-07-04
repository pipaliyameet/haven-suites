import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, currency } from "@/components/dashboard/widgets";
import { MENU } from "@/mock/dashboard";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/room-service")({ component: Page });

function Page() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const inc = (id: string, d: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  const total = Object.entries(cart).reduce((s, [id, q]) => s + (MENU.find((m) => m.id === id)?.price ?? 0) * q, 0);
  const categories = Array.from(new Set(MENU.map((m) => m.category)));

  return (
    <>
      <PageHeader eyebrow="In-room dining" title="Order to your suite" description="The kitchen accepts orders round the clock; the cellar closes at 01:00." />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          {categories.map((cat) => (
            <section key={cat}>
              <div className="eyebrow flex items-center gap-3 mb-3"><span className="gold-rule" /> {cat}</div>
              <div className="grid gap-3 md:grid-cols-2">
                {MENU.filter((m) => m.category === cat).map((m) => (
                  <div key={m.id} className="bg-card border rounded-sm p-4 flex gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="font-serif text-lg">{m.name}</h4>
                        <span className="tabular-nums font-serif">{currency(m.price)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button onClick={() => inc(m.id, -1)} className="h-7 w-7 grid place-items-center border rounded-sm hover:bg-secondary"><Minus size={12} /></button>
                        <span className="w-6 text-center text-sm tabular-nums">{cart[m.id] ?? 0}</span>
                        <button onClick={() => inc(m.id, 1)} className="h-7 w-7 grid place-items-center border rounded-sm hover:bg-secondary"><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 self-start">
          <Panel title="Your order">
            {Object.values(cart).every((q) => !q) ? (
              <p className="text-sm text-muted-foreground italic">Nothing selected yet.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => {
                    const m = MENU.find((x) => x.id === id)!;
                    return (
                      <li key={id} className="flex justify-between text-sm">
                        <span>{q} × {m.name}</span>
                        <span className="tabular-nums">{currency(m.price * q)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <span className="eyebrow">Total</span>
                  <span className="font-serif text-2xl tabular-nums">{currency(total)}</span>
                </div>
                <button onClick={() => { toast.success("Order sent to kitchen"); setCart({}); }} className="btn-gold w-full mt-4"><ShoppingBag size={14} /> Send to suite</button>
              </>
            )}
          </Panel>
        </aside>
      </div>
    </>
  );
}
