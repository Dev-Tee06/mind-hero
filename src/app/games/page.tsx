"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PuzzleGame from "../../components/PuzzleGame";
import MemoryGame from "../../components/MemoryGame";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<"puzzle" | "memory" | null>(
    null,
  );

  if (selectedGame === "puzzle")
    return <PuzzleGame goBack={() => setSelectedGame(null)} />;
  if (selectedGame === "memory")
    return <MemoryGame goBack={() => setSelectedGame(null)} />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6 md:p-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          🕹 MindHeroes Games
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Exercise your mind! Solve puzzles, play memory games, and learn how to
          think positively while having fun!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Puzzle Game Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
        >
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">
              🧩 Puzzle Challenge
            </h2>
            <p className="text-gray-700 text-center">
              Solve puzzles that challenge your mind and unlock rewards. Great
              for learning focus and problem-solving!
            </p>
          </div>
          <button
            onClick={() => setSelectedGame("puzzle")}
            className="mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white px-4 py-2 rounded-2xl font-semibold text-center hover:scale-105 transition shadow-md"
          >
            Play Puzzle
          </button>
        </motion.div>

        {/* Memory Game Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
        >
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">
              🧠 Memory Master
            </h2>
            <p className="text-gray-700 text-center">
              Strengthen your memory while learning positive thinking and
              perspective. Match cards and answer fun questions!
            </p>
          </div>
          <button
            onClick={() => setSelectedGame("memory")}
            className="mt-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white px-4 py-2 rounded-2xl font-semibold text-center hover:scale-105 transition shadow-md"
          >
            Play Memory Game
          </button>
        </motion.div>
      </div>
    </main>
  );
}
