"use client"

import { useEffect } from "react"
import { AlertIcon } from "./icons"

interface Props {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [])

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "var(--overlay)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
      animation: "overlayIn 0.2s ease"
    }}>
      <div style={{
        background: "var(--surface)",
        padding: "1.5rem",
        borderRadius: 12,
        maxWidth: 400,
        width: "90%",
        boxShadow: "var(--shadow-lg)",
        animation: "dialogIn 0.2s ease",
        border: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", color: "var(--destructive)" }}>
          <AlertIcon size={24} />
          <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--text)" }}>Confirm Action</h3>
        </div>
        <p style={{ margin: "0 0 1.5rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            className="press"
            style={{ padding: "0.5rem 1rem", borderRadius: 6, background: "var(--surface-muted)", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 500 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="press"
            style={{ padding: "0.5rem 1rem", borderRadius: 6, background: "var(--destructive)", color: "white", border: "none", cursor: "pointer", fontWeight: 600 }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
