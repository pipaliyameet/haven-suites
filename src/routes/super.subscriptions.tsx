import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, KPICard, Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { SUBSCRIPTIONS } from "@/mock/dashboard";
import { CreditCard, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/super/subscriptions")({ component: Page });

function Page() {
  const mrr = SUBSCRIPTIONS.reduce((s, x) => s + x.amount, 0);
  const past = SUBSCRIPTIONS.filter((s) => s.status === "past-due").length;
  return (
    <>
      <PageHeader eyebrow="Billing" title="Subscriptions" description="Recurring revenue, plan tier, and renewal risk." />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KPICard label="MRR"       value={currency(mrr)}     icon={CreditCard} tone="gold" delta={11} />
        <KPICard label="Expansion" value="+€8,400"           icon={TrendingUp} delta={22} />
        <KPICard label="Past due"  value={past}              icon={TrendingDown} tone={past ? "danger" : "default"} />
      </div>
      <Panel>
        <DataTable rows={SUBSCRIPTIONS} columns={[
          { key: "chain", header: "Chain", render: (s) => s.chain },
          { key: "plan", header: "Plan", render: (s) => <span className="eyebrow text-[0.6rem]">{s.plan}</span> },
          { key: "seats", header: "Seats", render: (s) => s.seats },
          { key: "renews", header: "Renews", render: (s) => s.renews },
          { key: "status", header: "Status", render: (s) => <StatusPill status={s.status} /> },
          { key: "amount", header: "MRR", render: (s) => <span className="tabular-nums">{currency(s.amount)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
