"use client"

import { motion } from "framer-motion"


function getSeverityLevel(score) {
  if (score <= 4)
    return {
      level: "Minimal Anxiety",
      color: "from-green-400 to-green-600",
      description: "Your anxiety levels are minimal.",
      recommendation: "Continue maintaining healthy lifestyle habits.",
    }
  if (score <= 9)
    return {
      level: "Mild Anxiety",
      color: "from-yellow-400 to-yellow-600",
      description: "You may be experiencing mild anxiety.",
      recommendation: "Consider stress management techniques like meditation or exercise.",
    }
  if (score <= 14)
    return {
      level: "Moderate Anxiety",
      color: "from-orange-400 to-orange-600",
      description: "You may be experiencing moderate anxiety.",
      recommendation: "It may be helpful to speak with a healthcare professional.",
    }
  return {
    level: "Severe Anxiety",
    color: "from-red-400 to-red-600",
    description: "You may be experiencing severe anxiety.",
    recommendation: "Please consider consulting a healthcare professional as soon as possible.",
  }
}

function formatDifficultyLabel(id) {
  const labels = {
    "not-difficult": "Not difficult at all",
    "somewhat-difficult": "Somewhat difficult",
    "very-difficult": "Very difficult",
    "extremely-difficult": "Extremely difficult",
  }
  return labels[id] || id
}

export default function ResultsScreen({ score, difficulty, onRestart }) {
  const severity = getSeverityLevel(score)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        {/* Score Display */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Your Results</h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className={`inline-block bg-gradient-to-r ${severity.color} rounded-full p-8 mb-6`}
          >
            <div className="text-6xl font-bold text-white">{score}</div>
            <div className="text-white text-sm font-medium mt-2">out of 21</div>
          </motion.div>
        </div>

        {/* Severity Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl font-bold bg-gradient-to-r ${severity.color} bg-clip-text text-transparent mb-2`}>
            {severity.level}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">{severity.description}</p>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{severity.recommendation}</p>
        </motion.div>

        {difficulty.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 mb-8"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Impact on Daily Life</h3>
            <div className="space-y-2">
              {difficulty.map((item) => (
                <div key={item} className="flex items-center text-slate-600 dark:text-slate-400">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  {formatDifficultyLabel(item)}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 mb-8"
        >
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Severity Scale</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">0–4: Minimal anxiety</span>
              <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">5–9: Mild anxiety</span>
              <div className="w-24 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">10–14: Moderate anxiety</span>
              <div className="w-24 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">15–21: Severe anxiety</span>
              <div className="w-24 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8"
        >
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Disclaimer:</strong> This assessment is for informational purposes only and should not be used as a
            substitute for professional medical advice. If you are experiencing severe anxiety, please consult with a
            healthcare professional.
          </p>
        </motion.div>

        {/* Restart Button */}
        <motion.button
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          Take Quiz Again
        </motion.button>
      </div>
    </motion.div>
  )
}
