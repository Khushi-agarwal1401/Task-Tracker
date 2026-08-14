import Logo from "./Logo"
import { CheckIcon } from "./icons"

const features = [
  "Track tasks with priorities and due dates",
  "See progress with live stats and a progress bar",
  "Overdue tasks are flagged so you never miss a deadline",
]

export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 960, margin: "1.5rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)", minHeight: 540, animation: "fadeUp 0.4s ease both" }}>
        <div className="auth-brand" style={{ flex: "1 1 45%", background: "#134e4a", color: "#fff", padding: "2.5rem", flexDirection: "column", gap: "2rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "rgba(13,148,136,0.35)", top: -90, right: -90 }} />
          <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "rgba(234,88,12,0.25)", bottom: -60, left: -60 }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Logo size={34} />
            <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.3px" }}>Task Tracker</span>
          </div>
          <div style={{ position: "relative", marginTop: "auto" }}>
            <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.6rem", lineHeight: 1.25 }}>Get things done, one task at a time.</h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Track priorities, due dates, and progress — all in one place.
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#0d9488", color: "#fff", flexShrink: 0 }}>
                  <CheckIcon size={13} />
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 55%", padding: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 380 }}>
            <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.5rem", color: "var(--text)" }}>{title}</h1>
            <p style={{ margin: "0 0 1.75rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
