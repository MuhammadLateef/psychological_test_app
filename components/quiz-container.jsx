"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import QuestionCard from "./question-card"
import DifficultyQuestion from "./difficulty-question"

const QUESTIONS = [
  {
    id: 1,
    text: "Feeling nervous, anxious, or on edge",
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying",
  },
  {
    id: 3,
    text: "Worrying too much about different things",
  },
  {
    id: 4,
    text: "Trouble relaxing",
  },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still",
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable",
  },
  {
    id: 7,
    text: "Feeling afraid, as if something awful might happen",
  },
]

export default function QuizContainer({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState(Array(7).fill([]))
  const [showDifficulty, setShowDifficulty] = useState(false)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (values) => {
    const newScores = [...scores]
    newScores[currentQuestion] = values
    setScores(newScores)
    setAnswered(values.length > 0)
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
    } else {
      setShowDifficulty(true)
    }
  }

  const handleDifficultyComplete = (difficulty) => {
    const totalScore = scores.reduce((sum, questionScores) => {
      return sum + questionScores.reduce((qSum, val) => qSum + val, 0)
    }, 0)
    // Pass the individual question scores to the parent
    onComplete(totalScore, difficulty, scores)
  }

  if (showDifficulty) {
    return <DifficultyQuestion onComplete={handleDifficultyComplete} />
  }

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">GAD-7 Anxiety Assessment</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Over the last two weeks, how often have you been bothered by the following problems?
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={QUESTIONS[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
        />

        <motion.button
          onClick={handleNext}
          disabled={!answered}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={answered ? { scale: 1.05 } : {}}
          whileTap={answered ? { scale: 0.95 } : {}}
          className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
            answered
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg cursor-pointer"
              : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-50"
          }`}
        >
          {currentQuestion === QUESTIONS.length - 1 ? "Continue to Difficulty" : "Next Question"}
        </motion.button>
      </div>
    </motion.div>
  )
}