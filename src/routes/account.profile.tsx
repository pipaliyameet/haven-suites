import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/account/profile")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader eyebrow="Your details" title="Profile & preferences" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Personal">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Saved"); }} className="grid gap-3">
            {[
              { label: "Full name", value: "Éloïse Bernard" },
              { label: "Email", value: "eloise@atelier.fr" },
              { label: "Phone", value: "+33 6 12 44 90 21" },
              { label: "Country", value: "France" },
            ].map((f) => (
              <label key={f.label} className="grid gap-1">
                <span className="eyebrow text-[0.55rem]">{f.label}</span>
                <input defaultValue={f.value} className="border rounded-sm px-3 py-2 text-sm bg-background outline-none focus:border-[color:var(--gold)]" />
              </label>
            ))}
            <button className="btn-gold mt-2 w-fit">Save</button>
          </form>
        </Panel>
        <Panel title="Preferences">
          <ul className="space-y-3 text-sm">
            {[
              ["Pillow", "Firm"],
              ["Newspaper", "Le Monde"],
              ["Turndown", "22:00"],
              ["Water", "Sparkling, room temperature"],
              ["Allergies", "Shellfish"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
