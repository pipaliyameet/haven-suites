import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/kitchen")({
  head: () => ({ meta: [{ title: "Kitchen Display — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="kitchen" nav={[
      { label: "Kitchen Display", to: "/kitchen",      icon: LayoutDashboard, exact: true },
      { label: "Menu",            to: "/kitchen/menu", icon: BookOpen },
    ]}><Outlet /></DashboardShell>
  ),
});
