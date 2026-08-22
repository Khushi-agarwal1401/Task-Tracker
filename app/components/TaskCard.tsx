"use client"

import Link from "next/link"
import { useState } from "react"
import { Task } from "../lib/taskStore"
import { isOverdue, priorityColors, priorityBorder, statusDot } from "../lib/taskUtils"
import { CheckIcon, ArrowUturnIcon, PencilIcon, TrashIcon, AlertIcon, CalendarIcon, CheckCircleIcon } from "./icons"
import ConfirmDialog from "@/app/components/ConfirmDialog"
import TaskEditForm from "./TaskEditForm"

export default function TaskCard({ task, onToggle, onDelete, onUpdate }: {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (updated: Task) => void
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [editing, setEditing] = useState(false)
  const overdue = isOverdue(task)

  if (editing) {
    return (
      <div style={{ border: "2px solid var(--primary)", borderRadius: 12, padding: "1.25rem", background: "var(--surface)" }}>
        <TaskEditForm
          task={task}
          heading="Edit Task"
          onSave={(updated: Task) => { onUpdate(updated); setEditing(false) }}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <>
      {confirmingDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${task.title}"?`}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            onDelete(task.id)
            setConfirmingDelete(false)
          }}
        />
      )}
      <div
        className="task-card"
      style={{
        border: `1px solid ${overdue ? "var(--destructive-border)" : "var(--border)"}`,
        borderLeft: `4px solid ${task.completed ? "var(--primary)" : overdue ? "var(--destructive)" : priorityBorder[task.priority]}`,
        borderRadius: 12,
        padding: "1rem 1.25rem",
        background: task.completed ? "var(--surface-hover)" : "var(--surface)",
        boxShadow: "var(--shadow-sm)",
        transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!task.completed) {
          e.currentTarget.style.background = "var(--surface-hover)"
          e.currentTarget.style.boxShadow = "var(--shadow-md)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = task.completed ? "var(--surface-hover)" : "var(--surface)"
        e.currentTarget.style.boxShadow = "var(--shadow-sm)"
      }}
    >
      <Link href={`/tasks/${task.id}`} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "inherit", display: "block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, fontSize: "0.95rem", textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "var(--text-faint)" : "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {task.title}
          </span>
          <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.55rem", borderRadius: 20, background: priorityColors[task.priority].bg, color: priorityColors[task.priority].text, fontWeight: 600, whiteSpace: "nowrap" }}>
            {task.priority}
          </span>
          {overdue && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", padding: "0.15rem 0.55rem", borderRadius: 20, background: "var(--destructive-soft)", color: "var(--destructive)", fontWeight: 600, whiteSpace: "nowrap" }}>
              <AlertIcon size={12} />
              Overdue
            </span>
          )}
        </div>
        {task.description && (
          <p style={{ margin: "0 0 0.4rem", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{task.description}</p>
        )}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          {task.completed ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>
              <CheckCircleIcon size={14} />
              Completed
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: task.status === "In Progress" ? "var(--info)" : "var(--text-muted)", fontWeight: task.status === "In Progress" ? 600 : 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusDot[task.status], animation: task.status === "In Progress" ? "dotPulse 1.6s ease-in-out infinite" : "none" }} />
              {task.status}
            </span>
          )}
          {task.dueDate && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: overdue ? "var(--destructive)" : "var(--text-faint)" }}>
              <CalendarIcon size={13} />
              {task.dueDate}
            </span>
          )}
        </div>
      </Link>

      <div className="task-card-actions" style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", justifyContent: "flex-end" }}>
        <button
          onClick={() => onToggle(task.id)}
          className="press"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.3rem 0.7rem", borderRadius: 6, border: "none", cursor: "pointer", background: task.completed ? "var(--surface-muted)" : "var(--primary)", color: task.completed ? "var(--text)" : "var(--text-on-primary)", fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap", transition: "background 0.15s, transform 0.1s ease",
          }}
          onMouseEnter={(e) => { if (!task.completed) e.currentTarget.style.background = "var(--primary-hover)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = task.completed ? "var(--surface-muted)" : "var(--primary)" }}
        >
          {task.completed ? <><ArrowUturnIcon size={12} /> Pending</> : <><CheckIcon size={12} /> Done</>}
        </button>
        {!task.completed && (
          <button
            onClick={() => setEditing(true)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.3rem 0.7rem", borderRadius: 6, border: "1px solid var(--border)", cursor: "pointer", background: "var(--surface)", color: "var(--text)", fontSize: "0.75rem", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)" }}
          >
            <PencilIcon size={12} />
            Edit
          </button>
        )}
        <button
          onClick={() => setConfirmingDelete(true)}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.3rem 0.7rem", borderRadius: 6, border: "1px solid var(--destructive-border)", cursor: "pointer", background: "var(--surface)", color: "var(--destructive)", fontSize: "0.75rem", transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--destructive-soft)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)" }}
        >
          <TrashIcon size={12} />
          Delete
        </button>
      </div>
    </div>
    </>
  )
}