import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard, Panel, DataTable, StatusPill, currency } from "@/components/dashboard/widgets";
import { CHAINS, SUBSCRIPTIONS, REVENUE_SERIES } from "@/mock/dashboard";
import { Building2, DollarSign, Users, Activity } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/super/")({ component: Page });

function Page() {
  const mrr = CHAINS.reduce((s, c) => s + c.mrr, 0);
  const hotels = CHAINS.reduce((s, c) => s + c.hotels, 0);
  return (
    <>
      <PageHeader eyebrow="Platform" title="Aurélia — global overview" description="Every chain, every hotel, in one console." />
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <KPICard label="Hotel chains" value={CHAINS.length} icon={Building2} />
        <KPICard label="Properties"   value={hotels}         icon={Building2} tone="gold" />
        <KPICard label="MRR"          value={currency(mrr)} delta={14} icon={DollarSign} />
        <KPICard label="Active users" value="1,284"         delta={9}  icon={Users} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Platform revenue">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" } }} className="h-72">
            <AreaChart data={REVENUE_SERIES}>
              <defs><linearGradient id="pr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--gold)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v: number) => `€${(v/1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--gold)" fill="url(#pr)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </Panel>
        <Panel title="Platform health">
          <ul className="space-y-4">
            {[
              { k: "Uptime (30d)", v: "99.98%" },
              { k: "API latency p95", v: "184 ms" },
              { k: "Error rate", v: "0.03%" },
              { k: "Active sessions", v: "1,284" },
            ].map((r) => (
              <li key={r.k} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                <div className="flex items-center gap-2 text-sm"><Activity size={14} className="text-emerald-600" /> {r.k}</div>
                <span className="font-serif tabular-nums">{r.v}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Subscriptions" className="mt-6">
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
