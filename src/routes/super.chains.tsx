import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, currency } from "@/components/dashboard/widgets";
import { CHAINS } from "@/mock/dashboard";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/super/chains")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Tenants" title="Hotel chains" description="Every chain on the platform, with property count and current plan."
        action={<button onClick={() => toast.info("Chain wizard")} className="btn-gold"><Plus size={14} /> New chain</button>} />
      <Panel>
        <DataTable rows={CHAINS} columns={[
          { key: "name", header: "Chain", render: (c) => <span className="font-serif">{c.name}</span> },
          { key: "country", header: "HQ", render: (c) => c.country },
          { key: "hotels", header: "Properties", render: (c) => c.hotels },
          { key: "plan", header: "Plan", render: (c) => <span className="eyebrow text-[0.6rem]">{c.plan}</span> },
          { key: "mrr", header: "MRR", render: (c) => <span className="tabular-nums">{currency(c.mrr)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
