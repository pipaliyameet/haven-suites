import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS, INVOICES } from "@/mock/dashboard";
import { BedDouble, Sparkles, Star, Wallet, ArrowUpRight } from "lucide-react";
import roomSuite from "@/assets/room-suite.jpg";

export const Route = createFileRoute("/account/")({ component: GuestOverview });

function GuestOverview() {
  const upcoming = BOOKINGS.find((b) => b.status === "confirmed");
  const current = BOOKINGS.find((b) => b.status === "checked-in");
  const dueTotal = INVOICES.filter((i) => i.status === "due").reduce((s, i) => s + i.amount, 0);

  return (
    <>
      <PageHeader eyebrow="Guest Account" title="Bonjour, Éloïse." description="A quiet summary of your stay, your requests, and everything the maison is holding for you." />

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <KPICard label="Loyalty tier" value="Platinum" hint="1,840 pts to Noir" icon={Sparkles} tone="gold" />
        <KPICard label="Nights this year" value="14" delta={22} icon={BedDouble} />
        <KPICard label="Open balance" value={currency(dueTotal)} hint="Auto-settled at check-out" icon={Wallet} />
        <KPICard label="Reviews" value="4.9★" hint="Across 3 reviews" icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Current stay" action={<Link to="/account/bookings" className="text-xs eyebrow hover:text-[color:var(--gold)]">All bookings <ArrowUpRight className="inline" size={12} /></Link>}>
          {current ? (
            <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
              <div className="image-cover aspect-[4/3]"><img src={roomSuite} alt="" className="h-full w-full object-cover" /></div>
              <div>
                <div className="eyebrow">{current.id}</div>
                <h4 className="font-serif text-2xl mt-1">{current.roomType} · Suite {current.room}</h4>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <Info label="Check-in" value={current.checkIn} />
                  <Info label="Check-out" value={current.checkOut} />
                  <Info label="Guests" value={String(current.guests)} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <StatusPill status={current.status} />
                  <span className="text-sm text-muted-foreground">Balance {currency(current.balance)}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to="/account/room-service" className="btn-outline-gold text-[0.65rem] px-4 py-2">Order to room</Link>
                  <Link to="/account/chat" className="btn-outline-gold text-[0.65rem] px-4 py-2">Message concierge</Link>
                </div>
              </div>
            </div>
          ) : <p className="text-muted-foreground text-sm italic">No active stay.</p>}
        </Panel>

        <div className="space-y-6">
          <Panel title="Upcoming">
            {upcoming ? (
              <div>
                <div className="eyebrow">{upcoming.id}</div>
                <h4 className="font-serif text-xl mt-1">{upcoming.roomType}</h4>
                <p className="text-sm text-muted-foreground mt-1">{upcoming.checkIn} → {upcoming.checkOut} · {upcoming.nights} nights</p>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <span className="text-sm">Total</span>
                  <span className="font-serif text-lg tabular-nums">{currency(upcoming.total)}</span>
                </div>
              </div>
            ) : <p className="text-muted-foreground text-sm italic">Nothing on the horizon.</p>}
          </Panel>
          <Panel title="Recent invoices">
            <ul className="divide-y">
              {INVOICES.slice(0, 3).map((i) => (
                <li key={i.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="text-sm">{i.description}</div>
                    <div className="text-xs text-muted-foreground">{i.date} · {i.id}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums text-sm">{currency(i.amount)}</span>
                    <StatusPill status={i.status} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><div className="eyebrow text-[0.55rem]">{label}</div><div className="font-serif text-lg mt-1">{value}</div></div>;
}
