import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Wrench } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/housekeeping")({
  head: () => ({ meta: [{ title: "Housekeeping — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="housekeeping" nav={[
      { label: "Room Board",  to: "/housekeeping",             icon: LayoutDashboard, exact: true },
      { label: "Maintenance", to: "/housekeeping/maintenance", icon: Wrench },
    ]}><Outlet /></DashboardShell>
  ),
});
