import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/super/settings")({ component: Page });

function Page() {
  const flags = [
    { k: "New booking engine",     v: true,  desc: "Rollout to all chains" },
    { k: "AI concierge (private)", v: false, desc: "Beta with Aurélia only" },
    { k: "Two-factor enforcement", v: true,  desc: "Required for admin roles" },
    { k: "Data export API",        v: true,  desc: "Enterprise plans" },
  ];
  return (
    <>
      <PageHeader eyebrow="System" title="Platform settings" description="Feature flags, security posture, and integration keys." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Feature flags">
          <ul className="space-y-4">
            {flags.map((f) => (
              <li key={f.k} className="flex items-center justify-between border-b last:border-0 pb-3">
                <div>
                  <div className="font-serif">{f.k}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" defaultChecked={f.v} onChange={() => toast.success("Flag updated")} className="accent-[color:var(--gold)]" />
                </label>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Security">
          <ul className="space-y-4 text-sm">
            {[
              ["SSO", "Google Workspace, Okta"],
              ["Session policy", "8h idle · IP-bound"],
              ["Password policy", "16+ chars · rotated 90d"],
              ["Audit retention", "7 years"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between border-b pb-2 last:border-0"><span className="text-muted-foreground">{k}</span><span>{v}</span></li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
