import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, currency } from "@/components/dashboard/widgets";
import { BOOKINGS } from "@/mock/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/reception/checkout")({ component: Page });

function Page() {
  const departing = BOOKINGS.filter((b) => b.status === "checked-in");
  return (
    <>
      <PageHeader eyebrow="Departures" title="Check-out queue" description="Settle folios, capture feedback, and release the room to housekeeping." />
      <Panel>
        <DataTable rows={departing} columns={[
          { key: "guest", header: "Guest", render: (b) => <div><div>{b.guest}</div><div className="text-xs text-muted-foreground">Room {b.room}</div></div> },
          { key: "nights", header: "Stayed", render: (b) => `${b.nights} nights` },
          { key: "extras", header: "Mini-bar", render: () => <span className="tabular-nums">{currency(Math.round(Math.random() * 200))}</span> },
          { key: "balance", header: "Total due", render: (b) => <span className="tabular-nums font-serif">{currency(b.balance)}</span> },
          { key: "act", header: "", render: (b) => <button onClick={() => toast.success(`${b.guest} checked out`)} className="btn-outline-gold text-[0.6rem] px-3 py-1.5">Settle & release</button>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
