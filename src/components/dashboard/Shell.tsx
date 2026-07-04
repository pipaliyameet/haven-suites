import { type ReactNode, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Search, Menu, ChevronRight } from "lucide-react";
import { ROLE_META, type Role } from "@/mock/dashboard";
import { SITE } from "@/constants/site";
import { clearRole, useRole } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";

export interface NavItem { label: string; to: string; icon: React.ComponentType<{ size?: number }>; exact?: boolean }

export function DashboardShell({
  role, nav, children, title,
}: { role: Role; nav: NavItem[]; children: ReactNode; title?: string }) {
  const current = useRole();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!current) navigate({ to: "/login" });
    else if (current !== role) navigate({ to: ROLE_META[current].home });
  }, [current, role, navigate]);

  const meta = ROLE_META[role];
  const active = (n: NavItem) => (n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/"));
  const crumb = nav.find(active)?.label ?? title ?? meta.label;

  return (
    <div className="min-h-svh bg-[color:var(--muted)]/40 grid grid-cols-1 lg:grid-cols-[16rem_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col bg-[color:var(--navy)] text-ivory h-svh sticky top-0">
        <div className="px-6 h-20 flex items-center gap-3 border-b border-white/10">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/60 text-[color:var(--gold)] font-serif italic">A</span>
          <div className="leading-tight">
            <div className="font-serif text-lg">{SITE.shortName}</div>
            <div className="eyebrow text-[0.55rem] text-[color:var(--gold-soft)]">{meta.badge}</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {nav.map((n) => (
            <Link
              key={n.to} to={n.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-[0.82rem] tracking-wide transition-colors",
                active(n) ? "bg-white/10 text-[color:var(--gold)]" : "text-ivory/70 hover:text-ivory hover:bg-white/5",
              )}
            >
              <n.icon size={16} />
              <span>{n.label}</span>
              {active(n) && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4 text-[0.7rem] text-ivory/60">
          <div className="eyebrow text-[0.55rem] text-[color:var(--gold-soft)]">Signed in as</div>
          <div className="mt-1 text-ivory">{meta.label}</div>
          <button
            onClick={() => { clearRole(); navigate({ to: "/login" }); }}
            className="mt-3 inline-flex items-center gap-2 text-ivory/70 hover:text-[color:var(--gold)]"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border">
          <div className="h-16 px-4 md:px-8 flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2" aria-label="Menu"><Menu size={18} /></button>
            <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
              <Link to={meta.home} className="hover:text-foreground">{meta.label}</Link>
              <ChevronRight size={12} />
              <span className="text-foreground">{crumb}</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <label className="hidden md:flex items-center gap-2 bg-secondary/60 rounded-sm px-3 py-1.5 text-xs w-72">
                <Search size={14} className="opacity-60" />
                <input placeholder="Search bookings, guests, rooms…" className="bg-transparent outline-none flex-1" />
              </label>
              <button className="relative p-2 rounded-sm hover:bg-secondary" aria-label="Notifications">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
              </button>
              <div className="h-9 w-9 rounded-full bg-[color:var(--navy)] text-ivory grid place-items-center text-xs font-medium">
                {meta.label.split(" ").map((s) => s[0]).join("").slice(0,2)}
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 min-w-0">{children}</div>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6 pb-6 border-b border-border mb-6">
      <div>
        {eyebrow && <div className="eyebrow flex items-center gap-3"><span className="gold-rule" /> {eyebrow}</div>}
        <h1 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">{title}</h1>
        {description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
