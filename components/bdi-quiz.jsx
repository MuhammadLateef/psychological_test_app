"use client"

import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { bdiQuestions } from "@/data/bdi-questions"
import { submitQuizToSheet } from "@/lib/submit-quiz"
import DemographicsForm from "./demographics-form"
import SuccessModal from "./SuccessModal"

const spring = { type: "spring", stiffness: 400, damping: 30 }
const tap = { scale: 0.98 }

function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100)

  return (
    <div className="mb-4">
      <div className="h-2 w-full rounded-full bg-muted" aria-hidden />
      <div className="mt-[-0.5rem] h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} aria-hidden />
      <div className="mt-2 text-xs text-muted-foreground">
        <span className="sr-only">Progress</span>
        {current + 1} of {total}
      </div>
    </div>
  )
}

function ResultBadge({ score }) {
  const { label, colorClasses, note } = useMemo(() => {
    if (score <= 13)
      return { label: "Minimal depression", colorClasses: "bg-accent text-accent-foreground", note: "0–13" }
    if (score <= 19)
      return { label: "Mild depression", colorClasses: "bg-secondary text-secondary-foreground", note: "14–19" }
    if (score <= 28)
      return { label: "Moderate depression", colorClasses: "bg-primary text-primary-foreground", note: "20–28" }
    return { label: "Severe depression", colorClasses: "bg-destructive text-primary-foreground", note: "29–69" }
  }, [score])

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${colorClasses}`}>
      <span className="font-medium">{label}</span>
      <span className="ml-2 opacity-80">{note}</span>
    </div>
  )
}

function NavBar({ onBack, onReset, showBack, showReset }) {
  return (
    <div className="sticky top-0 z-10 mb-4 rounded-xl border bg-card/80 px-3 py-2 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack ? (
            <motion.button
              whileTap={tap}
              onClick={onBack}
              className="rounded-lg border px-3 py-1.5 text-sm text-foreground hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Back
            </motion.button>
          ) : (
            <div />
          )}
        </div>
        {showReset ? (
          <motion.button
            whileTap={tap}
            onClick={onReset}
            className="rounded-lg border px-3 py-1.5 text-sm text-foreground hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            Start over
          </motion.button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default function BdiQuiz() {
  const [demographics, setDemographics] = useState(null)
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const containerRef = useRef(null)

  const total = bdiQuestions.length
  const current = bdiQuestions[index]
  const hasAnswer = answers[current?.id]?.score !== undefined

  const onSelect = useCallback((qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: { score: option.score, label: option.label } }))
  }, [])

  const goNext = useCallback(() => {
    if (!hasAnswer) return
    if (index < total - 1) {
      setDirection(1)
      setIndex((i) => i + 1)
    }
  }, [index, total, hasAnswer])

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1)
      setIndex((i) => i - 1)
    }
  }, [index])

  const handleDemographicsComplete = useCallback((demographicsData) => {
    setDemographics(demographicsData)
    setStarted(true)
    setTimeout(() => {
      containerRef.current?.querySelector('input[type="radio"]')?.focus()
    }, 150)
  }, [])

  const onDragEnd = useCallback(
    (_e, info) => {
      const threshold = 80
      if (info.offset.x < -threshold) {
        goNext()
      } else if (info.offset.x > threshold) {
        goPrev()
      }
    },
    [goNext, goPrev],
  )

  const isLast = index === total - 1
  const score = useMemo(
    () => Object.values(answers).reduce((acc, a) => acc + (typeof a.score === "number" ? a.score : 0), 0),
    [answers],
  )

  const getSeverity = useCallback((s) => {
    if (s <= 13) return "Minimal"
    if (s <= 19) return "Mild"
    if (s <= 28) return "Moderate"
    return "Severe"
  }, [])

  const handleSubmitToSheet = useCallback(async () => {
    setIsSubmitting(true)

    const quizData = {
      demographics,
      score,
      severity: getSeverity(score),
      answers,
      submittedAt: new Date().toISOString(),
    }

    const result = await submitQuizToSheet(quizData, "BDI")
    setIsSubmitting(false)
    
    if (result.success) {
      setShowSuccessModal(true)
    }
  }, [demographics, score, answers, getSeverity])

  const showResults = started && isLast && hasAnswer

  useEffect(() => {
    const onKey = (e) => {
      if (!started) return
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [started, goNext, goPrev])

  if (!demographics) {
    return (
      <section ref={containerRef} className="relative">
        <DemographicsForm onComplete={handleDemographicsComplete} />
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative">
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        testType="Psychological Test"
      />

      {!started ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="rounded-2xl border bg-card p-5 shadow-sm"
        >
          <h2 className="text-lg font-medium">Before you begin</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You are about to take the Beck Depression Inventory assessment. This will take approximately 5-10 minutes.
          </p>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              This self-report is not a diagnosis. If you have safety concerns, seek professional help immediately.
            </p>
            <motion.button
              whileTap={tap}
              onClick={() => setStarted(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Start Assessment
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <>
          <NavBar
            onBack={goPrev}
            showBack={index > 0 && !showResults}
            onReset={() => {
              setStarted(false)
              setIndex(0)
              setDirection(0)
              setAnswers({})
            }}
            showReset={showResults}
          />

          {!showResults ? (
            <>
              <ProgressBar current={index} total={total} />

              <div className="relative">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={current.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={onDragEnd}
                    initial={{ x: direction > 0 ? 60 : -60, opacity: 0, scale: 0.98 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: direction < 0 ? 60 : -60, opacity: 0, scale: 0.98 }}
                    transition={spring}
                    className="rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <h3 className="text-pretty text-lg font-semibold">{current.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select the one statement that best describes how you have felt during the past two weeks.
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      {current.options.map((opt, i) => {
                        const selected =
                          answers[current.id]?.score === opt.score && answers[current.id]?.label === opt.label
                        const inputId = `${current.id}-${i}`
                        return (
                          <label
                            key={inputId}
                            htmlFor={inputId}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-ring
                              ${
                                selected
                                  ? "border-primary bg-blue-500 dark:bg-blue-500 dark:border-primary"
                                  : "hover:bg-muted"
                              }`}
                          >
                            <input
                              id={inputId}
                              type="radio"
                              name={current.id}
                              className="mt-1 h-4 w-4 accent-primary"
                              checked={selected}
                              onChange={() => onSelect(current.id, opt)}
                              aria-label={opt.label}
                            />
                            <span className="text-sm leading-relaxed">{opt.label}</span>
                          </label>
                        )
                      })}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <motion.button
                        whileTap={tap}
                        onClick={goPrev}
                        disabled={index === 0}
                        className="rounded-lg border px-4 py-2 text-sm text-foreground hover:bg-muted disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        Back
                      </motion.button>
                      <div className="flex items-center gap-2">
                        {!isLast ? (
                          <motion.button
                            whileTap={tap}
                            onClick={goNext}
                            disabled={!hasAnswer}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            Continue
                          </motion.button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Swipe left or press Continue to view results
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {isLast && (
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileTap={tap}
                    onClick={() => {
                      if (hasAnswer) setDirection(1)
                    }}
                    disabled={!hasAnswer}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    See results
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <AnimatePresence>
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={spring}
                className="rounded-2xl border bg-card p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Your Results</h3>
                      <p className="text-sm text-muted-foreground">
                        {demographics.age ? `Age: ${demographics.age}` : "Age: –"} •{" "}
                        {demographics.gender ? `Gender: ${demographics.gender}` : ""}
                      </p>
                    </div>
                    <ResultBadge score={score} />
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <p className="text-pretty text-sm">
                      <span className="font-medium">Total Score: </span>
                      {score}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Ranges: 0–13 Minimal • 14–19 Mild • 20–28 Moderate • 29–69 Severe
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Your selections</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-2">
                      {bdiQuestions.map((q) => {
                        const a = answers[q.id]
                        return (
                          <li key={q.id} className="rounded-lg border p-3">
                            <div className="text-sm font-medium">{q.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {a?.label || "No selection"} {typeof a?.score === "number" ? `(Score: ${a.score})` : ""}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm text-foreground mb-3">
                      Save your results and demographic information to Google Sheets for future reference.
                    </p>
                    <motion.button
                      whileTap={tap}
                      onClick={handleSubmitToSheet}
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {isSubmitting ? "Saving..." : "Save to Google Sheets"}
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileTap={tap}
                      onClick={() => {
                        setDemographics(null)
                        setStarted(false)
                        setIndex(0)
                        setDirection(0)
                        setAnswers({})
                      }}
                      className="rounded-lg border px-4 py-2 text-sm text-foreground hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      Retake
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}
    </section>
  )
}