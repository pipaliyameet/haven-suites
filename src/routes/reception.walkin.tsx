import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, currency } from "@/components/dashboard/widgets";
import { AVAILABLE_ROOMS_FOR_ALLOC } from "@/mock/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/reception/walkin")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="New booking" title="Walk-in reservation" description="Take a guest from the lobby to a room in under two minutes." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Guest & stay">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Walk-in booked — folio open."); }} className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Full name", type: "text", placeholder: "Madame Marie Dupont" },
              { label: "Email", type: "email", placeholder: "guest@email.com" },
              { label: "Phone", type: "tel", placeholder: "+33 …" },
              { label: "ID / Passport", type: "text", placeholder: "e.g. 12FR34567" },
              { label: "Check-in", type: "date" },
              { label: "Check-out", type: "date" },
              { label: "Adults", type: "number", placeholder: "2" },
              { label: "Children", type: "number", placeholder: "0" },
            ].map((f) => (
              <label key={f.label} className="grid gap-1">
                <span className="eyebrow text-[0.55rem]">{f.label}</span>
                <input type={f.type} placeholder={f.placeholder} className="border rounded-sm px-3 py-2 text-sm bg-background outline-none focus:border-[color:var(--gold)]" />
              </label>
            ))}
            <button className="btn-gold md:col-span-2 mt-2 w-fit">Confirm & assign room</button>
          </form>
        </Panel>
        <Panel title="Live availability">
          <ul className="divide-y">
            {AVAILABLE_ROOMS_FOR_ALLOC.map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-serif">{r.name}</div>
                  <div className="text-xs text-muted-foreground tabular-nums">from {currency(r.price)} / night</div>
                </div>
                <span className="eyebrow text-emerald-700 text-[0.55rem]">● Available</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
