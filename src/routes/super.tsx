import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Building2, CreditCard, LineChart, Settings, ScrollText } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/super")({
  head: () => ({ meta: [{ title: "Super Admin — Aurélia Platform" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="super" nav={[
      { label: "Overview",      to: "/super",               icon: LayoutDashboard, exact: true },
      { label: "Hotel Chains",  to: "/super/chains",        icon: Building2 },
      { label: "Subscriptions", to: "/super/subscriptions", icon: CreditCard },
      { label: "Analytics",     to: "/super/analytics",     icon: LineChart },
      { label: "System",        to: "/super/settings",      icon: Settings },
      { label: "Audit Logs",    to: "/super/audit",         icon: ScrollText },
    ]}><Outlet /></DashboardShell>
  ),
});
