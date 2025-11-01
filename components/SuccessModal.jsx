"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modal = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: {
      duration: 0.2
    }
  }
}

const checkmark = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    }
  }
}

export default function SuccessModal({ isOpen, onClose, testType = "Assessment" }) {
  const router = useRouter()

  const handleGoHome = () => {
    onClose()
    router.push("/")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
          >
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Success Icon with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50"
                  />
                  <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6">
                    <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Successfully Saved!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Your {testType} results have been saved to Google Sheets.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Thank you for completing the assessment.
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoHome}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  Back to Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  Close
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}