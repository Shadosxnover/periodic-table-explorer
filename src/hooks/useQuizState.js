import { useState, useEffect } from "react"

export function useQuizState() {
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore")
    if (savedScore) {
      setScore(Number.parseInt(savedScore, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("quizScore", score.toString())
  }, [score])

  return {
    score,
    setScore,
    totalQuestions,
    setTotalQuestions,
  }
}

