import { createFileRoute } from "@tanstack/react-router";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "We're briefly away — Maison Aurélia" }, { name: "description", content: "The maison website is receiving a few quiet updates." }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <section className="relative min-h-screen w-full overflow-hidden grid place-items-center text-ivory">
      <img src={exterior} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[color:var(--navy)]/70" />
      <div className="relative z-10 text-center px-6 max-w-xl">
        <div className="eyebrow text-[color:var(--gold-soft)] flex items-center justify-center gap-3"><span className="gold-rule" /> A short pause <span className="gold-rule" /></div>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl">We are briefly away.</h1>
        <p className="mt-6 text-ivory/80">The maison website is receiving a few quiet updates. Our concierge remains available at all hours.</p>
        <a href="tel:+33492001488" className="btn-gold mt-8 inline-flex">Call the concierge</a>
      </div>
    </section>
  ),
});
