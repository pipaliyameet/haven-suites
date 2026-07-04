import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS } from "@/mock/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/reception/invoices")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Folios" title="Invoices & payments" description="Open folios, ready-to-issue invoices, and collected payments across the property." />
      <Panel>
        <DataTable rows={BOOKINGS} columns={[
          { key: "id", header: "Booking", render: (b) => <span className="font-mono text-xs">{b.id}</span> },
          { key: "guest", header: "Guest", render: (b) => b.guest },
          { key: "total", header: "Total", render: (b) => <span className="tabular-nums">{currency(b.total)}</span> },
          { key: "balance", header: "Balance", render: (b) => <span className={"tabular-nums " + (b.balance > 0 ? "text-destructive" : "text-emerald-700")}>{currency(b.balance)}</span> },
          { key: "status", header: "Status", render: (b) => <StatusPill status={b.status} /> },
          { key: "act", header: "", render: (b) => (
            <div className="flex gap-2 justify-end">
              <button onClick={() => toast.success("Invoice generated")} className="text-xs eyebrow hover:text-[color:var(--gold)]">Generate</button>
              {b.balance > 0 && <button onClick={() => toast.success(`Collected ${currency(b.balance)}`)} className="text-xs eyebrow hover:text-[color:var(--gold)]">Collect</button>}
            </div>
          ), className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
