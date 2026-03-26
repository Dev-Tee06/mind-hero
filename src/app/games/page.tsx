"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PuzzleGame from "../../components/PuzzleGame";
import MemoryGame from "../../components/MemoryGame";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<"puzzle" | "memory" | null>(null);

  if (selectedGame === "puzzle")
    return <PuzzleGame goBack={() => setSelectedGame(null)} />;
  if (selectedGame === "memory")
    return <MemoryGame goBack={() => setSelectedGame(null)} />;

  return (
    <main className="min-h-screen bg-mesh-premium pt-28 pb-16 px-6">
      {/* Glowing orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-magical-yellow/15 rounded-full blur-[120px]" />
        <div className="absolute top-[50%] right-[10%] w-96 h-96 bg-magical-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[35%] w-72 h-72 bg-magical-cyan/15 rounded-full blur-[100px]" />
      </div>

      <header className="relative z-10 text-center mb-16 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-5 drop-shadow-lg"
        >
          🕹 MindHeroes Games
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-indigo-50 font-bold leading-relaxed drop-shadow"
        >
          Exercise your mind! Solve puzzles, play memory games, and learn how to
          think positively while having fun!
        </motion.p>
      </header>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Puzzle Game Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="glass-panel rounded-3xl p-10 flex flex-col justify-between hover:shadow-glow transition-all duration-300 border border-white/20 group text-center"
        >
          <div>
            <div className="text-7xl mb-5 leading-none drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">🧩</div>
            <h2 className="text-2xl font-heading font-extrabold text-white mb-3 drop-shadow-md">
              Puzzle Challenge
            </h2>
            <p className="text-indigo-50 font-bold leading-relaxed">
              Solve puzzles that challenge your mind and unlock rewards. Great
              for learning focus and problem-solving!
            </p>
          </div>
          <button
            onClick={() => setSelectedGame("puzzle")}
            className="mt-8 bg-gradient-to-r from-magical-purple to-magical-pink text-white px-6 py-3 rounded-xl font-heading font-extrabold shadow-glow-pink hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm"
          >
            Play Puzzle
          </button>
        </motion.div>

        {/* Memory Game Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="glass-panel rounded-3xl p-10 flex flex-col justify-between hover:shadow-glow transition-all duration-300 border border-white/20 group text-center"
        >
          <div>
            <div className="text-7xl mb-5 leading-none drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">🧠</div>
            <h2 className="text-2xl font-heading font-extrabold text-white mb-3 drop-shadow-md">
              Memory Master
            </h2>
            <p className="text-indigo-50 font-bold leading-relaxed">
              Strengthen your memory while learning positive thinking and
              perspective. Match cards and answer fun questions!
            </p>
          </div>
          <button
            onClick={() => setSelectedGame("memory")}
            className="mt-8 bg-gradient-to-r from-magical-blue to-magical-cyan text-white px-6 py-3 rounded-xl font-heading font-extrabold shadow-glow hover:scale-105 transition-all duration-300 uppercase tracking-wider text-sm"
          >
            Play Memory Game
          </button>
        </motion.div>
      </div>
    </main>
  );
}
