import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard, Panel, currency } from "@/components/dashboard/widgets";
import { BOOKINGS, REVENUE_SERIES, OCCUPANCY_SERIES, ROOM_TYPE_UTIL } from "@/mock/dashboard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { BedDouble, DollarSign, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: Page });

function Page() {
  const revenueYTD = REVENUE_SERIES.reduce((s, r) => s + r.revenue, 0);
  return (
    <>
      <PageHeader eyebrow="Property Operations" title="Maison Aurélia — today" description="A single view across bookings, revenue, and inventory." />
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <KPICard label="Revenue YTD"    value={currency(revenueYTD)} delta={12} icon={DollarSign} tone="gold" />
        <KPICard label="Occupancy"      value="88%" delta={4} icon={BedDouble} />
        <KPICard label="ADR"            value={currency(940)} delta={6} icon={TrendingUp} />
        <KPICard label="In-house"       value={BOOKINGS.filter((b) => b.status === "checked-in").length} icon={Users} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Revenue — trailing 12 months">
          <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--gold)" } }} className="h-72">
            <AreaChart data={REVENUE_SERIES} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--gold)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v: number) => `€${(v/1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--gold)" fill="url(#rv)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </Panel>
        <Panel title="Occupancy">
          <ChartContainer config={{ occupancy: { label: "Occupancy %", color: "var(--navy)" } }} className="h-72">
            <LineChart data={OCCUPANCY_SERIES} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v: number) => `${v}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="occupancy" stroke="var(--navy)" strokeWidth={2} dot={{ r: 3, fill: "var(--gold)" }} />
            </LineChart>
          </ChartContainer>
        </Panel>
      </div>
      <Panel title="Room-type utilization" className="mt-6">
        <ChartContainer config={{ nights: { label: "Nights sold", color: "var(--navy)" } }} className="h-64">
          <BarChart data={ROOM_TYPE_UTIL} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="type" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="nights" fill="var(--navy)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </Panel>
    </>
  );
}
