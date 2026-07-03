import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "center", className, invert }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", invert && "text-ivory", className)}
    >
      {eyebrow && (
        <div className={cn("eyebrow mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="gold-rule" /><span>{eyebrow}</span><span className="gold-rule" />
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-balance">{title}</h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed", invert ? "text-ivory/70" : "text-muted-foreground")}>{description}</p>
      )}
    </motion.div>
  );
}
