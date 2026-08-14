import { Task } from "../lib/taskStore"

export default function TaskStats({ tasks }: { tasks: Task[] }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = [
    { label: "Total", value: total, color: "var(--primary)", bg: "var(--primary-soft)" },
    { label: "Completed", value: completed, color: "var(--success)", bg: "var(--success-soft)" },
    { label: "Pending", value: pending, color: "var(--warning)", bg: "var(--warning-soft)" },
  ]

  return (
    <div style={{ marginBottom: "1.75rem", animation: "fadeUp 0.4s ease 0.05s both" }}>
      <p style={{ margin: "0 0 0.75rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        {total} {total === 1 ? "Task" : "Tasks"} · {completed} Completed · {pending} Pending
      </p>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {stats.map(({ label, value, color, bg }) => (
          <div
            key={label}
            style={{
              flex: 1,
              minWidth: 90,
              padding: "1rem 1.25rem",
              borderRadius: 12,
              background: bg,
              textAlign: "center",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.3rem", fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--surface-strong)", height: 8, borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: "var(--primary)",
            borderRadius: 99,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.3rem 0 0", textAlign: "right" }}>
        {percent}% complete
      </p>
    </div>
  )
}
