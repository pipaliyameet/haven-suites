import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const PATHS = ["/", "/about", "/rooms", "/suites", "/restaurant", "/spa", "/pool", "/conference", "/wedding-events", "/gallery", "/offers", "/packages", "/blog", "/testimonials", "/faqs", "/contact", "/careers", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map((p) => `  <url><loc>${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
