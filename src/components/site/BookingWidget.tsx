import { CalendarDays, MapPin, Users, BedDouble, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ dest: "Cap d'Aurélia", checkin: "", checkout: "", guests: "2 · 1 room", room: "Any" });
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); toast.success("Searching availability", { description: "Live inventory is on the way." }); }}
      className={`surface-glass shadow-editorial ${compact ? "p-3" : "p-4 md:p-5"} grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-stretch gap-2`}
    >
      <Field icon={<MapPin size={14} />} label="Destination"><input value={form.dest} onChange={(e) => setForm({ ...form, dest: e.target.value })} className="widget-input" /></Field>
      <Field icon={<CalendarDays size={14} />} label="Check in"><input type="date" value={form.checkin} onChange={(e) => setForm({ ...form, checkin: e.target.value })} className="widget-input" /></Field>
      <Field icon={<CalendarDays size={14} />} label="Check out"><input type="date" value={form.checkout} onChange={(e) => setForm({ ...form, checkout: e.target.value })} className="widget-input" /></Field>
      <Field icon={<Users size={14} />} label="Guests"><select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="widget-input">{["1 · 1 room","2 · 1 room","2 · 2 rooms","3 · 1 room","4 · 2 rooms"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <Field icon={<BedDouble size={14} />} label="Room"><select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className="widget-input">{["Any","Deluxe","Ocean Suite","Presidential","Villa"].map(v=><option key={v}>{v}</option>)}</select></Field>
      <button type="submit" className="btn-gold justify-center"><Search size={14} /> Search</button>
      <style>{`.widget-input{width:100%;background:transparent;border:none;outline:none;font-size:.9rem;color:var(--foreground);padding:.1rem 0}.widget-input::-webkit-calendar-picker-indicator{opacity:.5}`}</style>
    </form>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 border border-transparent px-4 py-2.5 hover:border-[color:var(--gold)]/40 transition-colors">
      <span className="eyebrow text-[0.6rem] flex items-center gap-1.5">{icon} {label}</span>
      {children}
    </label>
  );
}
