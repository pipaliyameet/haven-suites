import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GALLERY } from "@/mock/blog";
import { motion } from "framer-motion";
import hero from "@/assets/hero-resort.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Maison Aurélia" }, { name: "description", content: "Photographs of the maison, kept as a quiet journal of the seasons." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Photo Journal" title={<>The maison, quietly observed</>} image={hero} height="sm" />
      <section className="container-editorial py-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {[...GALLERY, ...GALLERY].map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 6) * 0.05 }} className="mb-6 break-inside-avoid image-cover">
              <img src={src} alt="" className="w-full h-auto" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  ),
});
