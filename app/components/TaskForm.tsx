"use client"

import { useState } from "react"
import { Task, Priority, Status } from "../lib/taskStore"
import { inputStyle, labelStyle } from "../lib/styles"
import { PlusIcon } from "./icons"

interface Props {
  onAdd: (task: Task) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("Medium")
  const [status, setStatus] = useState<Status>("Todo")
  const [dueDate, setDueDate] = useState("")
  const [titleTouched, setTitleTouched] = useState(false)

  const titleError = title.trim() === "" ? "Task title is required." : ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTitleTouched(true)
    if (!title.trim()) return
    onAdd({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    })
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setStatus("Todo")
    setDueDate("")
    setTitleTouched(false)
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        id="add-task"
        onClick={() => setOpen(true)}
        className="press"
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: 10,
          border: "2px dashed var(--border-strong)",
          background: "transparent",
          color: "var(--primary)",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-soft)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <PlusIcon size={16} />
        Add Task
      </button>
    )
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem", background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
      <h3 style={{ margin: "0 0 1rem", fontSize: "1.05rem", color: "var(--text)" }}>New Task</h3>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitleTouched(true)}
            placeholder="Task title *"
            aria-invalid={titleError ? true : undefined}
            aria-describedby={titleError ? "task-title-error" : undefined}
            style={{ ...inputStyle, borderColor: titleError && titleTouched ? "var(--destructive)" : "var(--border-strong)" }}
          />
          {titleError && titleTouched && (
            <p id="task-title-error" style={{ margin: 0, fontSize: "0.78rem", color: "var(--destructive)" }}>
              {titleError}
            </p>
          )}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: 120 }}>
            <label style={labelStyle}>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} style={inputStyle}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: 120 }}>
            <label style={labelStyle}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} style={inputStyle}>
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1, minWidth: 120 }}>
            <label style={labelStyle}>Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="submit"
            className="press"
            style={{ flex: 1, padding: "0.55rem", borderRadius: 6, background: "var(--accent)", color: "var(--text-on-accent)", border: "none", cursor: "pointer", fontWeight: 600, transition: "background 0.15s, transform 0.1s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setTitleTouched(false) }}
            style={{ flex: 1, padding: "0.55rem", borderRadius: 6, background: "var(--surface-muted)", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
