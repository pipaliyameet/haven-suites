import type { ReactNode } from "react";

export function PageIntro({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <section className="container-editorial py-20 md:py-28 text-center">
      {eyebrow && <div className="eyebrow mb-4 flex items-center justify-center gap-3"><span className="gold-rule" /> {eyebrow} <span className="gold-rule" /></div>}
      <div className="mx-auto max-w-2xl font-serif text-2xl md:text-3xl leading-snug text-foreground/90 italic">{children}</div>
    </section>
  );
}
