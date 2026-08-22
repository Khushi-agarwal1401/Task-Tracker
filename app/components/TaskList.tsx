import { Task } from "../lib/taskStore"
import TaskCard from "./TaskCard"
import { InboxIcon } from "./icons"

interface Props {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (updated: Task) => void
  emptyMessage: string
  emptyHint?: string
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate, emptyMessage, emptyHint }: Props) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1.5rem", background: "var(--surface)", border: "1px dashed var(--border-strong)", borderRadius: 14, marginBottom: "1rem", animation: "fadeUp 0.3s ease both" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", marginBottom: "1rem" }}>
          <InboxIcon size={26} />
        </div>
        <p style={{ color: "var(--text)", fontWeight: 600, margin: "0 0 0.25rem" }}>{emptyMessage}</p>
        {emptyHint && <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>{emptyHint}</p>}
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
