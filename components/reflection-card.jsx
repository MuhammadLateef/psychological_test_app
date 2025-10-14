"use client"

export default function ReflectionCard() {
  return (
    <section className="rounded-[var(--radius-xl)] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow)]">
      <div className="px-4 md:px-5 py-3 border-b border-[var(--border)] text-sm text-[var(--text-muted)]">
        Today’s Reflection
      </div>
      <div className="px-4 md:px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M9 9h6v2H9zm0 4h6v2H9z" fill="currentColor" />
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-sm md:text-base text-[var(--text)]">“Self-awareness is the first step to growth.”</p>
        </div>
      </div>
    </section>
  )
}
