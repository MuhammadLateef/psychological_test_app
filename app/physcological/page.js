"use client"
import BdiQuiz from "../../components/bdi-quiz";
export const dynamic = "force-static";



export default function BdiPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
     

      <div className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">
            Beck Depression Inventory II
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Select the one statement that best describes how you have felt
            during the past two weeks, including today.
          </p>
        </header>

        <BdiQuiz />
      </div>
    </main>
  );
}
