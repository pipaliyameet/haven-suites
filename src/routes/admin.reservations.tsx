import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS } from "@/mock/dashboard";

export const Route = createFileRoute("/admin/reservations")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Bookings" title="Reservations" description="Every reservation across the property, by channel and status." />
      <Panel>
        <DataTable rows={BOOKINGS} columns={[
          { key: "id", header: "Ref", render: (b) => <span className="font-mono text-xs">{b.id}</span> },
          { key: "guest", header: "Guest", render: (b) => <div><div>{b.guest}</div><div className="text-xs text-muted-foreground">{b.email}</div></div> },
          { key: "room", header: "Room", render: (b) => `${b.room} · ${b.roomType}` },
          { key: "dates", header: "Dates", render: (b) => <span className="tabular-nums text-xs">{b.checkIn} → {b.checkOut}</span> },
          { key: "src", header: "Source", render: (b) => b.source },
          { key: "status", header: "Status", render: (b) => <StatusPill status={b.status} /> },
          { key: "total", header: "Total", render: (b) => <span className="tabular-nums">{currency(b.total)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
