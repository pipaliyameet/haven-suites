import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, BedDouble, Users, CalendarRange, Tag, UtensilsCrossed, Boxes, LineChart } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Hotel Admin — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="admin" nav={[
      { label: "Overview",     to: "/admin",              icon: LayoutDashboard, exact: true },
      { label: "Rooms",        to: "/admin/rooms",        icon: BedDouble },
      { label: "Employees",    to: "/admin/employees",    icon: Users },
      { label: "Reservations", to: "/admin/reservations", icon: CalendarRange },
      { label: "Pricing",      to: "/admin/pricing",      icon: Tag },
      { label: "Restaurant",   to: "/admin/restaurant",   icon: UtensilsCrossed },
      { label: "Inventory",    to: "/admin/inventory",    icon: Boxes },
      { label: "Reports",      to: "/admin/reports",      icon: LineChart },
    ]}><Outlet /></DashboardShell>
  ),
});
