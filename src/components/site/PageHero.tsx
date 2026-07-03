import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  alt?: string;
  height?: "sm" | "md" | "lg";
}

export function PageHero({ eyebrow, title, description, image, alt = "", height = "md" }: Props) {
  const h = height === "sm" ? "h-[52vh] min-h-[420px]" : height === "lg" ? "h-[92vh] min-h-[640px]" : "h-[68vh] min-h-[520px]";
  return (
    <section className={`relative ${h} w-full overflow-hidden`}>
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/60 via-[color:var(--navy)]/30 to-[color:var(--navy)]/70" />
      <div className="container-editorial relative z-10 flex h-full flex-col justify-end pb-16 text-ivory md:pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <div className="eyebrow mb-4 text-[color:var(--gold-soft)] flex items-center gap-3"><span className="gold-rule" /> {eyebrow}</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1] text-balance">{title}</h1>
          {description && <p className="mt-6 max-w-xl text-lg text-ivory/85 leading-relaxed">{description}</p>}
        </motion.div>
      </div>
    </section>
  );
}
