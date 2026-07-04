import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel } from "@/components/dashboard/widgets";
import { AUDIT } from "@/mock/dashboard";
import { useState } from "react";

export const Route = createFileRoute("/super/audit")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const rows = AUDIT.filter((r) => `${r.actor} ${r.action} ${r.entity}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader eyebrow="Compliance" title="Audit logs" description="Every mutation across the platform, seven-year retention." />
      <Panel action={<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search actor, action…" className="border rounded-sm px-3 py-1.5 text-xs bg-background outline-none focus:border-[color:var(--gold)] w-64" />}>
        <DataTable rows={rows.map((r, i) => ({ ...r, id: r.id + i }))} columns={[
          { key: "at", header: "When", render: (r) => <span className="tabular-nums text-xs">{r.at}</span> },
          { key: "actor", header: "Actor", render: (r) => r.actor },
          { key: "action", header: "Action", render: (r) => <span className="eyebrow text-[0.6rem]">{r.action}</span> },
          { key: "entity", header: "Entity", render: (r) => r.entity },
          { key: "ip", header: "IP", render: (r) => <span className="font-mono text-xs">{r.ip}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
