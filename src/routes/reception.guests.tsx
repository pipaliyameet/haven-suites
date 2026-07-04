import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, currency } from "@/components/dashboard/widgets";
import { GUESTS } from "@/mock/dashboard";

export const Route = createFileRoute("/reception/guests")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="CRM" title="Guest directory" description="Every guest we've served, with tier, spend, and preferences at a glance." />
      <Panel>
        <DataTable rows={GUESTS} columns={[
          { key: "name", header: "Guest", render: (g) => <div><div>{g.name}</div><div className="text-xs text-muted-foreground">{g.email}</div></div> },
          { key: "phone", header: "Phone", render: (g) => <span className="tabular-nums text-xs">{g.phone}</span> },
          { key: "country", header: "Country", render: (g) => g.country },
          { key: "tier", header: "Tier", render: (g) => <span className="eyebrow text-[color:var(--gold)]">{g.tier}</span> },
          { key: "stays", header: "Stays", render: (g) => g.stays },
          { key: "spend", header: "Lifetime", render: (g) => <span className="tabular-nums">{currency(g.spend)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
