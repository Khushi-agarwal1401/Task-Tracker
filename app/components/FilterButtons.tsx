export type Filter = "All" | "Pending" | "Completed"

interface Props {
  filter: Filter
  onChange: (f: Filter) => void
  counts?: Record<Filter, number>
}

export default function FilterButtons({ filter, onChange, counts }: Props) {
  return (
    <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", background: "var(--surface-strong)", padding: "0.25rem", borderRadius: 10 }}>
      {(["All", "Pending", "Completed"] as Filter[]).map((f) => {
        const active = filter === f
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            aria-pressed={active}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.35rem 0.85rem",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: active ? "var(--surface)" : "transparent",
              color: active ? "var(--primary)" : "var(--text-muted)",
              fontWeight: active ? 600 : 400,
              fontSize: "0.875rem",
              boxShadow: active ? "var(--shadow-sm)" : "none",
              transition: "all 0.15s",
            }}
          >
            {f}
            {counts && (
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "0.05rem 0.4rem",
                  borderRadius: 99,
                  background: active ? "var(--primary-soft)" : "var(--surface-muted)",
                  color: active ? "var(--primary)" : "var(--text-faint)",
                }}
              >
                {counts[f]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
