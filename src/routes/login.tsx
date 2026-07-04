import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { setRole } from "@/lib/mock-auth";
import { ROLE_META, type Role } from "@/mock/dashboard";
import { SITE } from "@/constants/site";
import { ArrowRight, Building2, ChefHat, ConciergeBell, Sparkles, Users, ShieldCheck } from "lucide-react";
import hero from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Maison Aurélia" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

const OPTIONS: { role: Role; icon: React.ComponentType<{ size?: number }>; blurb: string }[] = [
  { role: "guest",        icon: Sparkles,       blurb: "Manage your stay, invoices, and concierge requests." },
  { role: "reception",    icon: ConciergeBell,  blurb: "Check-in, check-out, walk-ins and room allocation." },
  { role: "housekeeping", icon: Users,          blurb: "Room status board, assignments, and maintenance." },
  { role: "kitchen",      icon: ChefHat,        blurb: "Kitchen display, ticket flow, and menu availability." },
  { role: "admin",        icon: Building2,     blurb: "Property operations, staff, pricing, and inventory." },
  { role: "super",        icon: ShieldCheck,    blurb: "Platform-wide chains, subscriptions, and audit." },
];

function LoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-svh grid lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden lg:block">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--navy)]/85 to-[color:var(--navy)]/50" />
        <div className="relative h-full flex flex-col justify-between p-12 text-ivory">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/60 text-[color:var(--gold)] font-serif italic">A</span>
            <span className="font-serif text-2xl">{SITE.name}</span>
          </div>
          <div className="max-w-lg">
            <div className="eyebrow text-[color:var(--gold-soft)] flex items-center gap-3"><span className="gold-rule" /> Aurélia Platform</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.02] mt-4">One quiet console, <em className="text-[color:var(--gold-soft)]">for a house of many hands.</em></h1>
            <p className="mt-6 text-ivory/80 leading-relaxed">A demonstration environment — no password required. Choose a role to enter the appropriate workspace.</p>
          </div>
          <div className="text-[0.7rem] uppercase tracking-[0.24em] text-ivory/60">Demo build · {new Date().getFullYear()}</div>
        </div>
      </div>
      <div className="bg-background flex flex-col justify-center p-8 md:p-16 overflow-y-auto">
        <div className="max-w-xl w-full mx-auto">
          <div className="eyebrow">Sign in as</div>
          <h2 className="font-serif text-4xl mt-2">Choose your role</h2>
          <p className="mt-2 text-sm text-muted-foreground">This is a demo. Selecting a role stores it locally and routes you to the matching dashboard.</p>
          <div className="mt-8 grid gap-3">
            {OPTIONS.map((o, i) => (
              <motion.button
                key={o.role}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => { setRole(o.role); nav({ to: ROLE_META[o.role].home }); }}
                className="group text-left border rounded-sm p-4 flex items-center gap-4 hover:border-[color:var(--gold)] hover:bg-secondary/50 transition-all"
              >
                <span className="h-11 w-11 shrink-0 grid place-items-center rounded-sm bg-[color:var(--navy)] text-[color:var(--gold)]"><o.icon size={18} /></span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg">{ROLE_META[o.role].label}</span>
                    <span className="eyebrow text-[0.55rem]">{ROLE_META[o.role].badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{o.blurb}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-[color:var(--gold)] group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
