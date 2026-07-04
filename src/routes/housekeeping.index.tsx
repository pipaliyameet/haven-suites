import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { KPICard } from "@/components/dashboard/widgets";
import { HK_ROOMS, type HKRoom, type RoomStatus } from "@/mock/dashboard";
import { useMemo, useState } from "react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core";
import { Sparkles, Timer, CheckCheck, Wrench, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/housekeeping/")({ component: Page });

const COLUMNS: { id: RoomStatus; label: string; icon: React.ComponentType<{ size?: number }>; tint: string }[] = [
  { id: "dirty",       label: "Dirty",           icon: Sparkles,  tint: "border-amber-300 bg-amber-50/40" },
  { id: "in-progress", label: "In progress",     icon: Timer,     tint: "border-blue-300 bg-blue-50/40" },
  { id: "ready",       label: "Ready",           icon: CheckCheck,tint: "border-emerald-300 bg-emerald-50/40" },
  { id: "maintenance", label: "Maintenance",     icon: Wrench,    tint: "border-red-300 bg-red-50/40" },
];

function Page() {
  const [rooms, setRooms] = useState<HKRoom[]>(HK_ROOMS);
  const counts = useMemo(() => COLUMNS.reduce((acc, c) => ({ ...acc, [c.id]: rooms.filter((r) => r.status === c.id).length }), {} as Record<RoomStatus, number>), [rooms]);

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over) return;
    const id = e.active.id as string;
    const status = e.over.id as RoomStatus;
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const r = rooms.find((x) => x.id === id);
    if (r) toast.success(`Room ${r.number} → ${status}`);
  };

  return (
    <>
      <PageHeader eyebrow="Housekeeping" title="Room status board" description="Drag rooms across columns as their state changes." />
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {COLUMNS.map((c) => (
          <KPICard key={c.id} label={c.label} value={counts[c.id] ?? 0} icon={c.icon} tone={c.id === "maintenance" ? "danger" : c.id === "ready" ? "gold" : "default"} />
        ))}
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((c) => (
            <Column key={c.id} column={c} rooms={rooms.filter((r) => r.status === c.id)} />
          ))}
        </div>
      </DndContext>
    </>
  );
}

function Column({ column, rooms }: { column: typeof COLUMNS[number]; rooms: HKRoom[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  return (
    <div ref={setNodeRef} className={cn("border rounded-sm p-3 min-h-[420px] transition-colors", column.tint, isOver && "ring-2 ring-[color:var(--gold)]")}>
      <div className="flex items-center justify-between px-1 pb-3 border-b border-current/20 mb-3">
        <div className="flex items-center gap-2"><column.icon size={14} /><span className="eyebrow">{column.label}</span></div>
        <span className="text-xs tabular-nums">{rooms.length}</span>
      </div>
      <div className="space-y-2">
        {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
        {rooms.length === 0 && <p className="text-xs text-muted-foreground italic text-center py-8">Drop rooms here</p>}
      </div>
    </div>
  );
}

function RoomCard({ room }: { room: HKRoom }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: room.id });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 50 } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={cn("bg-card border rounded-sm p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow", isDragging && "opacity-70")}>
      <div className="flex items-center justify-between">
        <div className="font-serif text-xl">Room {room.number}</div>
        <span className="text-[0.6rem] eyebrow flex items-center gap-1"><MapPin size={10} /> Floor {room.floor}</span>
      </div>
      <div className="text-xs text-muted-foreground">{room.type}</div>
      {room.assignedTo && <div className="text-[0.7rem] mt-2 flex items-center gap-1 text-muted-foreground"><User size={10} /> {room.assignedTo}</div>}
      {room.note && <div className="text-[0.7rem] mt-1 text-destructive">{room.note}</div>}
    </div>
  );
}
