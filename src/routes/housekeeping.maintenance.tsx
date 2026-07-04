import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, DataTable, StatusPill } from "@/components/dashboard/widgets";
import { HK_ROOMS } from "@/mock/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/housekeeping/maintenance")({ component: Page });

function Page() {
  const items = HK_ROOMS.filter((r) => r.status === "maintenance").concat([
    { id: "m-1", number: "218", floor: 2, type: "Deluxe", status: "maintenance", note: "Bathroom tap dripping" },
    { id: "m-2", number: "V-01", floor: 0, type: "Villa",  status: "maintenance", note: "Poolside light bulb replacement" },
  ]);
  return (
    <>
      <PageHeader eyebrow="Engineering" title="Maintenance requests" description="Requests raised from the board and the concierge queue." />
      <Panel>
        <DataTable rows={items} columns={[
          { key: "room", header: "Room", render: (r) => `${r.number} · ${r.type}` },
          { key: "note", header: "Issue", render: (r) => r.note ?? "—" },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} /> },
          { key: "act", header: "", render: () => <button onClick={() => toast.success("Marked resolved")} className="text-xs eyebrow hover:text-[color:var(--gold)]">Resolve</button>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
