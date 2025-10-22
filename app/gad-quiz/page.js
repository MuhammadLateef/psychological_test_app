"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import QuizContainer from "@/components/quiz-container"
import ResultsScreen from "@/components/results-screen"
import DemographicsForm from "@/components/demographics-form"

export default function Home() {
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState([])
  const [showDemograph, setShowDemograph] = useState(true)

  // When demographics form completes
  const handleDemographicsComplete = () => {
    setShowDemograph(false)
  }

  const handleQuizComplete = (finalScore, difficultySelections) => {
    setScore(finalScore)
    setDifficulty(difficultySelections)
    setShowResults(true)
  }

  const handleRestart = () => {
    setShowResults(false)
    setShowDemograph(true)
    setScore(0)
    setDifficulty([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {showDemograph ? (
          <motion.div
            key="demograph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <DemographicsForm onComplete={handleDemographicsComplete} />
          </motion.div>
        ) : !showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <QuizContainer onComplete={handleQuizComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsScreen
              score={score}
              difficulty={difficulty}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
