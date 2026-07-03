import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/constants/site";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact the Concierge — Maison Aurélia" }, { name: "description", content: "Reach the maison directly." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title={<>Reach the concierge directly</>} image={exterior} height="sm" />
      <section className="container-editorial py-20 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="eyebrow flex items-center gap-3"><span className="gold-rule" /> The Maison</div>
          <h2 className="mt-4 font-serif text-4xl">We answer within the hour</h2>
          <p className="mt-4 text-muted-foreground">Our concierge team is available every day, in French, English, Italian, Arabic and Mandarin.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-[color:var(--gold)]" /> {SITE.address}</div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-[color:var(--gold)]" /> <a href={`tel:${SITE.phone}`} className="hover:text-[color:var(--gold)]">{SITE.phone}</a></div>
            <div className="flex items-center gap-3"><Mail size={16} className="text-[color:var(--gold)]" /> <a href={`mailto:${SITE.email}`} className="hover:text-[color:var(--gold)]">{SITE.email}</a></div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent", { description: "Our concierge will reply within the hour." }); (e.target as HTMLFormElement).reset(); }} className="grid gap-5 border border-border bg-card p-8 md:p-10">
          <div className="grid gap-5 md:grid-cols-2"><Input label="First name" name="first" /><Input label="Last name" name="last" /></div>
          <Input label="Email" name="email" type="email" />
          <Input label="Phone" name="phone" />
          <Input label="Arrival date" name="arrival" type="date" />
          <Textarea label="How can we help?" name="message" />
          <button className="btn-gold justify-center mt-2">Send to concierge</button>
        </form>
      </section>
    </>
  ),
});

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (<label className="block"><span className="eyebrow text-[0.62rem]">{label}</span><input {...props} required className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none focus:border-[color:var(--gold)] transition-colors" /></label>);
}
function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (<label className="block"><span className="eyebrow text-[0.62rem]">{label}</span><textarea {...props} rows={4} className="mt-2 w-full border border-border bg-transparent p-3 outline-none focus:border-[color:var(--gold)] transition-colors" /></label>);
}
