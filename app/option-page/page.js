"use client"

import { Physcologicalteststart } from "@/components/Physcologicalteststart"
import { motion } from "framer-motion"
import { Brain, Activity } from "lucide-react"


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Animated background elements */}
      <motion.div
        className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-72 h-72 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ y: [50, 0, 50] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div className="w-full max-w-5xl" variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 text-balance"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Choose Your Assessment
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 text-balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Take one of our comprehensive tests to get personalized insights
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Physcologicalteststart
              title="Psychological Test"
              description="Comprehensive assessment of your mental health, personality traits, and psychological well-being. Takes approximately 15-20 minutes."
              icon={Brain}
              href="/physcological"
              delay={0}
            />

            <Physcologicalteststart
              title="GAD-7 Anxiety Test"
              description="Generalized Anxiety Disorder screening test. Evaluate your anxiety levels with our validated 7-question assessment."
              icon={Activity}
              href="/gad-quiz"
              delay={0.2}
            />
          </motion.div>

          {/* Footer text */}
          <motion.p className="text-center text-slate-500 dark:text-slate-400 mt-12 text-sm" variants={itemVariants}>
            All assessments are confidential and designed for informational purposes
          </motion.p>
        </motion.div>
      </div>
    </main>
  )
}
