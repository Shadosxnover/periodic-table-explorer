import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function StatisticsDashboard() {
  const [quizData, setQuizData] = useState([])
  const [averageScore, setAverageScore] = useState(0)

  useEffect(() => {
    const savedData = localStorage.getItem("quizScores")
    if (savedData) {
      const scores = JSON.parse(savedData)
      setQuizData(scores)
      setAverageScore(scores.reduce((a, b) => a + b, 0) / scores.length || 0)
    }
  }, [])

  const data = {
    labels: quizData.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: "Score (%)",
        data: quizData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quiz Performance Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900"
    >
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Statistics Dashboard
      </h2>
      {quizData.length > 0 ? (
        <>
          <p className="mb-4 text-lg font-medium">
            Average Score: 
            <span className="ml-2 text-indigo-600 dark:text-indigo-400">
              {averageScore.toFixed(2)}%
            </span>
          </p>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-inner">
            <Line data={data} options={options} />
          </div>
        </>
      ) : (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 dark:text-gray-400 text-center py-8"
        >
          No quiz data available yet. Complete some quizzes to see your progress!
        </motion.p>
      )}
    </motion.div>
  )
}

