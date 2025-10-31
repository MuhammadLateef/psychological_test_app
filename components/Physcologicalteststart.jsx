"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Physcologicalteststart({ title, description, icon: Icon, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link href={href}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-8 cursor-pointer group border border-blue-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Animated background blob */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="inline-block p-4 bg-white dark:bg-slate-800 rounded-xl mb-6 shadow-md group-hover:shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{description}</p>

            {/* CTA Button */}
            <motion.div
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
              whileHover={{ gap: 12 }}
              transition={{ duration: 0.3 }}
            >
              <span>Start Test</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
