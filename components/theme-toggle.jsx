"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const root = document.documentElement
    const hasDark = root.classList.contains("dark")
    setIsDark(hasDark)
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = !isDark
    setIsDark(next)
    if (next) root.classList.add("dark")
    else root.classList.remove("dark")
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch (e) {}
  }

  return (
    <button
      onClick={toggle}
      className="h-9 w-9 shrink-0 rounded-full bg-[var(--card-2)] border border-[var(--border)] shadow-sm hover:opacity-90 transition"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
    
     <svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  className="mx-auto my-2 h-6 w-6 text-[var(--text-muted)] transition-all duration-300"
  aria-hidden="true"
>
  {isDark ? (
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ) : (
    <>
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )}
</svg>


    </button>
  )
}
