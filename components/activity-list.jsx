"use client"

const items = [
  { color: "var(--task-blue)", title: "IQ Test Completed", meta: "May 10, 2025 • Score: 138" },
  { color: "var(--task-green)", title: "Mental Health Check", meta: "May 12, 2025 • Status: Good" },
]

export default function ActivityList() {
  return (
    <section className="rounded-[var(--radius-xl)] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow)]">
      <div className="px-4 md:px-5 py-3 border-b border-[var(--border)] text-sm text-[var(--text-muted)]">
        Recent Activity
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((it, i) => (
          <li key={i} className="px-4 md:px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: `${it.color}20`, border: `1px solid ${it.color}55` }}
              />
              <div className="text-sm">
                <p className="text-[var(--text)] font-medium">{it.title}</p>
                <p className="text-[var(--text-muted)]">{it.meta}</p>
              </div>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  )
}
