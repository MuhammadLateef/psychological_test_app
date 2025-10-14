"use client"

const tabs = [
  {
    label: "Home",
    icon: (cls) => (
      <svg viewBox="0 0 24 24" className={cls}>
        <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6H9v6H5a2 2 0 01-2-2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Tests",
    icon: (cls) => (
      <svg viewBox="0 0 24 24" className={cls}>
        <path d="M5 4h14v4H5zM5 10h14v10H5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Reports",
    icon: (cls) => (
      <svg viewBox="0 0 24 24" className={cls}>
        <path d="M6 3h12v18H6z" fill="currentColor" />
        <path d="M9 7h6M9 11h6M9 15h6" stroke="var(--text)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Resources",
    icon: (cls) => (
      <svg viewBox="0 0 24 24" className={cls}>
        <path d="M4 5h16v14H4z" fill="currentColor" />
        <path d="M8 5v14" stroke="var(--text)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Profile",
    icon: (cls) => (
      <svg viewBox="0 0 24 24" className={cls}>
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 21a8 8 0 0116 0" fill="currentColor" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-3">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="grid grid-cols-5 gap-2 rounded-[var(--radius-xl)] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow)] py-2">
          {tabs.map((t) => (
            <li key={t.label} className="flex flex-col items-center gap-1">
              {t.icon("h-5 w-5 text-[var(--text-muted)]")}
              <span className="text-[10px] text-[var(--text-muted)]">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
