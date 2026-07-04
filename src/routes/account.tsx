import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, BookMarked, Receipt, UtensilsCrossed, MessagesSquare, Star, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Guest Account — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <DashboardShell role="guest" nav={[
      { label: "Overview",       to: "/account",              icon: LayoutDashboard, exact: true },
      { label: "My Bookings",    to: "/account/bookings",     icon: BookMarked },
      { label: "Invoices",       to: "/account/invoices",     icon: Receipt },
      { label: "Room Service",   to: "/account/room-service", icon: UtensilsCrossed },
      { label: "Concierge Chat", to: "/account/chat",         icon: MessagesSquare },
      { label: "My Reviews",     to: "/account/reviews",      icon: Star },
      { label: "Profile",        to: "/account/profile",      icon: UserRound },
    ]}><Outlet /></DashboardShell>
  ),
});
