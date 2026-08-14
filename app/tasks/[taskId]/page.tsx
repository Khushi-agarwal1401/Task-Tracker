"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Task, loadTasks, saveTasks, subscribeToStorage } from "../../lib/taskStore"
import { isOverdue, formatDate, priorityColors, statusColors, statusDot } from "../../lib/taskUtils"
import { CheckIcon, ArrowUturnIcon, PencilIcon, TrashIcon, AlertIcon, CalendarIcon, ClockIcon, ArrowLeftIcon, CheckCircleIcon } from "../../components/icons"
import ConfirmDialog from "../../components/ConfirmDialog"
import TaskEditForm from "../../components/TaskEditForm"
import { useToast } from "../../components/ToastProvider"

export default function TaskDetailPage() {
  const { taskId } = useParams()
  const router = useRouter()
  const [allTasks, setAllTasks] = useState<Task[]>(() => loadTasks())
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const { notify } = useToast()

  useEffect(() => {
    return subscribeToStorage(setAllTasks)
  }, [])

  const task = useMemo(
    () => allTasks.find((t) => t.id === Number(taskId)) ?? null,
    [allTasks, taskId]
  )

  function persist(updated: Task[]) {
    saveTasks(updated)
    setAllTasks(updated)
  }

  function handleSave(updated: Task) {
    persist(allTasks.map((t) => (t.id === updated.id ? updated : t)))
    setEditing(false)
    notify("Task updated")
  }

  function toggleComplete() {
    if (!task) return
    persist(allTasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed, status: (!t.completed ? "Done" : "Todo") as Task["status"] } : t
    ))
    notify(task.completed ? "Task marked as pending" : "Task completed 🎉")
  }

  function confirmDelete() {
    persist(allTasks.filter((t) => t.id !== Number(taskId)))
    notify("Task deleted", "info")
    router.push("/tasks")
  }

  if (!task) {
    return (
      <div className="page" style={{ maxWidth: 600, textAlign: "center", paddingTop: "3rem" }}>
        <p style={{ color: "var(--text-muted)", margin: "0 0 1.25rem" }}>Task not found.</p>
        <button
          onClick={() => router.push("/tasks")}
          style={{ padding: "0.5rem 1.25rem", borderRadius: 6, background: "var(--primary)", color: "var(--text-on-primary)", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          Back to Tasks
        </button>
      </div>
    )
  }

  const overdue = isOverdue(task)

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "2rem", border: "1px solid var(--border)", borderRadius: 12, background: "var(--surface)", boxShadow: "var(--shadow-sm)", animation: "fadeUp 0.4s ease both" }}>
      {editing ? (
        <TaskEditForm task={task} heading="Edit Task" onSave={handleSave} onCancel={() => setEditing(false)} />
      ) : (
        <>
          <button
            onClick={() => router.back()}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.3rem 0.8rem", borderRadius: 6, background: "var(--surface-muted)", color: "var(--text-muted)", border: "1px solid var(--border)", cursor: "pointer", fontSize: "0.8rem", marginBottom: "1rem", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-muted)")}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>

          <h1 style={{ margin: "0 0 0.75rem", fontSize: "1.5rem", textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "var(--text-faint)" : "var(--text)" }}>
            {task.title}
          </h1>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: priorityColors[task.priority].bg, color: priorityColors[task.priority].text, fontWeight: 600 }}>
              {task.priority}
            </span>
            {task.completed ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: statusColors.Done.bg, color: statusColors.Done.text, fontWeight: 600 }}>
                <CheckCircleIcon size={13} />
                Completed
              </span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: statusColors[task.status].bg, color: statusColors[task.status].text, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusDot[task.status], animation: task.status === "In Progress" ? "dotPulse 1.6s ease-in-out infinite" : "none" }} />
                {task.status}
              </span>
            )}
            {overdue && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: "var(--destructive-soft)", color: "var(--destructive)", fontWeight: 600 }}>
                <AlertIcon size={13} />
                Overdue
              </span>
            )}
          </div>

          {task.description && <p style={{ color: "var(--text-muted)", margin: "0 0 1rem", lineHeight: 1.6 }}>{task.description}</p>}

          {(task.createdAt || task.dueDate) && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {task.createdAt && (
                <p style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--text-faint)", fontSize: "0.875rem", margin: 0 }}>
                  <ClockIcon size={15} />
                  Created: {formatDate(task.createdAt)}
                </p>
              )}
              {task.dueDate && (
                <p style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: overdue ? "var(--destructive)" : "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                  <CalendarIcon size={15} />
                  Due Date: {task.dueDate}
                </p>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
            <button onClick={toggleComplete} className="press"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.1rem", borderRadius: 6, background: task.completed ? "var(--surface-muted)" : "var(--primary)", color: task.completed ? "var(--text)" : "var(--text-on-primary)", border: task.completed ? "1px solid var(--border)" : "none", cursor: "pointer", fontWeight: 600, transition: "background 0.15s, transform 0.1s ease" }}
              onMouseEnter={(e) => { if (!task.completed) e.currentTarget.style.background = "var(--primary-hover)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = task.completed ? "var(--surface-muted)" : "var(--primary)" }}
            >
              {task.completed ? <><ArrowUturnIcon size={15} /> Mark Pending</> : <><CheckIcon size={15} /> Mark Completed</>}
            </button>
            {!task.completed && (
              <button onClick={() => setEditing(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.1rem", borderRadius: 6, background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
              >
                <PencilIcon size={14} />
                Edit
              </button>
            )}
            <button onClick={() => setConfirmingDelete(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.1rem", borderRadius: 6, background: "var(--surface)", color: "var(--destructive)", border: "1px solid var(--destructive-border)", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--destructive-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface)")}
            >
              <TrashIcon size={14} />
              Delete
            </button>
          </div>
        </>
      )}

      {confirmingDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  )
}
