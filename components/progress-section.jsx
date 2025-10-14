"use client"

import { motion } from "framer-motion"

export function ProgressSection() {
  return (
    <section aria-labelledby="progress">
      <h3 id="progress" className="mb-2 text-sm font-semibold text-muted-foreground">
        Your Progress
      </h3>

      <div className="rounded-md border p-3">
        <div className="mb-3 flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Tasks Completed</span>
          <span className="font-medium">7</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 w-full overflow-hidden rounded bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-y-0 left-0"
            style={{ background: "var(--color-primary)" }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Current Streak</span>
          <span className="font-semibold">4 days</span>
        </div>
      </div>
    </section>
  )
}
