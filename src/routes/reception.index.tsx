import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard, Panel, DataTable, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS, GUESTS } from "@/mock/dashboard";
import { LogIn, LogOut, BedDouble, DoorOpen, Wallet } from "lucide-react";

export const Route = createFileRoute("/reception/")({ component: Page });

function Page() {
  const todayISO = new Date().toISOString().slice(0, 10);
  const checkins = BOOKINGS.filter((b) => b.checkIn === todayISO || b.status === "confirmed");
  const checkouts = BOOKINGS.filter((b) => b.checkOut === todayISO || b.status === "checked-in");
  const pending = BOOKINGS.filter((b) => b.balance > 0);
  const occupied = BOOKINGS.filter((b) => b.status === "checked-in").length;
  return (
    <>
      <PageHeader eyebrow="Front Desk" title="Today at the desk" description="A live view of arrivals, departures, and open folios." />
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <KPICard label="Today's check-in"  value={checkins.length} icon={LogIn} />
        <KPICard label="Today's check-out" value={checkouts.length} icon={LogOut} />
        <KPICard label="Occupied rooms"    value={`${occupied} / 84`} icon={BedDouble} />
        <KPICard label="Available rooms"   value={84 - occupied} icon={DoorOpen} tone="gold" />
        <KPICard label="Pending payments"  value={currency(pending.reduce((s,b) => s + b.balance, 0))} icon={Wallet} tone="danger" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel title="Recent bookings">
          <DataTable rows={BOOKINGS.slice(0, 8)} columns={[
            { key: "id", header: "Ref", render: (b) => <span className="font-mono text-xs">{b.id}</span> },
            { key: "guest", header: "Guest", render: (b) => <div><div>{b.guest}</div><div className="text-xs text-muted-foreground">{b.source}</div></div> },
            { key: "room", header: "Room", render: (b) => `${b.room} · ${b.roomType}` },
            { key: "dates", header: "Dates", render: (b) => <span className="tabular-nums text-xs">{b.checkIn} → {b.checkOut}</span> },
            { key: "status", header: "Status", render: (b) => <StatusPill status={b.status} /> },
            { key: "bal", header: "Balance", render: (b) => <span className="tabular-nums">{currency(b.balance)}</span>, className: "text-right" },
          ]} />
        </Panel>
        <Panel title="Pending requests">
          <ul className="space-y-3 text-sm">
            {[
              { g: "Amelia Chen · Suite 601", req: "Airport transfer 06:30 tomorrow" },
              { g: "Priya Kapoor · Villa V-01", req: "Late check-out request (15:00)" },
              { g: "Nikhil Rao · Room 218", req: "Extra pillow, firm" },
              { g: "Yuki Tanaka · Room 212", req: "Table for one, terrace, 20:00" },
            ].map((r, i) => (
              <li key={i} className="border-b pb-3 last:border-0">
                <div className="text-xs text-muted-foreground">{r.g}</div>
                <div>{r.req}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Guest directory" className="mt-6">
        <DataTable rows={GUESTS.slice(0, 5)} columns={[
          { key: "name", header: "Guest", render: (g) => <div><div>{g.name}</div><div className="text-xs text-muted-foreground">{g.email}</div></div> },
          { key: "country", header: "Country", render: (g) => g.country },
          { key: "tier", header: "Tier", render: (g) => <span className="eyebrow text-[color:var(--gold)]">{g.tier}</span> },
          { key: "stays", header: "Stays", render: (g) => g.stays },
          { key: "spend", header: "Lifetime", render: (g) => <span className="tabular-nums">{currency(g.spend)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
