import { UserIcon } from "../components/icons"

export default function ProfilePage() {
  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "2rem", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary)", marginBottom: "0.75rem" }}>
          <UserIcon size={28} />
        </div>
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", color: "var(--text)" }}>Profile</h1>
        <p style={{ color: "var(--text-muted)", margin: 0 }}>This is the profile page of the Task Tracker App.</p>
      </div>
    </div>
  )
}
