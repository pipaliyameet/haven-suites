import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { DataTable, KPICard, Panel } from "@/components/dashboard/widgets";
import { INVENTORY } from "@/mock/dashboard";
import { AlertTriangle, Boxes, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/inventory")({ component: Page });

function Page() {
  const low = INVENTORY.filter((i) => i.onHand < i.reorderAt);
  return (
    <>
      <PageHeader eyebrow="Stock" title="Inventory" description="Bedsheets, bath amenities, food, beverage, cleaning and guest amenities." />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KPICard label="Total SKUs"       value={INVENTORY.length} icon={Boxes} />
        <KPICard label="Low-stock alerts" value={low.length}       icon={AlertTriangle} tone={low.length ? "danger" : "default"} />
        <KPICard label="Above par"        value={INVENTORY.filter((i) => i.onHand >= i.par).length} icon={PackageCheck} tone="gold" />
      </div>
      <Panel>
        <DataTable rows={INVENTORY} columns={[
          { key: "name", header: "Item", render: (i) => <div><div>{i.name}</div><div className="text-xs text-muted-foreground">{i.supplier}</div></div> },
          { key: "cat", header: "Category", render: (i) => <span className="eyebrow text-[0.6rem]">{i.category}</span> },
          { key: "stock", header: "Stock", render: (i) => {
            const pct = Math.min(100, (i.onHand / i.par) * 100);
            const isLow = i.onHand < i.reorderAt;
            return (
              <div className="min-w-[10rem]">
                <div className="flex justify-between text-xs mb-1">
                  <span className={cn("tabular-nums", isLow && "text-destructive font-medium")}>{i.onHand} {i.unit}</span>
                  <span className="text-muted-foreground tabular-nums">/ {i.par}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={cn("h-full", isLow ? "bg-destructive" : pct > 70 ? "bg-emerald-600" : "bg-[color:var(--gold)]")} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          } },
          { key: "reorder", header: "Reorder at", render: (i) => <span className="tabular-nums text-xs">{i.reorderAt}</span> },
          { key: "act", header: "", render: (i) => <button onClick={() => toast.success(`PO for ${i.name} raised with ${i.supplier}`)} className={cn("text-xs eyebrow hover:text-[color:var(--gold)]", i.onHand >= i.reorderAt && "opacity-60")}>Reorder</button>, className: "text-right" },
        ]} />
      </Panel>
    </>
  );
}
