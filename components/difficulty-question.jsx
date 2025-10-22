"use client"

import { useState } from "react"
import { motion } from "framer-motion"


const DIFFICULTY_OPTIONS = [
  { label: "Not difficult at all", id: "not-difficult" },
  { label: "Somewhat difficult", id: "somewhat-difficult" },
  { label: "Very difficult", id: "very-difficult" },
  { label: "Extremely difficult", id: "extremely-difficult" },
]

export default function DifficultyQuestion({ onComplete }) {
  const [selectedDifficulties, setSelectedDifficulties] = useState([])

  const handleCheckboxChange = (id) => {
    setSelectedDifficulties((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    onComplete(selectedDifficulties)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Final Question</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          If you checked any problems, how difficult have they made it for you to do your work, take care of things at
          home, or get along with other people?
        </p>

        <div className="space-y-3 mb-8">
          {DIFFICULTY_OPTIONS.map((option, index) => (
            <motion.label
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-3 text-slate-900 dark:text-white font-medium">{option.label}</span>
            </motion.label>
          ))}
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={selectedDifficulties.length === 0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedDifficulties.length === 0 ? "Select at least one option" : "View Results"}
        </motion.button>
      </div>
    </motion.div>
  )
}
