import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import exterior from "@/assets/hotel-exterior.jpg";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Maison Aurélia" }, { name: "description", content: "How Maison Aurélia handles personal information." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Privacy" title="Privacy Policy" image={exterior} height="sm" />
      <article className="container-editorial py-20 max-w-3xl text-muted-foreground leading-relaxed space-y-6 text-[0.95rem]">
        <p className="text-sm">Last updated: 3 July 2026. This page is maintained by Maison Aurélia to describe how we handle personal information.</p>
        {[["Information we collect", "We collect information you provide directly — name, contact, reservation preferences and payment information — as well as limited data collected automatically when you use our website."], ["How we use information", "To operate reservations, personalise your stay, send communications you have opted into, and comply with legal obligations."], ["Sharing", "We do not sell personal information. We share only with service providers who help us operate the maison, and where required by law."], ["Retention", "We retain personal information only for as long as necessary or as required by law."], ["Your rights", "You may request access, correction, deletion or export. Contact reservations@maisonaurelia.com."], ["Cookies", "This website uses cookies to remember preferences and measure use."], ["Contact", "Questions about this policy may be sent to reservations@maisonaurelia.com."]].map(([h, b]) => (
          <div key={h}><h2 className="font-serif text-2xl text-foreground mt-8">{h}</h2><p className="mt-2">{b}</p></div>
        ))}
      </article>
    </>
  ),
});
