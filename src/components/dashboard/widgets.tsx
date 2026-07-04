import { type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function KPICard({
  label, value, delta, hint, icon: Icon, tone = "default",
}: { label: string; value: ReactNode; delta?: number; hint?: string; icon?: React.ComponentType<{ size?: number }>; tone?: "default" | "gold" | "danger" }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={cn(
      "bg-card border rounded-sm p-5 relative overflow-hidden",
      tone === "gold" && "border-[color:var(--gold)]/40",
      tone === "danger" && "border-destructive/40",
    )}>
      <div className="flex items-start justify-between">
        <div className="eyebrow text-[0.6rem]">{label}</div>
        {Icon && <span className="text-[color:var(--gold)]"><Icon size={16} /></span>}
      </div>
      <div className="mt-4 font-serif text-4xl leading-none tabular-nums">{value}</div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {typeof delta === "number" && (
          <span className={cn("inline-flex items-center gap-1 font-medium", up ? "text-emerald-700" : "text-destructive")}>
            {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-[color:var(--gold)]" />
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("bg-card border rounded-sm", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="font-serif text-lg">{title}</h3>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatusPill({ status }: { status: string }) {
  const key = status.toLowerCase();
  const map: Record<string, string> = {
    "confirmed":    "bg-blue-50 text-blue-700 border-blue-200",
    "pending":      "bg-amber-50 text-amber-700 border-amber-200",
    "checked-in":   "bg-emerald-50 text-emerald-700 border-emerald-200",
    "checked-out":  "bg-neutral-100 text-neutral-600 border-neutral-200",
    "cancelled":    "bg-red-50 text-red-700 border-red-200",
    "paid":         "bg-emerald-50 text-emerald-700 border-emerald-200",
    "due":          "bg-amber-50 text-amber-700 border-amber-200",
    "refunded":     "bg-neutral-100 text-neutral-600 border-neutral-200",
    "active":       "bg-emerald-50 text-emerald-700 border-emerald-200",
    "trial":        "bg-blue-50 text-blue-700 border-blue-200",
    "past-due":     "bg-red-50 text-red-700 border-red-200",
    "leave":        "bg-amber-50 text-amber-700 border-amber-200",
    "off":          "bg-neutral-100 text-neutral-600 border-neutral-200",
    "dirty":        "bg-amber-50 text-amber-700 border-amber-200",
    "in-progress":  "bg-blue-50 text-blue-700 border-blue-200",
    "ready":        "bg-emerald-50 text-emerald-700 border-emerald-200",
    "maintenance":  "bg-red-50 text-red-700 border-red-200",
    "new":          "bg-blue-50 text-blue-700 border-blue-200",
    "preparing":    "bg-amber-50 text-amber-700 border-amber-200",
    "delivered":    "bg-neutral-100 text-neutral-600 border-neutral-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-[0.12em] font-medium", map[key] ?? "bg-secondary text-foreground border-border")}>
      <span className="h-1 w-1 rounded-full bg-current" /> {status}
    </span>
  );
}

export function DataTable<T extends { id: string }>({
  rows, columns, empty,
}: {
  rows: T[];
  columns: { key: string; header: string; render: (r: T) => ReactNode; className?: string }[];
  empty?: string;
}) {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground italic py-8 text-center">{empty ?? "Nothing here yet."}</p>;
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left eyebrow text-[0.6rem] border-b">
            {columns.map((c) => <th key={c.key} className={cn("px-5 py-3 font-medium", c.className)}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-secondary/40 transition-colors">
              {columns.map((c) => <td key={c.key} className={cn("px-5 py-3.5 align-middle", c.className)}>{c.render(r)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16 border border-dashed rounded-sm">
      <div className="eyebrow">Nothing here</div>
      <h4 className="font-serif text-2xl mt-2">{title}</h4>
      {description && <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function currency(n: number, c = "EUR") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
}
