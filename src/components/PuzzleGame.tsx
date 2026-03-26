"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { saveScores } from "../utils/userData";

type PuzzleGameProps = { goBack: () => void };

const puzzles = [
  {
    question: "I have keys but no locks. I have space but no room. What am I?",
    answer: "keyboard",
    lesson: "Sometimes the answer is right in front of you!",
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    lesson: "Every action you take leaves an impact.",
  },
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "echo",
    lesson: "Listen carefully; not everything is obvious.",
  },
  {
    question: "What has hands but cannot clap?",
    answer: "clock",
    lesson: "Time is a powerful tool, use it wisely.",
  },
  {
    question:
      "I am always hungry and must be fed, but if you give me water I die. What am I?",
    answer: "fire",
    lesson: "Control your impulses; some things can be dangerous if mismanaged.",
  },
];

export default function PuzzleGame({ goBack }: PuzzleGameProps) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    if (current >= puzzles.length) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [current]);

  const handleSubmit = async () => {
    const isCorrect = input.toLowerCase().trim() === puzzles[current].answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      setFeedback(null);
      setInput("");
      setTimer(30);
      setCurrent(current + 1);
    }, 1200);
  };

  useEffect(() => {
    const save = async () => {
      if (current >= puzzles.length && user) {
        await saveScores(user.uid, score, undefined);
      }
    };
    save();
  }, [current, score, user]);

  // Progress percentage
  const progress = Math.round((current / puzzles.length) * 100);
  const timerColor = timer <= 10 ? "text-red-400" : "text-magical-yellow";

  if (current >= puzzles.length) {
    return (
      <main className="min-h-screen bg-mesh-premium flex items-center justify-center p-6">
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-magical-purple/25 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-magical-pink/20 rounded-full blur-[100px]" />
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 glass-panel rounded-[2rem] p-10 md:p-14 text-center max-w-lg w-full shadow-glow border border-white/20"
        >
          <div className="text-7xl mb-5 drop-shadow-2xl">🎉</div>
          <h1 className="text-4xl font-heading font-extrabold text-white mb-3 drop-shadow-md">
            Puzzle Complete!
          </h1>
          <p className="text-indigo-50 font-bold text-xl mb-2">
            You scored <span className="text-magical-yellow text-3xl font-extrabold">{score}</span> out of {puzzles.length}
          </p>
          <p className="text-indigo-200 font-semibold mb-8 text-sm">
            {score === puzzles.length ? "🌟 Perfect score! You're a genius!" : score >= 3 ? "Great job! Keep it up! 💪" : "Keep practicing, you'll get there! 🚀"}
          </p>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-magical-purple to-magical-pink text-white px-10 py-4 rounded-full font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all duration-300 uppercase tracking-wide"
          >
            Back to Games
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mesh-premium flex flex-col items-center justify-center p-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-magical-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] right-[5%] w-72 h-72 bg-magical-pink/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 glass-panel rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-glow border border-white/20"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="text-indigo-200 hover:text-white font-heading font-bold text-sm transition-colors flex items-center gap-1 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Games
          </button>
          <span className="text-indigo-200 font-semibold text-sm">
            {current + 1} / {puzzles.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-magical-purple to-magical-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Timer */}
        <div className={`text-2xl font-heading font-extrabold mb-6 drop-shadow ${timerColor}`}>
          ⏱ {timer}s
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white mb-8 drop-shadow-md leading-relaxed">
          {puzzles[current].question}
        </h2>

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-white/10 border border-white/30 rounded-xl px-5 py-4 mb-5 text-white text-lg font-semibold placeholder-indigo-300 outline-none focus:border-magical-pink focus:bg-white/20 transition-all"
          placeholder="Type your answer..."
          disabled={!!feedback}
        />

        {/* Feedback */}
        {feedback && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mb-4 py-3 px-5 rounded-xl font-heading font-extrabold text-lg ${
              feedback === "correct"
                ? "bg-green-500/30 text-green-300 border border-green-400/40"
                : "bg-red-500/30 text-red-300 border border-red-400/40"
            }`}
          >
            {feedback === "correct" ? "✅ Correct! Well done!" : `❌ The answer was: ${puzzles[current].answer}`}
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!!feedback || !input.trim()}
          className="w-full bg-gradient-to-r from-magical-purple to-magical-pink text-white py-4 rounded-xl font-heading font-extrabold shadow-glow-pink hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all duration-300 uppercase tracking-wider"
        >
          Submit Answer
        </button>

        {/* Lesson hint */}
        <p className="mt-5 text-indigo-200 italic font-semibold text-sm leading-relaxed">
          💡 {puzzles[current].lesson}
        </p>
      </motion.div>
    </main>
  );
}
