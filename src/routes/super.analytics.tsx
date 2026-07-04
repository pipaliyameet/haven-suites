import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { REVENUE_SERIES, OCCUPANCY_SERIES, ROOM_TYPE_UTIL } from "@/mock/dashboard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/super/analytics")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Analytics" title="Platform analytics" description="Cross-tenant performance, deidentified." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Aggregate revenue">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" } }} className="h-64">
            <AreaChart data={REVENUE_SERIES}>
              <defs><linearGradient id="sa" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--gold)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v: number) => `€${(v/1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--gold)" fill="url(#sa)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </Panel>
        <Panel title="Occupancy">
          <ChartContainer config={{ occupancy: { label: "Occupancy %", color: "var(--navy)" } }} className="h-64">
            <LineChart data={OCCUPANCY_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="occupancy" stroke="var(--navy)" strokeWidth={2} dot={{ r: 3, fill: "var(--gold)" }} />
            </LineChart>
          </ChartContainer>
        </Panel>
        <Panel title="Popular room types" className="lg:col-span-2">
          <ChartContainer config={{ nights: { label: "Nights", color: "var(--navy)" } }} className="h-64">
            <BarChart data={ROOM_TYPE_UTIL}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="type" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="nights" fill="var(--navy)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </Panel>
      </div>
    </>
  );
}
