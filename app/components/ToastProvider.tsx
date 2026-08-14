"use client"

import { createContext, useCallback, useContext, useRef, useState } from "react"
import { CheckCircleIcon, AlertIcon, InfoIcon, CloseIcon } from "./icons"

export type ToastType = "success" | "error" | "info"

interface ToastItem {
  id: number
  type: ToastType
  message: string
  leaving: boolean
}

interface ToastContextValue {
  notify: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue>({ notify: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

const DURATION = 3200
const EXIT_MS = 220

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const remove = useCallback((id: number) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, EXIT_MS)
  }, [])

  const notify = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, type, message, leaving: false }])
      setTimeout(() => remove(id), DURATION)
    },
    [remove]
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const toastAccent: Record<ToastType, string> = {
  success: "var(--success)",
  error: "var(--destructive)",
  info: "var(--info)",
}

function Toast({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const accent = toastAccent[toast.type]
  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      onClick={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        background: "var(--surface)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${accent}`,
        borderRadius: 10,
        padding: "0.7rem 0.9rem",
        boxShadow: "var(--shadow-lg)",
        fontSize: "0.875rem",
        cursor: "pointer",
        animation: toast.leaving ? "toastOut 0.22s ease both" : "toastIn 0.25s ease both",
      }}
    >
      <span style={{ display: "inline-flex", color: accent, flexShrink: 0 }}>
        {toast.type === "success" ? <CheckCircleIcon size={18} /> : toast.type === "error" ? <AlertIcon size={18} /> : <InfoIcon size={18} />}
      </span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <span style={{ display: "inline-flex", color: "var(--text-faint)", flexShrink: 0 }}>
        <CloseIcon size={14} />
      </span>
    </div>
  )
}
