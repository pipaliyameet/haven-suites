import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, currency } from "@/components/dashboard/widgets";
import { MENU } from "@/mock/dashboard";
import { useState } from "react";

export const Route = createFileRoute("/kitchen/menu")({ component: Page });

function Page() {
  const [avail, setAvail] = useState<Record<string, boolean>>(() => Object.fromEntries(MENU.map((m) => [m.id, true])));
  return (
    <>
      <PageHeader eyebrow="F&B" title="Menu availability" description="86 a dish with a tap. Servers see the change immediately." />
      <Panel>
        <DataTable rows={MENU} columns={[
          { key: "name", header: "Dish", render: (m) => <div><div className="font-serif">{m.name}</div><div className="text-xs text-muted-foreground">{m.description}</div></div> },
          { key: "cat", header: "Section", render: (m) => <span className="eyebrow text-[0.6rem]">{m.category}</span> },
          { key: "price", header: "Price", render: (m) => <span className="tabular-nums">{currency(m.price)}</span> },
          { key: "avail", header: "Available", render: (m) => (
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={avail[m.id]} onChange={(e) => setAvail((a) => ({ ...a, [m.id]: e.target.checked }))} className="accent-[color:var(--gold)]" />
              <span className="text-xs">{avail[m.id] ? "On menu" : "86'd"}</span>
            </label>
          ), className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
