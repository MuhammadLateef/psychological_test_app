"use client"
import { motion } from "framer-motion"

const items = [
  { label: "Resources", icon: "book" },
  { label: "Progress", icon: "bar" },
  { label: "Reports", icon: "doc" },
  { label: "Notifications", icon: "bell" },
]

function Icon({ name }) {
  if (name === "book")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 4h10a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" fill="currentColor" />
        <path d="M17 7h3v13h-3z" fill="currentColor" opacity="0.7" />
      </svg>
    )
  if (name === "bar")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 20V9M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  if (name === "doc")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6z" fill="currentColor" />
        <path d="M15 2v5h5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M18 8a6 6 0 11-6-6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M13 10l7 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function QuickAccess() {
  return (
    <div className="flex gap-3">
      {items.map((item) => (
        <motion.button
          key={item.label}
          whileHover={{ y: -1 }}
          className="rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--border)] shadow-sm px-4 py-3 flex items-center gap-3 text-[var(--text)]"
        >
          <span className="h-8 w-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--text-muted)]">
            <Icon name={item.icon} />
          </span>
          <span className="text-sm font-medium">{item.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
