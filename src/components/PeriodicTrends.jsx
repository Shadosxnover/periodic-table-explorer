import React, { useState } from "react"
import { motion } from "framer-motion"
import elements from "../data/elements"

const trends = [
  { name: "Atomic Radius", property: "atomicRadius" },
  { name: "Electronegativity", property: "electronegativity" },
  { name: "Ionization Energy", property: "ionizationEnergy" },
]

export default function PeriodicTrends() {
  const [selectedTrend, setSelectedTrend] = useState(trends[0])

  const getColor = (value, min, max) => {
    const normalizedValue = (value - min) / (max - min)
    const hue = (1 - normalizedValue) * 240 // Blue to Red
    return `hsl(${hue}, 100%, 50%)`
  }

  const trendValues = elements.map((el) => el[selectedTrend.property]).filter(Boolean)
  const minValue = Math.min(...trendValues)
  const maxValue = Math.max(...trendValues)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900"
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Periodic Trends
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
        {trends.map((trend) => (
          <motion.button
            key={trend.name}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={`px-3 py-2 sm:px-6 text-sm sm:text-base rounded-lg font-medium shadow-lg transition-all duration-200 flex-1 sm:flex-none
              ${selectedTrend.name === trend.name
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30"
                : "bg-white dark:bg-gray-700 shadow-gray-500/10 hover:shadow-gray-500/20"
              }`}
            onClick={() => setSelectedTrend(trend)}
          >
            {trend.name}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-18 gap-1 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-inner"
        layout
      >
        {elements.map((element) => (
          <motion.div
            key={element.atomicNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square flex items-center justify-center text-xs font-bold rounded-lg"
            style={{
              backgroundColor: element[selectedTrend.property]
                ? getColor(element[selectedTrend.property], minValue, maxValue)
                : "gray",
            }}
          >
            {element.symbol}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-between mt-4 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
        <span>Low</span>
        <span>High</span>
      </div>
    </motion.div>
  )
}

