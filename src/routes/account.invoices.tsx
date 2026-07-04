import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { INVOICES } from "@/mock/dashboard";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/invoices")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Billing" title="Invoices & folio" description="Every folio is signed by the general manager and archived for seven years." />
      <Panel>
        <DataTable rows={INVOICES} columns={[
          { key: "id", header: "Invoice", render: (i) => <span className="font-mono text-xs">{i.id}</span> },
          { key: "date", header: "Date", render: (i) => i.date },
          { key: "desc", header: "Description", render: (i) => i.description },
          { key: "amount", header: "Amount", render: (i) => <span className="tabular-nums">{currency(i.amount)}</span> },
          { key: "status", header: "Status", render: (i) => <StatusPill status={i.status} /> },
          { key: "dl", header: "", render: () => <button onClick={() => toast.success("PDF prepared", { description: "Sent to your email." })} className="text-xs inline-flex items-center gap-1.5 text-[color:var(--gold)] hover:underline"><Download size={12} /> PDF</button>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
