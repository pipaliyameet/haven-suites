import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, Panel, StatusPill } from "@/components/dashboard/widgets";
import { EMPLOYEES, ROLE_META } from "@/mock/dashboard";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/employees")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="People" title="Employees" description="Roles, shifts, and status across the property."
        action={<button onClick={() => toast.info("Invite sent")} className="btn-gold"><UserPlus size={14} /> Invite</button>} />
      <Panel>
        <DataTable rows={EMPLOYEES} columns={[
          { key: "name", header: "Name", render: (e) => <div><div>{e.name}</div><div className="text-xs text-muted-foreground">{e.email}</div></div> },
          { key: "role", header: "Role", render: (e) => <span className="eyebrow text-[0.6rem]">{ROLE_META[e.role].label}</span> },
          { key: "dep", header: "Department", render: (e) => e.department },
          { key: "shift", header: "Shift", render: (e) => <span className="tabular-nums text-xs">{e.shift}</span> },
          { key: "joined", header: "Joined", render: (e) => e.joined },
          { key: "status", header: "Status", render: (e) => <StatusPill status={e.status} /> },
        ]} />
      </Panel>
    </>
  );
}
