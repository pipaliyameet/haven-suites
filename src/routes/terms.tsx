import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Maison Aurélia" }, { name: "description", content: "Terms governing use of the Maison Aurélia website and reservations." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" image={exterior} height="sm" />
      <article className="container-editorial py-20 max-w-3xl text-muted-foreground leading-relaxed space-y-6 text-[0.95rem]">
        <p className="text-sm">These terms govern your use of this website and any reservation made through it.</p>
        {[["Reservations", "Reservations are subject to availability and the specific rate terms disclosed at booking."], ["Cancellation", "Standard reservations may be cancelled at no charge up to 72 hours prior to arrival."], ["Rates & taxes", "Rates are per room, per night, unless stated otherwise. Applicable taxes are added at checkout."], ["House rules", "Guests are expected to observe the discreet conduct customary at the maison."], ["Liability", "We take reasonable care with guest property. High-value items should be kept in the in-room safe."], ["Governing law", "These terms are governed by the laws of the French Republic."]].map(([h, b]) => (
          <div key={h}><h2 className="font-serif text-2xl text-foreground mt-8">{h}</h2><p className="mt-2">{b}</p></div>
        ))}
      </article>
    </>
  ),
});
