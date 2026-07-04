import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, KPICard, DataTable, currency } from "@/components/dashboard/widgets";
import { MENU, RESTAURANT_SALES } from "@/mock/dashboard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Utensils, Users } from "lucide-react";

export const Route = createFileRoute("/admin/restaurant")({ component: Page });

function Page() {
  const totalRev = RESTAURANT_SALES.reduce((s, d) => s + d.revenue, 0);
  const totalCov = RESTAURANT_SALES.reduce((s, d) => s + d.covers, 0);
  return (
    <>
      <PageHeader eyebrow="F&B" title="Restaurant" description="Weekly performance and menu master."
        action={<Link to="/kitchen" className="btn-outline-gold">Open KDS</Link>} />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KPICard label="Week revenue" value={currency(totalRev)} delta={9} icon={Utensils} tone="gold" />
        <KPICard label="Covers"       value={totalCov}           delta={7} icon={Users} />
        <KPICard label="Avg per cover" value={currency(Math.round(totalRev/totalCov))} icon={Utensils} />
      </div>
      <Panel title="This week" className="mb-6">
        <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" } }} className="h-64">
          <BarChart data={RESTAURANT_SALES} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v: number) => `€${(v/1000).toFixed(0)}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--gold)" radius={[4,4,0,0]} />
          </BarChart>
        </ChartContainer>
      </Panel>
      <Panel title="Menu">
        <DataTable rows={MENU} columns={[
          { key: "name", header: "Dish", render: (m) => <div><div className="font-serif">{m.name}</div><div className="text-xs text-muted-foreground">{m.description}</div></div> },
          { key: "cat", header: "Section", render: (m) => <span className="eyebrow text-[0.6rem]">{m.category}</span> },
          { key: "price", header: "Price", render: (m) => <span className="tabular-nums">{currency(m.price)}</span>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
