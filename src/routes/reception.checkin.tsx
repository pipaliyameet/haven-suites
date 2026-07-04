import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel, StatusPill, currency } from "@/components/dashboard/widgets";
import { BOOKINGS, AVAILABLE_ROOMS_FOR_ALLOC } from "@/mock/dashboard";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, KeyRound, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reception/checkin")({ component: Page });

function Page() {
  const arriving = BOOKINGS.filter((b) => b.status === "confirmed");
  const [selected, setSelected] = useState(arriving[0]?.id);
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState(AVAILABLE_ROOMS_FOR_ALLOC[0].id);
  const booking = arriving.find((b) => b.id === selected)!;
  const steps = ["Verify guest", "Assign room", "Take payment", "Issue key"];

  return (
    <>
      <PageHeader eyebrow="Arrivals" title="Check-in a guest" description="A four-step flow ensuring the guest, the room, the folio, and the key are all in order." />
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <Panel title="Today's arrivals">
          <ul className="space-y-2">
            {arriving.map((b) => (
              <li key={b.id}>
                <button onClick={() => { setSelected(b.id); setStep(0); }} className={cn("w-full text-left border rounded-sm p-3 hover:border-[color:var(--gold)]", selected === b.id && "border-[color:var(--gold)] bg-secondary/50")}>
                  <div className="text-sm font-medium">{b.guest}</div>
                  <div className="text-xs text-muted-foreground">{b.roomType} · {b.nights}n · {currency(b.total)}</div>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={`Check-in · ${booking?.guest ?? ""}`}>
          <ol className="flex items-center gap-3 mb-6">
            {steps.map((s, i) => (
              <li key={s} className="flex-1 flex items-center gap-2">
                <span className={cn("h-7 w-7 grid place-items-center rounded-full text-xs border", i <= step ? "bg-[color:var(--navy)] text-ivory border-[color:var(--navy)]" : "text-muted-foreground")}>{i + 1}</span>
                <span className={cn("text-xs tracking-wide", i === step && "text-foreground font-medium", i > step && "text-muted-foreground")}>{s}</span>
                {i < steps.length - 1 && <span className="flex-1 h-px bg-border" />}
              </li>
            ))}
          </ol>
          {booking && (
            <div className="grid gap-4">
              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field icon={User} label="Name" value={booking.guest} />
                  <Field label="Email" value={booking.email} />
                  <Field label="Reference" value={booking.id} />
                  <Field label="Status" render={<StatusPill status={booking.status} />} />
                </div>
              )}
              {step === 1 && (
                <div>
                  <div className="eyebrow mb-2">Available rooms</div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {AVAILABLE_ROOMS_FOR_ALLOC.map((r) => (
                      <button key={r.id} onClick={() => setRoom(r.id)} className={cn("border rounded-sm p-3 text-left hover:border-[color:var(--gold)]", room === r.id && "border-[color:var(--gold)] bg-secondary/50")}>
                        <div className="font-serif">{r.name}</div>
                        <div className="text-xs text-muted-foreground tabular-nums">from {currency(r.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Total due" value={currency(booking.balance || booking.total)} />
                  <Field label="Method" render={<select className="border rounded-sm px-3 py-2 text-sm bg-background w-full"><option>Card on file</option><option>New card</option><option>Cash</option><option>Bank transfer</option></select>} />
                </div>
              )}
              {step === 3 && (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
                  <h4 className="font-serif text-2xl mt-4">Ready for the guest</h4>
                  <p className="text-sm text-muted-foreground mt-2">Present the key and escort them to the room.</p>
                </div>
              )}
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-xs eyebrow disabled:opacity-40">← Back</button>
                {step < 3 ? (
                  <button onClick={() => setStep(step + 1)} className="btn-gold">{step === 2 ? <><CreditCard size={14} /> Charge</> : "Continue"}</button>
                ) : (
                  <button onClick={() => { toast.success(`${booking.guest} checked in to ${AVAILABLE_ROOMS_FOR_ALLOC.find((r) => r.id === room)?.name}`); setStep(0); }} className="btn-gold"><KeyRound size={14} /> Issue key</button>
                )}
              </div>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}

function Field({ label, value, icon: Icon, render }: { label: string; value?: string; icon?: React.ComponentType<{ size?: number }>; render?: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow text-[0.55rem] flex items-center gap-1.5">{Icon && <Icon size={10} />} {label}</div>
      {render ?? <div className="font-serif text-lg mt-1">{value}</div>}
    </div>
  );
}
