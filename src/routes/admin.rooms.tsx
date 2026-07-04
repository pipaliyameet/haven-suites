import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, currency } from "@/components/dashboard/widgets";
import { ROOMS } from "@/mock/rooms";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/rooms")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Inventory" title="Rooms & suites" description="Room master data — categories, capacities, and rack rates."
        action={<button onClick={() => toast.info("Room editor")} className="btn-gold"><Plus size={14} /> Add room</button>} />
      <Panel>
        <DataTable rows={ROOMS} columns={[
          { key: "name", header: "Name", render: (r) => <div><div className="font-serif">{r.name}</div><div className="text-xs text-muted-foreground">{r.subtitle}</div></div> },
          { key: "cat", header: "Category", render: (r) => <span className="eyebrow text-[0.6rem]">{r.category}</span> },
          { key: "size", header: "Size", render: (r) => `${r.size} m²` },
          { key: "beds", header: "Beds", render: (r) => r.beds },
          { key: "guests", header: "Max", render: (r) => r.guests },
          { key: "view", header: "View", render: (r) => r.view },
          { key: "price", header: "Rate", render: (r) => <span className="tabular-nums font-serif">{currency(r.price)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
