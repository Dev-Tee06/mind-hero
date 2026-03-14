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
    lesson:
      "Control your impulses; some things can be dangerous if mismanaged.",
  },
];

export default function PuzzleGame({ goBack }: PuzzleGameProps) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (current >= puzzles.length) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [current]);

  const handleSubmit = async () => {
    if (input.toLowerCase().trim() === puzzles[current].answer)
      setScore(score + 1);
    setInput("");
    setTimer(30);
    setCurrent(current + 1);
  };

  // Save score to Firebase after completing all puzzles
  useEffect(() => {
    const save = async () => {
      if (current >= puzzles.length && user) {
        await saveScores(user.uid, score, undefined);
      }
    };
    save();
  }, [current, score, user]);

  if (current >= puzzles.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center justify-center p-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-xl">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            🎉 Puzzle Completed!
          </h1>
          <p className="text-gray-700 mb-6">
            Your Score: {score} / {puzzles.length}
          </p>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Back to Games
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full text-center"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          ⏱ Time Left: {timer}s
        </h2>
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          {puzzles[current].question}
        </h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full mb-4 text-lg"
          placeholder="Type your answer"
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-2xl font-semibold hover:scale-105 transition"
        >
          Submit Answer
        </button>
        <p className="mt-4 text-gray-500 italic">{puzzles[current].lesson}</p>
      </motion.div>
    </main>
  );
}
