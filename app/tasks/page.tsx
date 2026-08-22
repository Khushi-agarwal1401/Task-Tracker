"use client"

import { useState, useEffect } from "react"
import { Task, loadTasks, saveTasks, subscribeToStorage } from "../lib/taskStore"
import { sortTasks, SortKey } from "../lib/taskUtils"
import FilterButtons, { Filter } from "../components/FilterButtons"
import TaskList from "../components/TaskList"
import TaskStats from "../components/TaskStats"
import TaskForm from "../components/TaskForm"
import { SearchIcon } from "../components/icons"
import { useToast } from "../components/ToastProvider"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<Filter>("All")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SortKey>("newest")
  const { notify } = useToast()

  useEffect(() => {
    Promise.resolve().then(() => {
      setTasks(loadTasks())
      setMounted(true)
    })
    return subscribeToStorage(setTasks)
  }, [])

  function updateTasks(updated: Task[]) { setTasks(updated); saveTasks(updated) }

  function addTask(task: Task) {
    updateTasks([...tasks, task])
    notify("Task added")
  }

  function toggleTask(id: number) {
    const task = tasks.find((t) => t.id === id)
    updateTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? "Done" : "Todo" } : t))
    if (task) notify(task.completed ? "Task marked as pending" : "Task completed 🎉")
  }

  function updateTask(updated: Task) {
    updateTasks(tasks.map((t) => (t.id === updated.id ? updated : t)))
    notify("Task updated")
  }

  function deleteTask(id: number) {
    updateTasks(tasks.filter((t) => t.id !== id))
    notify("Task deleted", "info")
  }

  const counts: Record<Filter, number> = {
    All: tasks.length,
    Pending: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  }

  const filtered = sortTasks(
    tasks
      .filter((t) => filter === "Completed" ? t.completed : filter === "Pending" ? !t.completed : true)
      .filter((t) => search.trim() === "" ? true : t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())),
    sort
  )

  return (
    <div className="page">
      <header style={{ marginBottom: "1.75rem", animation: "fadeUp 0.4s ease both" }}>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>My Tasks</h1>
        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>Stay organised. Get things done.</p>
      </header>

      {mounted ? <TaskStats tasks={tasks} /> : <StatsSkeleton />}

      <section style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", gap: "0.75rem", flexWrap: "wrap" }}>
          <FilterButtons filter={filter} onChange={setFilter} counts={counts} />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: "0.65rem", color: "var(--text-faint)", display: "flex", pointerEvents: "none" }}>
                <SearchIcon size={15} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                style={{ padding: "0.4rem 0.9rem 0.4rem 2rem", borderRadius: 8, border: "1px solid var(--border-strong)", fontSize: "0.875rem", minWidth: 180, background: "var(--surface)", color: "var(--text)" }}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort tasks"
              style={{ padding: "0.4rem 0.7rem", borderRadius: 8, border: "1px solid var(--border-strong)", fontSize: "0.875rem", background: "var(--surface)", color: "var(--text)", cursor: "pointer" }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="due">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </section>

      {mounted ? (
        <TaskList
          tasks={filtered}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
          emptyMessage={search ? "No tasks match your search." : "No tasks yet — add your first task!"}
          emptyHint={search ? "Try a different search term or clear the filters." : "Use the form below to add your first task."}
        />
      ) : (
        <ListSkeleton />
      )}

      <TaskForm onAdd={addTask} />
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {[0, 1, 2].map((i) => <div key={i} className="skeleton" style={{ flex: 1, minWidth: 90, height: 92 }} />)}
      </div>
      <div className="skeleton" style={{ height: 8, borderRadius: 99, marginTop: "1rem" }} />
    </div>
  )
}

function ListSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", background: "var(--surface)" }}>
          <div className="skeleton" style={{ height: 16, width: "40%", marginBottom: "0.6rem" }} />
          <div className="skeleton" style={{ height: 12, width: "70%" }} />
        </div>
      ))}
    </div>
  )
}