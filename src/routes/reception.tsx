import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, LogOut, UserPlus, Users, Receipt } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/reception")({
  head: () => ({ meta: [{ title: "Front Desk — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="reception" nav={[
      { label: "Dashboard",   to: "/reception",          icon: LayoutDashboard, exact: true },
      { label: "Check-in",    to: "/reception/checkin",  icon: LogIn },
      { label: "Check-out",   to: "/reception/checkout", icon: LogOut },
      { label: "Walk-in",     to: "/reception/walkin",   icon: UserPlus },
      { label: "Guests",      to: "/reception/guests",   icon: Users },
      { label: "Invoices",    to: "/reception/invoices", icon: Receipt },
    ]}><Outlet /></DashboardShell>
  ),
});
