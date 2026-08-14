"use client"

import { useState } from "react"
import { Task, Priority, Status } from "../lib/taskStore"
import { inputStyle, labelStyle } from "../lib/styles"

interface Props {
  task: Task
  heading: string
  onSave: (task: Task) => void
  onCancel: () => void
}

export default function TaskEditForm({ task, heading, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState<Priority>(task.priority)
  const [status, setStatus] = useState<Status>(task.status)
  const [dueDate, setDueDate] = useState(task.dueDate || "")
  const [titleTouched, setTitleTouched] = useState(false)

  const titleError = title.trim() === "" ? "Task title is required." : ""

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTitleTouched(true)
    if (!title.trim()) return
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
    })
  }

  return (
    <div style={{ animation: "fadeIn 0.2s ease" }}>
      <h3 style={{ margin: "0 0 1rem", fontSize: "1.2rem", color: "var(--text)" }}>{heading}</h3>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitleTouched(true)}
            placeholder="Task title *"
            aria-invalid={titleError ? true : undefined}
            style={{ ...inputStyle, borderColor: titleError && titleTouched ? "var(--destructive)" : "var(--border-strong)" }}
          />
          {titleError && titleTouched && (
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--destructive)" }}>
              {titleError}
            </p>
          )}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
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
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          <button
            type="button"
            onClick={onCancel}
            className="press"
            style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "var(--surface-muted)", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 500 }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="press"
            style={{ flex: 1, padding: "0.6rem", borderRadius: 6, background: "var(--primary)", color: "var(--text-on-primary)", border: "none", cursor: "pointer", fontWeight: 600 }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
