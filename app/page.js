import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}>
        <Dashboard />
      </Suspense>
    </main>
  )
}
