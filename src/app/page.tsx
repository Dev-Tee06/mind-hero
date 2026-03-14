"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Mascot from "../components/Mascot";
import { useState, useEffect } from "react";

type Bubble = {
  id: number;
  size: number;
  color: string;
  left: string;
  duration: number;
  type: "circle" | "star";
};

export default function Home() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const colors = ["#F9A8D4", "#A78BFA", "#60A5FA", "#FCD34D", "#F87171"];
    const types = ["circle", "star"];

    const createBubble = () => {
      const bubble: Bubble = {
        id: idCounter++,
        size: Math.floor(Math.random() * 40) + 20, // 20-60px
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.floor(Math.random() * 90)}%`,
        duration: Math.random() * 12 + 8, // 8-20s
        type: types[Math.floor(Math.random() * types.length)] as
          | "circle"
          | "star",
      };
      setBubbles((prev) => [...prev, bubble]);
      // Remove after animation duration
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.duration * 1000);
    };

    const interval = setInterval(createBubble, 600); // new bubble every 0.6s
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF7FB] flex flex-col items-center relative overflow-hidden">
      {/* 🌈 ENDLESS MAGICAL BUBBLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute ${bubble.type === "circle" ? "rounded-full" : ""} text-2xl`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              color: bubble.type === "star" ? bubble.color : undefined,
              backgroundColor:
                bubble.type === "circle" ? bubble.color : undefined,
              fontSize: bubble.type === "star" ? bubble.size / 2 : 0,
              opacity: 0.6,
            }}
            initial={{ y: 0, x: 0, scale: 0 }}
            animate={{ y: -900, x: Math.random() * 50 - 25, scale: 1 }}
            transition={{ duration: bubble.duration, ease: "linear" }}
          >
            {bubble.type === "star" ? "✨" : ""}
          </motion.div>
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center p-10 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Mascot />
        </motion.div>

        <motion.h1
          className="text-4xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          MindHeroes 🧠✨
        </motion.h1>

        <p className="text-xl mt-4 text-purple-700 max-w-2xl leading-relaxed">
          A magical place where kids learn life lessons, explore stories, play
          games, and become heroes of their own minds.
        </p>

        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <Link
            href="/lessons"
            className="bg-pink-400 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition"
          >
            📚 Start Learning
          </Link>

          <Link
            href="/stories"
            className="bg-purple-400 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition"
          >
            📖 Read Stories
          </Link>

          <Link
            href="/games"
            className="bg-yellow-400 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition"
          >
            🎮 Play Games
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 max-w-6xl relative z-10">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 text-center"
        >
          <div className="text-5xl mb-3">📚</div>
          <h3 className="text-2xl font-bold text-purple-600">Life Lessons</h3>
          <p className="text-gray-600 mt-2">
            Learn powerful lessons about kindness, courage, discipline, and
            wisdom.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.08, rotate: -1 }}
          className="bg-white rounded-3xl shadow-xl p-6 text-center"
        >
          <div className="text-5xl mb-3">📖</div>
          <h3 className="text-2xl font-bold text-blue-600">
            Inspiring Stories
          </h3>
          <p className="text-gray-600 mt-2">
            Fun stories that teach important values and grow imagination.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.08, rotate: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 text-center"
        >
          <div className="text-5xl mb-3">🎮</div>
          <h3 className="text-2xl font-bold text-pink-600">Fun Games</h3>
          <p className="text-gray-600 mt-2">
            Brain games that improve memory, thinking, and creativity.
          </p>
        </motion.div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="bg-white/60 backdrop-blur-md w-full py-12 relative z-10">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">
          Why Kids Love MindHeroes ⭐
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl">🧠</div>
            <p className="mt-2 font-semibold">Grow Your Mind</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl">🎯</div>
            <p className="mt-2 font-semibold">Daily Challenges</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl">🏆</div>
            <p className="mt-2 font-semibold">Earn Badges</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl">🎨</div>
            <p className="mt-2 font-semibold">Fun Activities</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-purple-400 w-full text-center py-14 text-white relative z-10">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Become a MindHero? 🚀
        </h2>

        <p className="text-lg mb-6">
          Start your adventure today and grow your mind!
        </p>

        <Link
          href="/lessons"
          className="bg-yellow-300 text-purple-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Start Your Journey
        </Link>
      </section>
    </main>
  );
}
