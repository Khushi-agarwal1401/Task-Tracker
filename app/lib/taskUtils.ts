import { Task, Priority, Status } from "./taskStore"

/** Priority badge colors (shared by task cards, the dashboard, and the detail view). */
export const priorityColors: Record<Priority, { bg: string; text: string }> = {
  High: { bg: "var(--destructive-soft)", text: "var(--destructive-hover)" },
  Medium: { bg: "var(--warning-soft)", text: "var(--warning)" },
  Low: { bg: "var(--success-soft)", text: "var(--success)" },
}

/** Status badge colors used on the detail view. */
export const statusColors: Record<Status, { bg: string; text: string }> = {
  Todo: { bg: "var(--surface-muted)", text: "var(--text-muted)" },
  "In Progress": { bg: "var(--info-soft)", text: "var(--info)" },
  Done: { bg: "var(--success-soft)", text: "var(--success)" },
}

/** Left accent border color for open tasks, keyed by priority. */
export const priorityBorder: Record<Priority, string> = {
  High: "var(--priority-high)",
  Medium: "var(--priority-medium)",
  Low: "var(--priority-low)",
}

/** Status indicator dot colors. */
export const statusDot: Record<Status, string> = {
  Todo: "#94a3b8",
  "In Progress": "var(--info)",
  Done: "var(--success)",
}

/** A task is overdue when it has a due date in the past and isn't completed. */
export function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) return false
  return new Date(task.dueDate) < new Date(new Date().toDateString())
}

/** Format an ISO timestamp as a readable date, falling back to the raw value. */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

export type SortKey = "newest" | "oldest" | "due" | "priority"

const priorityRank: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 }

function byCreatedAt(t: Task): number {
  return t.createdAt ? new Date(t.createdAt).getTime() : t.id
}

/** Return a sorted copy of the given tasks for the selected sort key. */
export function sortTasks(list: Task[], sort: SortKey): Task[] {
  const sorted = [...list]
  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => byCreatedAt(a) - byCreatedAt(b))
    case "due":
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      })
    case "priority":
      return sorted.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
    default:
      return sorted.sort((a, b) => byCreatedAt(b) - byCreatedAt(a))
  }
}
