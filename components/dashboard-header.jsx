"use client"
import ThemeToggle from "./theme-toggle.jsx"

export default function DashboardHeader() {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-[var(--text)]">Hi, Alex</h1>
        <p className="text-sm md:text-base text-[var(--text-muted)]">Ready to explore your mind today?</p>
      </div>
      <ThemeToggle />
    </header>
  )
}
