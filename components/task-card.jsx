"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const icons = {
  spark: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2l2 6h6l-5 3.5L17 22l-5-4-5 4 2-10.5L4 8h6z" fill="currentColor" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21s-7-4.35-9.33-8A5.5 5.5 0 1112 7.5 5.5 5.5 0 1121.33 13C19 16.65 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4 4h10a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" fill="currentColor" />
      <path d="M17 7h3v13h-3z" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6z" fill="currentColor" />
      <path d="M15 2v5h5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
}

export default function TaskCard({ colorVar, title, desc, minutes, icon = "spark"  , to}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 0.997 }}
      transition={{ type: "spring", stiffness: 250, damping: 26, mass: 0.6 }}
      className="rounded-[var(--radius-xl)] shadow-[var(--shadow)] overflow-hidden border border-[var(--border)]"
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.08), rgba(255,255,255,0.06)), var(${colorVar})`,
      }}
    >
    <Link href={to}>
      <div className="flex items-center justify-between px-4 md:px-5 h-16 md:h-[70px]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20 text-white">
            <span className="text-white opacity-90">{icons[icon]}</span>
          </div>
          <div>
            <p className="text-white/95 text-sm md:text-base font-medium leading-tight">{title}</p>
            <p className="text-white/80 text-xs md:text-sm">{desc}</p>
          </div>
        </div>
        <div className="shrink-0">
          <div
            className="px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur"
            style={{ background: "var(--pill-light)", color: "var(--pill-darktext)" }}
          >
            {/* inline clock icon + time */}
            <span className="inline-flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 11h5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 6v7" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              {minutes} min
            </span>
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  )
}
