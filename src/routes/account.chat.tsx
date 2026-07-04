import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Panel } from "@/components/dashboard/widgets";
import { CHAT } from "@/mock/dashboard";
import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/chat")({ component: Page });

function Page() {
  const [msgs, setMsgs] = useState(CHAT);
  const [text, setText] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date().toTimeString().slice(0, 5);
    setMsgs((m) => [...m, { id: `g${m.length}`, from: "guest", text, at: now }]);
    setText("");
    setTimeout(() => setMsgs((m) => [...m, { id: `c${m.length}`, from: "concierge", text: "Bien noté — I'll arrange it and confirm shortly.", at: new Date().toTimeString().slice(0,5) }]), 900);
  };
  return (
    <>
      <PageHeader eyebrow="Concierge" title="Message the maison" description="Écrivez-nous à toute heure — a member of the concierge team is always awake." />
      <Panel>
        <div className="flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "guest" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-sm px-4 py-2.5 text-sm", m.from === "guest" ? "bg-[color:var(--navy)] text-ivory" : "bg-secondary")}>
                  <div>{m.text}</div>
                  <div className={cn("text-[0.6rem] mt-1 uppercase tracking-widest", m.from === "guest" ? "text-ivory/60" : "text-muted-foreground")}>{m.at}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="mt-4 flex gap-2 border-t pt-4">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="A message to the concierge…" className="flex-1 border rounded-sm px-3 py-2 bg-background text-sm outline-none focus:border-[color:var(--gold)]" />
            <button type="submit" className="btn-gold"><Send size={14} /></button>
          </form>
        </div>
      </Panel>
    </>
  );
}
