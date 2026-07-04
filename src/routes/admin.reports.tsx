import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { REVENUE_SERIES, OCCUPANCY_SERIES, ROOM_TYPE_UTIL, RATINGS_SERIES, RESTAURANT_SALES } from "@/mock/dashboard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, PolarAngleAxis, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin/reports")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Analytics" title="Reports" description="All the numbers the general manager reads with morning coffee." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Monthly revenue">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" } }} className="h-64">
            <AreaChart data={REVENUE_SERIES}>
              <defs><linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--gold)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v: number) => `€${(v/1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--gold)" fill="url(#a1)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </Panel>
        <Panel title="Occupancy rate">
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
        <Panel title="Room utilization (nights sold)">
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
        <Panel title="Customer ratings">
          <ChartContainer config={{ rating: { label: "Rating", color: "var(--gold)" } }} className="h-64">
            <RadialBarChart data={RATINGS_SERIES.map((r) => ({ ...r, fill: "var(--gold)" }))} innerRadius="30%" outerRadius="90%" startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 5]} tick={false} />
              <RadialBar dataKey="rating" background cornerRadius={4} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadialBarChart>
          </ChartContainer>
          <ul className="mt-4 space-y-1 text-xs">
            {RATINGS_SERIES.map((r) => <li key={r.source} className="flex justify-between"><span>{r.source}</span><span className="tabular-nums">{r.rating.toFixed(1)} ★</span></li>)}
          </ul>
        </Panel>
        <Panel title="Restaurant sales (this week)" className="lg:col-span-2">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" }, covers: { label: "Covers", color: "var(--navy)" } }} className="h-64">
            <BarChart data={RESTAURANT_SALES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--gold)" radius={[4,4,0,0]} />
              <Bar dataKey="covers" fill="var(--navy)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </Panel>
      </div>
    </>
  );
}
