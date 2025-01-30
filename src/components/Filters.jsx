import React from "react"
import { motion } from "framer-motion"

const categories = [
  "all",
  "Alkali Metal",
  "Alkaline Earth Metal",
  "Transition Metal",
  "Post-Transition Metal",
  "Metalloid",
  "Nonmetal",
  "Halogen",
  "Noble Gas",
  "Lanthanide",
  "Actinide",
]

export default function Filters({ onFilterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <select
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                   border-2 border-transparent cursor-pointer appearance-none
                   shadow-lg shadow-indigo-500/30 hover:shadow-xl
                   focus:border-white focus:ring-2 focus:ring-white/20
                   transition-all duration-200 font-medium"
        onChange={(e) => onFilterChange(e.target.value)}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        {categories.map((category) => (
          <option 
            key={category} 
            value={category.toLowerCase()}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {category === "all" ? "All Categories" : category}
          </option>
        ))}
      </select>
    </motion.div>
  )
}

