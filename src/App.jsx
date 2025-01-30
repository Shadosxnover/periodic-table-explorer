import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PeriodicTable from "./components/PeriodicTable"
import ElementDetails from "./components/ElementDetails"
import Filters from "./components/Filters"
import SearchBar from "./components/SearchBar"
import PeriodicTrends from "./components/PeriodicTrends"
import QuizMode from "./components/QuizMode"
import StatisticsDashboard from "./components/StatisticsDashboard"
import LoadingSpinner from "./components/LoadingSpinner"
import CompareMode from "./components/CompareMode"
// import ColorSchemeSelector from "./components/ColorSchemeSelector"
import elements from "./data/elements"

export default function App() {
    const [selectedElement, setSelectedElement] = useState(null)
    const [compareElement, setCompareElement] = useState(null)
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")
    const [darkMode, setDarkMode] = useState(() => {

        return localStorage.getItem('darkMode') === 'true'
    })
    const [showQuiz, setShowQuiz] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [colorScheme, setColorScheme] = useState("default")

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500)
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const handleElementClick = (element) => {
        if (compareElement) {
            setCompareElement(element)
        } else {
            setSelectedElement(element)
        }
        setShowQuiz(false)
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    const handleSearchChange = (query) => {
        setSearch(query)
    }

    const filteredElements = elements.filter((element) => {
        const matchesFilter = filter === "all" || element.category.toLowerCase() === filter.toLowerCase()
        const matchesSearch =
            element.name.toLowerCase().includes(search.toLowerCase()) ||
            element.symbol.toLowerCase().includes(search.toLowerCase()) ||
            element.atomicNumber.toString().includes(search)
        return matchesFilter && matchesSearch
    })

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="min-h-screen w-full p-4 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200">
            <header className="group mb-8 p-8 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-700 relative overflow-hidden bg-[length:200%_100%] animate-[gradient_15s_ease-in-out_infinite] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/30 before:via-violet-400/30 before:to-fuchsia-400/30 before:animate-[shimmer_3s_linear_infinite]">
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-[1px] animate-pulse"></div>
  
  <div className="relative z-10">
    <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-[shine_3s_linear_infinite] drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-500 group-hover:-translate-y-1">
      Periodic Table Explorer
    </h1>
    
    <p className="mt-4 text-2xl font-light tracking-wide transform group-hover:translate-x-3 transition-all duration-500 text-blue-100/90 hover:text-white">
      Discover the elements of our universe
      <span className="inline-block ml-2 transform hover:rotate-180 hover:scale-125 transition-all duration-700">
        ⚛
      </span>
    </p>
  </div>

  <div className="absolute top-0 left-0 w-full h-full">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full mix-blend-overlay animate-float"
        style={{
          width: `${Math.random() * 50 + 20}px`,
          height: `${Math.random() * 50 + 20}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`
        }}
      />
    ))}
  </div>

  <div className="absolute inset-0 border-2 border-transparent rounded-lg before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-white/20 before:animate-[borderGlow_3s_ease-in-out_infinite]"></div>
</header>

<style jsx>{`
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes shine {
    0% { background-position: -200% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes float {
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
    100% { transform: translateY(0) translateX(0); }
  }

  @keyframes borderGlow {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`}</style>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowQuiz(!showQuiz)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            {showQuiz ? "Show Table" : "Quiz Mode"}
                        </button>
                        {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </button> */}
                    </div>
                    {/* <ColorSchemeSelector onChange={setColorScheme} /> */}
                </div>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showQuiz ? "quiz" : "table"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {showQuiz ? (
                                <QuizMode />
                            ) : (
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="w-full lg:w-3/4">
                                        <div className="mb-4 flex flex-col sm:flex-row gap-2">
                                            <SearchBar onSearchChange={handleSearchChange} />
                                            <Filters onFilterChange={handleFilterChange} />
                                        </div>
                                        <PeriodicTable
                                            elements={filteredElements}
                                            onElementClick={handleElementClick}
                                            colorScheme={colorScheme}
                                        />
                                        <PeriodicTrends />
                                    </div>
                                    <div className="w-full lg:w-1/4">
                                        {compareElement ? (
                                            <CompareMode
                                                element1={selectedElement}
                                                element2={compareElement}
                                                onClose={() => setCompareElement(null)}
                                            />
                                        ) : (
                                            <ElementDetails element={selectedElement} onCompare={() => setCompareElement({})} />
                                        )}
                                        <StatisticsDashboard />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}

