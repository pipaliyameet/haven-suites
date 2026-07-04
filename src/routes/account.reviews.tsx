import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { REVIEWS } from "@/mock/dashboard";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/reviews")({ component: Page });

function Page() {
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  return (
    <>
      <PageHeader eyebrow="Feedback" title="Your reviews" description="Your voice reaches the general manager directly, by morning." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel title="Leave a review">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Thank you — the maison has received your review."); setBody(""); }}>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => setStars(n)}>
                  <Star size={22} className={n <= stars ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-muted-foreground"} />
                </button>
              ))}
            </div>
            <textarea required value={body} onChange={(e) => setBody(e.target.value)} rows={6} placeholder="Your impressions of the maison…" className="mt-4 w-full border rounded-sm p-3 text-sm outline-none focus:border-[color:var(--gold)] bg-background" />
            <button className="btn-gold mt-4">Submit</button>
          </form>
        </Panel>
        <Panel title="Recent reviews">
          <ul className="space-y-4">
            {REVIEWS.map((r) => (
              <li key={r.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-serif">{r.author}</span>
                  <span className="flex gap-0.5">{Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={12} className="fill-[color:var(--gold)] text-[color:var(--gold)]" />)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
                <div className="eyebrow text-[0.55rem] mt-2">{r.date}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
