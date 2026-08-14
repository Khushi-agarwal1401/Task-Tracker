export type Priority = "Low" | "Medium" | "High"
export type Status = "Todo" | "In Progress" | "Done"

export interface Task {
  id: number
  title: string
  description: string
  priority: Priority
  status: Status
  dueDate: string
  completed: boolean
  /** ISO timestamp of when the task was created (optional for tasks stored before this field existed). */
  createdAt?: string
}

const STORAGE_KEY = "tasks"

function isPriority(value: unknown): value is Priority {
  return value === "Low" || value === "Medium" || value === "High"
}

function isStatus(value: unknown): value is Status {
  return value === "Todo" || value === "In Progress" || value === "Done"
}

/** Coerce a single stored entry into a well-formed Task, or null if it can't be used. */
function normalizeTask(raw: unknown): Task | null {
  if (typeof raw !== "object" || raw === null) return null
  const t = raw as Record<string, unknown>
  if (typeof t.id !== "number" || typeof t.title !== "string") return null
  return {
    id: t.id,
    title: t.title,
    description: typeof t.description === "string" ? t.description : "",
    priority: isPriority(t.priority) ? t.priority : "Medium",
    status: isStatus(t.status) ? t.status : "Todo",
    dueDate: typeof t.dueDate === "string" ? t.dueDate : "",
    completed: typeof t.completed === "boolean" ? t.completed : false,
    createdAt: typeof t.createdAt === "string" ? t.createdAt : undefined,
  }
}

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeTask).filter((t): t is Task => t !== null)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    console.warn("Could not save tasks: browser storage is unavailable or full.")
  }
}

/**
 * Subscribe to task changes made in other tabs/windows. Fires whenever the
 * `tasks` key changes in another tab. Returns an unsubscribe function.
 */
export function subscribeToStorage(callback: (tasks: Task[]) => void): () => void {
  function handleStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      callback(loadTasks())
    }
  }
  window.addEventListener("storage", handleStorage)
  return () => window.removeEventListener("storage", handleStorage)
}
