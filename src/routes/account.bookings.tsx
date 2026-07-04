import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS } from "@/mock/dashboard";

export const Route = createFileRoute("/account/bookings")({ component: GuestBookings });

function GuestBookings() {
  return (
    <>
      <PageHeader eyebrow="Ledger" title="Your bookings" description="Past and future stays across the maison." />
      <Panel>
        <DataTable rows={BOOKINGS} columns={[
          { key: "id", header: "Reference", render: (b) => <span className="font-mono text-xs">{b.id}</span> },
          { key: "type", header: "Room", render: (b) => <div><div>{b.roomType}</div><div className="text-xs text-muted-foreground">Room {b.room}</div></div> },
          { key: "dates", header: "Dates", render: (b) => <div className="tabular-nums text-sm">{b.checkIn} → {b.checkOut}</div> },
          { key: "nights", header: "Nights", render: (b) => <span className="tabular-nums">{b.nights}</span> },
          { key: "status", header: "Status", render: (b) => <StatusPill status={b.status} /> },
          { key: "total", header: "Total", render: (b) => <span className="tabular-nums font-serif">{currency(b.total)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
