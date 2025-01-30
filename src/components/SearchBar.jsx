import React from "react"
import { motion } from "framer-motion"
import { BiSearch } from "react-icons/bi"

export default function SearchBar({ onSearchChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="Search by name, symbol, or atomic number"
        className="w-full px-10 py-3 rounded-xl bg-white dark:bg-gray-700 border-2 border-transparent 
                 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 
                 shadow-lg dark:shadow-gray-900/30 outline-none transition-all duration-200
                 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </motion.div>
  )
}

