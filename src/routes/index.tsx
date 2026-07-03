import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import hero from "@/assets/hero-resort.jpg";
import exterior from "@/assets/hotel-exterior.jpg";
import restaurant from "@/assets/restaurant.jpg";
import spa from "@/assets/spa.jpg";
import { BookingWidget } from "@/components/site/BookingWidget";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RoomCard } from "@/components/site/RoomCard";
import { ROOMS } from "@/mock/rooms";
import { TESTIMONIALS, AWARDS } from "@/mock/testimonials";
import { SITE } from "@/constants/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Aurélia — A Modern Luxury Hotel & Resort" },
      { name: "description", content: "Ocean-view suites, celebrated dining, and a signature spa on a private headland of the Côte d'Azur." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
        <img src={hero} alt="Maison Aurélia at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/50 via-transparent to-[color:var(--navy)]/80" />
        <div className="container-editorial relative z-10 flex h-full flex-col justify-between pt-32 pb-10 text-ivory">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
            <div className="eyebrow text-[color:var(--gold-soft)] flex items-center gap-3"><span className="gold-rule" /> Côte d'Azur · Est. {SITE.founded}</div>
            <h1 className="mt-6 font-serif text-6xl md:text-8xl leading-[0.98] text-balance">A private headland,<br /><em className="text-[color:var(--gold-soft)]">where the sea remembers you.</em></h1>
            <p className="mt-8 max-w-xl text-lg text-ivory/85 leading-relaxed">Eighty-four suites and villas above the Mediterranean, a Michelin-inspired kitchen, and a signature spa carved into the cliff.</p>
            <div className="mt-10 flex flex-wrap items-center gap-4"><Link to="/rooms" className="btn-gold">Reserve your stay</Link><Link to="/about" className="btn-outline-light">Discover the maison</Link></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}><BookingWidget /></motion.div>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="eyebrow flex items-center gap-3"><span className="gold-rule" /> The Maison</div>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05]">An address kept quietly,<br />by those who know.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Since 1927, Maison Aurélia has hosted a discreet clientele of writers, statesmen and old European families along a single crescent of the Côte d'Azur.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">We are not the largest hotel on this coast, and never intended to be.</p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.24em] font-medium text-foreground hover:text-[color:var(--gold)]">Our story <ArrowUpRight size={14} /></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="image-cover aspect-[4/5] shadow-editorial">
            <img src={exterior} alt="Maison Aurélia at blue hour" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow="Suites & Residences" title={<>Rooms with a quiet view</>} description="Eighty-four suites and villas, each renovated by Studio Aurélia in a language of ivory, oak and antique brass." />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">{ROOMS.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}</div>
          <div className="mt-14 flex justify-center"><Link to="/rooms" className="btn-outline-gold">Explore all rooms</Link></div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <FeatureSplit eyebrow="Restaurant Solène" title="A kitchen that whispers" body="Chef Solène Aubert composes a daily tasting menu around the morning's catch and the kitchen garden." image={restaurant} to="/restaurant" cta="See the menu" />
        <FeatureSplit eyebrow="The Signature Spa" title="Rituals carved into the cliff" body="Seven treatment cabins, a marble hammam, a vitality pool overlooking the sea." image={spa} to="/spa" cta="Explore the spa" dark />
      </section>

      <section className="bg-[color:var(--navy)] text-ivory py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow="In their words" title={<>A quiet chorus of returning voices</>} invert />
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {TESTIMONIALS.slice(0, 4).map((t, i) => (
              <motion.blockquote key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }} className="border-l border-[color:var(--gold)]/40 pl-6">
                <div className="flex text-[color:var(--gold)] mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill="currentColor" />)}</div>
                <p className="font-serif text-xl md:text-2xl leading-snug text-ivory/95 italic">“{t.quote}”</p>
                <footer className="mt-5 text-xs tracking-[0.22em] uppercase text-ivory/60">{t.author} — {t.role}, {t.location}{t.publication && <> · <span className="text-[color:var(--gold-soft)]">{t.publication}</span></>}</footer>
              </motion.blockquote>
            ))}
          </div>
          <div className="mt-20 border-t border-ivory/10 pt-10">
            <div className="eyebrow text-ivory/50 text-center mb-6">Recognised by</div>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-ivory/70">{AWARDS.map((a) => <span key={a} className="font-serif italic">{a}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <div className="eyebrow flex items-center gap-3"><span className="gold-rule" /> Find us</div>
            <h2 className="mt-5 font-serif text-5xl">A quiet crescent of coast</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Twenty-two minutes from Nice Côte d'Azur, twelve from the old port, and a lifetime from the ordinary.</p>
            <div className="mt-8 flex items-center gap-2 text-sm"><MapPin size={16} className="text-[color:var(--gold)]" /> {SITE.address}</div>
            <div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="btn-gold">Speak to the concierge</Link><Link to="/gallery" className="btn-outline-gold">Photo journal</Link></div>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden border border-border">
            <iframe title="Map" className="h-full w-full grayscale-[0.7]" src="https://www.openstreetmap.org/export/embed.html?bbox=7.15%2C43.66%2C7.38%2C43.75&amp;layer=mapnik" />
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureSplit({ eyebrow, title, body, image, to, cta, dark }: { eyebrow: string; title: string; body: string; image: string; to: string; cta: string; dark?: boolean }) {
  return (
    <div className={`relative min-h-[560px] overflow-hidden group ${dark ? "bg-[color:var(--charcoal)] text-ivory" : "bg-ivory"}`}>
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[1200ms]" loading="lazy" />
      <div className={`absolute inset-0 ${dark ? "bg-[color:var(--charcoal)]/55" : "bg-[color:var(--navy)]/45"}`} />
      <div className="relative z-10 flex h-full flex-col justify-end p-10 md:p-16 text-ivory min-h-[560px]">
        <div className="eyebrow text-[color:var(--gold-soft)] flex items-center gap-3"><span className="gold-rule" /> {eyebrow}</div>
        <h3 className="mt-4 font-serif text-4xl md:text-5xl max-w-md">{title}</h3>
        <p className="mt-4 max-w-md text-ivory/85">{body}</p>
        <Link to={to} className="mt-8 btn-outline-light w-fit">{cta}</Link>
      </div>
    </div>
  );
}

