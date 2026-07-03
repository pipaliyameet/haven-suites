import { Link } from "@tanstack/react-router";
import { FOOTER_LINKS, SITE } from "@/constants/site";
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--navy)] text-ivory">
      <div className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/60 text-[color:var(--gold)] font-serif italic text-lg">A</span>
              <div className="leading-tight">
                <div className="font-serif text-2xl">{SITE.name}</div>
                <div className="eyebrow mt-1">Est. {SITE.founded}</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              A private headland retreat where classical hospitality meets a distinctly modern point of view.
            </p>
            <address className="mt-6 not-italic text-sm text-ivory/70 leading-relaxed">
              {SITE.address}<br />
              <a href={`tel:${SITE.phone}`} className="hover:text-[color:var(--gold)]">{SITE.phone}</a><br />
              <a href={`mailto:${SITE.email}`} className="hover:text-[color:var(--gold)]">{SITE.email}</a>
            </address>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <div className="eyebrow mb-4">{group}</div>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-ivory/75 hover:text-[color:var(--gold)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <div className="eyebrow mb-4">Journal</div>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Quiet dispatches on new suites, chef residencies and seasonal escapes.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-0 border border-ivory/20 focus-within:border-[color:var(--gold)] transition-colors"
            >
              <Mail size={14} className="ml-3 text-ivory/50" />
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 bg-transparent px-3 py-3 text-sm placeholder:text-ivory/40 outline-none"
              />
              <button className="px-4 text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--navy)] transition-colors py-3">
                Join
              </button>
            </form>
            <div className="mt-6 flex items-center gap-4 text-ivory/60">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="hover:text-[color:var(--gold)] transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="eyebrow text-ivory/50">Forbes Five-Star · AAA Five-Diamond · Relais & Châteaux</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
