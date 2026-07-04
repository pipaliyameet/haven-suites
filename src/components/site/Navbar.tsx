import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent
          ? "bg-transparent text-ivory"
          : "bg-background/85 text-foreground backdrop-blur-xl border-b border-border/60",
      )}
    >
      <div className="container-editorial flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <Emblem />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-xl tracking-tight">{SITE.name}</span>
            <span className="eyebrow mt-1 text-[0.58rem]">Est. {SITE.founded}</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-[0.72rem] uppercase tracking-[0.22em] font-medium"
              activeProps={{ className: "text-[color:var(--gold)]" }}
            >
              {l.label}
              <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[color:var(--gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-xs opacity-80 hover:opacity-100">
            <Phone size={14} /> <span className="tracking-wider">{SITE.phone}</span>
          </a>
          <Link to="/login" className="text-[0.7rem] uppercase tracking-[0.22em] font-medium opacity-80 hover:opacity-100 hover:text-[color:var(--gold)]">Sign in</Link>
          <Link to="/rooms" className="btn-gold">Reserve</Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="lg:hidden p-2"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[color:var(--navy)] text-ivory"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Link to="/" className="flex items-center gap-2"><Emblem /> <span className="font-serif text-lg">{SITE.name}</span></Link>
              <button aria-label="Close" onClick={() => setOpen(false)} className="p-2"><X size={22} /></button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col px-6 pt-8 gap-6"
            >
              {NAV_LINKS.map((l) => (
                <motion.div
                  key={l.to}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link to={l.to} className="font-serif text-3xl">{l.label}</Link>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/rooms" className="btn-gold justify-center">Reserve a stay</Link>
                <a href={`tel:${SITE.phone}`} className="btn-outline-light justify-center">Call the concierge</a>
                <Link to="/login" className="text-center text-xs uppercase tracking-[0.22em] opacity-80">Sign in / Staff portal</Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Emblem() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/60 text-[color:var(--gold)] font-serif italic">
      A
    </span>
  );
}
