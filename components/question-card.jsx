"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const OPTIONS = [
  { label: "Not at all", value: 0, color: "from-green-400 to-green-600" },
  { label: "Several days", value: 1, color: "from-yellow-400 to-yellow-600" },
  { label: "More than half the days", value: 2, color: "from-orange-400 to-orange-600" },
  { label: "Nearly every day", value: 3, color: "from-red-400 to-red-600" },
]

export default function QuestionCard({ question, onAnswer, questionNumber }) {
  const [selectedValues, setSelectedValues] = useState([])

  // Reset selected values when question changes
  useEffect(() => {
    setSelectedValues([])
  }, [question.id])

  const handleCheckboxChange = (value) => {
    let newValues
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter((v) => v !== value)
    } else {
      newValues = [...selectedValues, value]
    }
    setSelectedValues(newValues)
    onAnswer(newValues)
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        {questionNumber}. {question.text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              style={{
                backgroundImage: selectedValues.includes(option.value)
                  ? `linear-gradient(to right, var(--tw-gradient-stops))`
                  : `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
              className={`flex items-center gap-3 p-4 rounded-lg font-medium dark:text-white transition-all duration-200 cursor-pointer hover:shadow-lg active:shadow-md ${
                selectedValues.includes(option.value)
                  ? `bg-gradient-to-r ${option.color} shadow-lg`
                  : `bg-gradient-to-r ${option.color} opacity-60 hover:opacity-100`
              }`}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="w-5 h-5 cursor-pointer accent-white"
              />
              <span>{option.label}</span>
            </label>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}