"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Task, loadTasks, subscribeToStorage } from "../lib/taskStore"
import { priorityColors } from "../lib/taskUtils"
import { CheckIcon, InboxIcon, ArrowRightIcon, ClockIcon } from "../components/icons"

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())

  useEffect(() => {
    return subscribeToStorage(setTasks)
  }, [])

  const recent = tasks.slice(-5).reverse()
  const completed = tasks.filter((t) => t.completed).length
  const pending = tasks.length - completed

  return (
    <div className="page">
      <div style={{ marginBottom: "1.75rem", animation: "fadeUp 0.4s ease both" }}>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>Dashboard</h1>
        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>Here&apos;s what&apos;s going on with your tasks.</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          { label: "Total Tasks", value: tasks.length, color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Completed", value: completed, color: "var(--success)", bg: "var(--success-soft)" },
          { label: "Pending", value: pending, color: "var(--warning)", bg: "var(--warning-soft)" },
        ].map(({ label, value, color, bg }, i) => (
          <div key={label} style={{ flex: 1, minWidth: 100, padding: "1.25rem", borderRadius: 12, background: bg, textAlign: "center", border: "1px solid var(--border)", animation: "fadeUp 0.4s ease both", animationDelay: `${0.08 + i * 0.08}s` }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.3rem", fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "var(--text)" }}>Recent Tasks</h2>
        <Link href="/tasks" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--primary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}>
          View all
          <ArrowRightIcon size={14} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2.5rem 1rem", border: "1px dashed var(--border-strong)", borderRadius: 12, background: "var(--surface)" }}>
          <div style={{ display: "flex", justifyContent: "center", color: "var(--primary)", marginBottom: "0.5rem" }}>
            <InboxIcon size={32} />
          </div>
          <p style={{ color: "var(--text-muted)", margin: "0 0 0.5rem" }}>No tasks yet.</p>
          <Link href="/tasks" style={{ color: "var(--primary)", fontWeight: 600 }}>Add your first task →</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {recent.map((task, i) => {
            const pc = priorityColors[task.priority]
            return (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.1rem", border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", background: task.completed ? "var(--surface-hover)" : "var(--surface)", boxShadow: "var(--shadow-sm)", transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s", animation: "fadeUp 0.35s ease both", animationDelay: `${0.25 + i * 0.07}s` }}
                onMouseEnter={(e) => { if (!task.completed) { e.currentTarget.style.background = "var(--surface-hover)"; e.currentTarget.style.boxShadow = "var(--shadow-md)" } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = task.completed ? "var(--surface-hover)" : "var(--surface)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)" }}
              >
                <span style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "var(--text-faint)" : "var(--text)", fontSize: "0.9rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {task.title}
                </span>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, background: pc.bg, color: pc.text, fontWeight: 600 }}>{task.priority}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", color: task.completed ? "var(--success)" : "var(--text-muted)", fontWeight: task.completed ? 600 : 400 }}>
                    {task.completed ? <CheckIcon size={13} /> : <ClockIcon size={13} />}
                    {task.completed ? "Done" : task.status}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
