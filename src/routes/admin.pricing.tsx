import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, currency } from "@/components/dashboard/widgets";
import { ROOMS } from "@/mock/rooms";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pricing")({ component: Page });

function Page() {
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return d;
  });
  const dow = (d: Date) => d.getDay();
  const seasonal = (base: number, d: Date) => Math.round(base * (dow(d) === 5 || dow(d) === 6 ? 1.25 : 1));
  return (
    <>
      <PageHeader eyebrow="Revenue Management" title="Rate calendar" description="Fourteen-day outlook. Weekends automatically flexed +25%." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 eyebrow">Room</th>
                {days.map((d) => (
                  <th key={d.toISOString()} className="px-2 py-2 text-center">
                    <div className="eyebrow text-[0.55rem]">{d.toLocaleDateString("en", { weekday: "short" })}</div>
                    <div className="tabular-nums font-serif text-sm mt-1">{d.getDate()}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROOMS.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-3 font-serif text-sm">{r.name}</td>
                  {days.map((d) => {
                    const p = seasonal(r.price, d);
                    return (
                      <td key={d.toISOString()} className="px-2 py-2 text-center">
                        <button onClick={() => toast.success(`Rate updated`)} className="w-full py-1.5 tabular-nums rounded-sm hover:bg-secondary">
                          <span className={dow(d) === 0 || dow(d) === 6 ? "text-[color:var(--gold)]" : ""}>{currency(p)}</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
