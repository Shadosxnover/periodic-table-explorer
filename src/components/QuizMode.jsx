import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import elements from "../data/elements";

const QUESTIONS_PER_QUIZ = 3;

function getRandomElement() {
  return elements[Math.floor(Math.random() * elements.length)];
}

function getRandomProperty() {
  const properties = ["name", "symbol", "atomicNumber", "category", "state"];
  return properties[Math.floor(Math.random() * properties.length)];
}

export default function QuizMode() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (!quizComplete && !currentQuestion) {
      generateNewQuestion();
    }
  }, []);

  function generateNewQuestion() {
    const element = getRandomElement();
    const property = getRandomProperty();
    let question;

    switch (property) {
      case "name":
        question = `What is the name of the element with symbol ${element.symbol}?`;
        break;
      case "symbol":
        question = `What is the symbol for ${element.name}?`;
        break;
      case "atomicNumber":
        question = `What is the atomic number of ${element.name}?`;
        break;
      case "category":
        question = `What category does ${element.name} belong to?`;
        break;
      case "state":
        question = `What is the state of ${element.name} at room temperature?`;
        break;
    }

    setCurrentQuestion({ question, answer: element[property] });
    setAnswer("");
    setFeedback("");
    setIsCorrect(null);
  }

  function saveQuizResult(score) {
    const savedScores = JSON.parse(localStorage.getItem("quizScores") || "[]");
    const percentageScore = (score / QUESTIONS_PER_QUIZ) * 100;
    const newScores = [...savedScores, percentageScore];
    localStorage.setItem("quizScores", JSON.stringify(newScores));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const correct = answer.toLowerCase() === currentQuestion.answer.toString().toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      setCurrentScore(currentScore + 1);
      setFeedback("✨ Excellent! That's correct!");
    } else {
      setFeedback(`The correct answer is ${currentQuestion.answer}`);
    }

    if (questionNumber + 1 >= QUESTIONS_PER_QUIZ) {
      setQuizComplete(true);
      saveQuizResult(correct ? currentScore + 1 : currentScore);
    }
  }

  function handleNextQuestion() {
    if (questionNumber + 1 < QUESTIONS_PER_QUIZ) {
      setQuestionNumber(questionNumber + 1);
      generateNewQuestion();
    }
  }

  function startNewQuiz() {
    setCurrentScore(0);
    setQuestionNumber(0);
    setQuizComplete(false);
    generateNewQuestion();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Question {questionNumber + 1} of {QUESTIONS_PER_QUIZ}</span>
          <span className="text-indigo-600 dark:text-indigo-400">Score: {currentScore}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((questionNumber + 1) / QUESTIONS_PER_QUIZ) * 100}%` }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quizComplete && currentQuestion ? (
          <motion.form
            key="quiz-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.p
              className="text-xl font-medium dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentQuestion.question}
            </motion.p>
            
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-offset-2 transition-colors duration-200
                ${isCorrect === null 
                  ? 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400' 
                  : isCorrect 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/30'}`}
              placeholder="Type your answer here..."
              required
            />

            {!feedback && (
              <motion.button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Submit Answer
              </motion.button>
            )}
          </motion.form>
        ) : quizComplete ? (
          <motion.div
            key="quiz-complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Complete!
            </h3>
            <div className="text-lg mb-6">
              <p>Final Score: {currentScore} out of {QUESTIONS_PER_QUIZ}</p>
              <p className="text-2xl font-semibold mt-2">
                {((currentScore / QUESTIONS_PER_QUIZ) * 100).toFixed(0)}%
              </p>
            </div>
            <motion.button
              onClick={startNewQuiz}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start New Quiz
            </motion.button>
          </motion.div>
        ) : (
          <div className="text-center py-8">Loading question...</div>
        )}
      </AnimatePresence>

      {feedback && !quizComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <p className={`text-lg font-medium ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {feedback}
          </p>
          <motion.button
            onClick={handleNextQuestion}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Next Question →
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}